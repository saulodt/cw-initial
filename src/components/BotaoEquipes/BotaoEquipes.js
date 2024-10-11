// BotaoEquipes.js

import React from 'react';
import './BotaoEquipes.css';

function BotaoEquipes({ onClick }) {
  return (
    <button className="botao-equipes" onClick={onClick}>
      Equipes Participantes
    </button>
  );
}

export default BotaoEquipes;
