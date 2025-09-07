import { useState, useEffect } from 'react';

const MatrixRain = () => {
  const [drops, setDrops] = useState<Array<{id: number, x: number, delay: number, speed: number, size: number}>>([]);
  const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    const generateDrops = () => {
      const newDrops = [];
      for (let i = 0; i < 50; i++) {
        newDrops.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 3,
          speed: 0.5 + Math.random() * 2,
          size: 12 + Math.random() * 8
        });
      }
      setDrops(newDrops);
    };

    generateDrops();
  }, []);

  return (
    <div className="matrix-rain">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="matrix-char"
          style={{
            left: `${drop.x}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.speed}s`,
            fontSize: `${drop.size}px`
          }}
        >
          {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
