// EquipesParticipantes.js

import React, { useEffect, useState } from 'react';
import '../EquipesParticipantes/EquipesParticipantes.css';

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


function EquipesParticipantes() {
    const [imagensVisiveis, setImagensVisiveis] = useState([]);
  
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
  
    useEffect(() => {
      let indice = 0;
      const intervalo = setInterval(() => {
        if (indice < imagens.length) {
          setImagensVisiveis((prev) => [...prev, indice]);
          indice += 1;
        } else {
          clearInterval(intervalo);
        }
      }, 500); // Ajuste o tempo conforme necessário
  
      return () => clearInterval(intervalo);
    }, []);
  
    return (
      <div className="equipes-participantes">
        {imagens.map((imgSrc, index) => (
          <button
            key={index}
            className="equipe-button"
            style={{
              animationDelay: `${index * 0.5}s`,
              opacity: imagensVisiveis.includes(index) ? '1' : '0',
            }}
          >
            <img src={imgSrc} alt={`Equipe ${index + 1}`} />
          </button>
        ))}
      </div>
    );
  }
  
  export default EquipesParticipantes;
