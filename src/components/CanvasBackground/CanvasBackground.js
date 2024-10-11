import React, { useEffect, useRef } from 'react';

function CanvasBackground({ luzAcesa, onTrocaFinalizada }) {
  const canvasRef = useRef(null);
  const backgrounds = [
    '/background1.png',
    '/background2.png',
    '/background3.png',
    '/background4.png',
    '/background5.png',
  ];

  useEffect(() => {
    if (!luzAcesa) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let indice = 0;

    const carregarImagem = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    };

    const desenharImagens = async () => {
      for (indice = 0; indice < backgrounds.length; indice++) {
        const img = await carregarImagem(backgrounds[indice]);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        await new Promise((r) => setTimeout(r, 2000)); // Espera 2 segundos antes de desenhar a próxima imagem
      }
      onTrocaFinalizada();
    };

    desenharImagens();
  }, [luzAcesa, onTrocaFinalizada]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: 'absolute', top: 0, left: 0 }}
    ></canvas>
  );
}

export default CanvasBackground;
