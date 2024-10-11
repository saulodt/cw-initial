// MusicPlayer.js

import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

// Importando ícones do react-icons
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
  FaRegHeart,
} from 'react-icons/fa';

// Importando as músicas e imagens
import musica1 from '../../assets/music/ShoutForVictory2.mp3';
import musica2 from '../../assets/music/ShoutForVictory1.mp3';
import musica3 from '../../assets/music/VictorysEdge1.mp3';

import album1 from '../../assets/images/ShoutForVictory2.jpeg';
import album2 from '../../assets/images/ShoutForVictory1.jpeg';
import album3 from '../../assets/images/VictorysEdge1.jpeg';

function MusicPlayer() {
  const [indiceMusica, setIndiceMusica] = useState(0);
  const [tocando, setTocando] = useState(false);
  const [tempoAtual, setTempoAtual] = useState('0:00');
  const [duracaoTotal, setDuracaoTotal] = useState('0:00');
  const [progresso, setProgresso] = useState(0);
  const [volume, setVolume] = useState(1);
  const [mudo, setMudo] = useState(false);
  const [gostei, setGostei] = useState(false);
  const [embaralhar, setEmbaralhar] = useState(false);
  const [repetir, setRepetir] = useState(false);

  const audioRef = useRef(null);
  const intervaloRef = useRef(null);

  const musicas = [
    {
      nome: 'Shout for Victory 2',
      artista: 'Nome do Artista',
      arquivo: musica1,
      capa: album1,
    },
    {
      nome: 'Shout for Victory 1',
      artista: 'Nome do Artista',
      arquivo: musica2,
      capa: album2,
    },
    {
      nome: "Victory's Edge 1",
      artista: 'Nome do Artista',
      arquivo: musica3,
      capa: album3,
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (tocando) {
      audioRef.current.play();
      iniciarAtualizacaoTempo();
    } else {
      audioRef.current.pause();
      pararAtualizacaoTempo();
    }
  }, [tocando]);

  // Novo useEffect para observar mudanças no indiceMusica
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (tocando) {
        audioRef.current.play();
      }
    }
  }, [indiceMusica]);

  const iniciarAtualizacaoTempo = () => {
    intervaloRef.current = setInterval(() => {
      const tempoAtual = audioRef.current.currentTime;
      const duracao = audioRef.current.duration;

      setTempoAtual(formatarTempo(tempoAtual));
      setDuracaoTotal(formatarTempo(duracao));
      setProgresso((tempoAtual / duracao) * 100);
    }, 1000);
  };

  const pararAtualizacaoTempo = () => {
    clearInterval(intervaloRef.current);
  };

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };

  const alternarPlayPause = () => {
    setTocando(!tocando);
  };

  const proximaMusica = () => {
    if (embaralhar) {
      const indiceAleatorio = Math.floor(Math.random() * musicas.length);
      setIndiceMusica(indiceAleatorio);
    } else {
      setIndiceMusica((indiceMusica + 1) % musicas.length);
    }
    setTocando(true);
  };

  const musicaAnterior = () => {
    setIndiceMusica((indiceMusica - 1 + musicas.length) % musicas.length);
    setTocando(true);
  };

  const alterarVolume = (e) => {
    setVolume(e.target.value);
    setMudo(e.target.value === '0');
  };

  const alternarMudo = () => {
    if (mudo) {
      setVolume(1);
      setMudo(false);
    } else {
      setVolume(0);
      setMudo(true);
    }
  };

  const alterarProgresso = (e) => {
    const novoProgresso = e.target.value;
    const novoTempo = (novoProgresso / 100) * audioRef.current.duration;
    audioRef.current.currentTime = novoTempo;
    setProgresso(novoProgresso);
  };

  const alternarGostei = () => {
    setGostei(!gostei);
  };

  const alternarEmbaralhar = () => {
    setEmbaralhar(!embaralhar);
  };

  const alternarRepetir = () => {
    setRepetir(!repetir);
    audioRef.current.loop = !repetir;
  };

  const aoTerminarMusica = () => {
    if (repetir) {
      audioRef.current.play();
    } else {
      proximaMusica();
    }
  };

  return (
    <div className="music-player">
      <div id="volume">
        <button id="muteBtn" onClick={alternarMudo}>
          {mudo || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <div id="volume-bar">
          <input
            type="range"
            id="volumeSlider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={alterarVolume}
          />
          <div
            id="volumeIndicator"
            className="volume-indicator"
            style={{ width: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
      <img id="albumArt" src={musicas[indiceMusica].capa} alt="Capa do Álbum" />
      <div id="fade"></div>
      <div id="uiWrap">
        <div className="audio-info">
          <div className="track-info">
            <div id="trackTitle">{musicas[indiceMusica].nome}</div>
            {/* <div id="bandName">{musicas[indiceMusica].artista}</div> */}
            <button id="likeBtn" onClick={alternarGostei}>
              {gostei ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className="seek-bar">
            <input
              type="range"
              id="seekSlider"
              min="0"
              max="100"
              step="0.1"
              value={progresso}
              onChange={alterarProgresso}
            />
            <div
              id="seekIndicator"
              className="seek-indicator"
              style={{ width: `${progresso}%` }}
            ></div>
            <div id="currentTime">{tempoAtual}</div>
            <div id="trackTime">{duracaoTotal}</div>
          </div>
        </div>
        <div className="audio-controls">
          <div className="playSkip">
            <button
              id="loopBtn"
              onClick={alternarRepetir}
              className={repetir ? 'active' : ''}
            >
              <FaRedo />
            </button>
            <button id="prevBtn" onClick={musicaAnterior}>
              <FaStepBackward />
            </button>
            <button id="playPauseBtn" onClick={alternarPlayPause}>
              {tocando ? <FaPause /> : <FaPlay />}
            </button>
            <button id="nextBtn" onClick={proximaMusica}>
              <FaStepForward />
            </button>
            <button
              id="shuffleBtn"
              onClick={alternarEmbaralhar}
              className={embaralhar ? 'active' : ''}
            >
              <FaRandom />
            </button>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={musicas[indiceMusica].arquivo}
        onEnded={aoTerminarMusica}
        onLoadedMetadata={() => {
          setDuracaoTotal(formatarTempo(audioRef.current.duration));
        }}
      ></audio>
    </div>
  );
}

export default MusicPlayer;
