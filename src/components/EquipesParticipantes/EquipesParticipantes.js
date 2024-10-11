// src/components/EquipesParticipantes/EquipesParticipantes.js

import React, { useEffect, useState } from 'react';
import './EquipesParticipantes.css';
import DetalheEquipe from '../DetalheEquipe/DetalheEquipe';

// Importe as 12 imagens das equipes
import equipe1 from '../../assets/equipes/AP.png';
import equipe2 from '../../assets/equipes/CI.png';
import equipe3 from '../../assets/equipes/CM.png';
import equipe4 from '../../assets/equipes/CP.png';
import equipe5 from '../../assets/equipes/ECD.png';
import equipe6 from '../../assets/equipes/ECO.png';
import equipe7 from '../../assets/equipes/ECR.png';
import equipe8 from '../../assets/equipes/ED_ECO.png';
import equipe9 from '../../assets/equipes/EM.png';
import equipe10 from '../../assets/equipes/EN.png';
import equipe11 from '../../assets/equipes/EV.png';
import equipe12 from '../../assets/equipes/PM.png';

// Importe as imagens detalhadas correspondentes a cada equipe
import detalhe1 from '../../assets/equipes/detalhe/AP.png';
import detalhe2 from '../../assets/equipes/detalhe/CI.png';
import detalhe3 from '../../assets/equipes/detalhe/CM.png';
import detalhe4 from '../../assets/equipes/detalhe/CP.png';
import detalhe5 from '../../assets/equipes/detalhe/ECD.png';
import detalhe6 from '../../assets/equipes/detalhe/ECO.png';
import detalhe7 from '../../assets/equipes/detalhe/ECR.png';
import detalhe8 from '../../assets/equipes/detalhe/ED_ECO.png';
import detalhe9 from '../../assets/equipes/detalhe/EM.png';
import detalhe10 from '../../assets/equipes/detalhe/EN.png';
import detalhe11 from '../../assets/equipes/detalhe/EV.png';
import detalhe12 from '../../assets/equipes/detalhe/PM.png';

function EquipesParticipantes() {
  const [imagensVisiveis, setImagensVisiveis] = useState([]);
  const [equipeSelecionada, setEquipeSelecionada] = useState(null);

  const imagens = [
    equipe1,
    equipe2,
    equipe3,
    equipe4,
    equipe5,
    equipe6,
    equipe7,
    equipe8,
    equipe9,
    equipe10,
    equipe11,
    equipe12,
  ];

  const detalhes = [
    detalhe1,
    detalhe2,
    detalhe3,
    detalhe4,
    detalhe5,
    detalhe6,
    detalhe7,
    detalhe8,
    detalhe9,
    detalhe10,
    detalhe11,
    detalhe12,
  ];

  useEffect(() => {
    let indice = 0;
    const intervalo = setInterval(() => {
      if (indice < imagens.length) {
        setImagensVisiveis((prev) => [...prev, indice]);
        indice += 1; // Incremento correto
      } else {
        clearInterval(intervalo);
      }
    }, 500); // Ajuste o tempo conforme necessário

    return () => clearInterval(intervalo);
  }, [imagens.length]);

  const handleCliqueEquipe = (index) => {
    console.log(`Equipe selecionada: ${index}`); // Adicionado para depuração
    setEquipeSelecionada(index);
  };

  const handleFecharDetalhe = () => {
    setEquipeSelecionada(null);
  };

  return (
    <div className="equipes-participantes">
      {equipeSelecionada === null ? (
        <div className="equipes-grid">
          {imagens.map((imgSrc, index) => (
            <button
              key={index}
              className={`equipe-button ${imagensVisiveis.includes(index) ? 'visible' : ''}`}
              onClick={() => handleCliqueEquipe(index)}
              aria-label={`Detalhe da Equipe ${index + 1}`}
              style={{ transitionDelay: `${index * 0.1}s` }} // Delay para aparição escalonada
            >
              <img src={imgSrc} alt={`Equipe ${index + 1}`} />
            </button>
          ))}
        </div>
      ) : (
        <DetalheEquipe imagem={detalhes[equipeSelecionada]} onFechar={handleFecharDetalhe} />
      )}
    </div>
  );
}

export default EquipesParticipantes;
