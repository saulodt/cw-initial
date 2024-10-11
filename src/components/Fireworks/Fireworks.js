// src/components/Fireworks/Fireworks.js

import React, { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';
import './Fireworks.css';

function FireworksComponent() {
  const containerRef = useRef(null);
  const fireworksInstance = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Configurações dos fogos de artifício
      const options = {
        speed: 0.55,
        acceleration: 1,
        friction: 1,
        gravity: 1.5,
        particles: 30,
        trace: 3,
        explosion: 3,
        autoresize: true,
        brightness: {
          min: 50,
          max: 80,
          decay: {
            min: 0.015,
            max: 0.03
          }
        },
        boundaries: {
          x: 0,
          y: 0,
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        },
        sound: {
          enable: true
        }
      };

      // Cria a instância dos fogos de artifício
      fireworksInstance.current = new Fireworks(containerRef.current, options);
      fireworksInstance.current.start();
    }

    // Limpeza ao desmontar o componente
    return () => {
      if (fireworksInstance.current) {
        fireworksInstance.current.stop();
      }
    };
  }, []);

  return (
    <div className="fireworks-container" ref={containerRef}>
      {/* O container dos fogos de artifício */}
    </div>
  );
}

export default FireworksComponent;
