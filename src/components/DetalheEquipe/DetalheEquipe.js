// src/components/DetalheEquipe/DetalheEquipe.js

import React from 'react';
import './DetalheEquipe.css';

function DetalheEquipe({ imagem, onFechar }) {
  return (
    <div className="detalhe-overlay">
      <div className="detalhe-conteudo">
        <button className="botao-fechar" onClick={onFechar} aria-label="Fechar Detalhe">
          &times;
        </button>
        <img src={imagem} alt="Detalhe da Equipe" className="imagem-detalhe" />
      </div>
    </div>
  );
}

export default DetalheEquipe;
