import React, { useEffect, useState } from 'react';
import '../GerenciadorBackground/GerenciadorBackground.css';

function GerenciadorBackground({ luzAcesa, onTrocaFinalizada }) {
  const backgrounds = [
    '/background1.png',
    '/background2.png',
    '/background3.png',
    '/background4.png',
    '/background5.png',
  ];

  const [imagensExibidas, setImagensExibidas] = useState([backgrounds[0]]);

  useEffect(() => {
    if (!luzAcesa) return;

    let indice = 1; // Começar do segundo background
    const intervalo = setInterval(() => {
      if (indice < backgrounds.length) {
        setImagensExibidas((prevImagens) => [...prevImagens, backgrounds[indice]]);
        indice += 1;
      } else {
        clearInterval(intervalo);
        onTrocaFinalizada();
      }
    }, 2000); // Troca de imagem a cada 2 segundos

    return () => clearInterval(intervalo);
  }, [luzAcesa, onTrocaFinalizada]);

  return (
    <div className="background-container">
      {imagensExibidas.map((imagem, index) => (
        <div
          key={index}
          className={`background-layer layer-${index}`}
          style={{
            backgroundImage: `url(${imagem})`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default GerenciadorBackground;
