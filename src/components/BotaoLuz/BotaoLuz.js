import React from 'react';
import '../BotaoLuz/BotaoLuz.css';

function BotaoLuz({ luzAcesa, onClick }) {
  return (
    !luzAcesa && (
      <button className="botao-luz" onClick={onClick}>
        Acender a Luz
      </button>
    )
  );
}

export default BotaoLuz;
