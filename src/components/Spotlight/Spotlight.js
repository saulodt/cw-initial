import React, { useState, useEffect } from 'react';
import '../Spotlight/Spotlight.css';

function Spotlight() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="dark-overlay"
      style={{
        background: `radial-gradient(circle 80px at ${cursorPos.x}px ${cursorPos.y}px, transparent 0%, rgba(0, 0, 0, 1) 100%)`,
      }}
    ></div>
  );
}

export default Spotlight;
