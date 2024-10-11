// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import './style/Reset.css';
import Spotlight from './components/Spotlight/Spotlight';
import BotaoLuz from './components/BotaoLuz/BotaoLuz';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import BotaoEquipes from './components/BotaoEquipes/BotaoEquipes';
import EquipesParticipantes from './components/EquipesParticipantes/EquipesParticipantes';
import Fireworks from './components/Fireworks/Fireworks'; // Importação atualizada

// Importe as imagens de background
import background1 from './assets/background1.png';
import background2 from './assets/background2.png';
import background3 from './assets/background3.png';
import background4 from './assets/background4.png';
import background5 from './assets/background5.png';

function App() {
  const [luzAcesa, setLuzAcesa] = useState(false);
  const [trocaBackgroundFinalizada, setTrocaBackgroundFinalizada] = useState(false);
  const [backgroundsAtuais, setBackgroundsAtuais] = useState([background1]);
  const [mostrarEquipes, setMostrarEquipes] = useState(false);

  const handleLuzAcesa = () => {
    setLuzAcesa(true);
  };

  const handleMostrarEquipes = () => {
    setMostrarEquipes(true);
  };

  useEffect(() => {
    if (!luzAcesa) return;

    const backgrounds = [background1, background2, background3, background4, background5];
    let indice = 1;

    const intervalo = setInterval(() => {
      if (indice < backgrounds.length) {
        setBackgroundsAtuais((prevBackgrounds) => [...prevBackgrounds, backgrounds[indice]]);
        indice += 1;
      } else {
        clearInterval(intervalo);
        setTrocaBackgroundFinalizada(true);
      }
    }, 800);

    return () => clearInterval(intervalo);
  }, [luzAcesa]);

  return (
    <div className="app" style={{ position: 'relative' }}>
      {backgroundsAtuais.map((bg, index) => (
        <div
          key={index}
          className="background-layer"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>
      ))}
      {!luzAcesa && (
        <>
          <Spotlight />
          <BotaoLuz onClick={handleLuzAcesa} />
        </>
      )}
      {luzAcesa && (
        <>
          <MusicPlayer startPlaying={true} /> {/* Passamos startPlaying como true */}
        </>
      )}
      {trocaBackgroundFinalizada && !mostrarEquipes && (
        <BotaoEquipes onClick={handleMostrarEquipes} />
      )}
      {mostrarEquipes && <EquipesParticipantes />}
      {mostrarEquipes && <Fireworks />} {/* Renderização Condicional dos Fogos de Artifício */}
    </div>
  );
}

export default App;
