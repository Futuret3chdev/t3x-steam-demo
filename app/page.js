'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Click to start collecting T3x');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;

    let x = 50;
    let y = 200;
    let targetX = Math.random() * 500 + 50;
    let targetY = Math.random() * 300 + 50;
    let running = true;

    function draw() {
      if (!running) return;
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Player
      ctx.fillStyle = '#00ff88';
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();

      // Target (T3x token)
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.fillText('T3x', targetX - 10, targetY + 4);

      requestAnimationFrame(draw);
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Move player toward click
      x = clickX;
      y = clickY;

      // Check collection
      const dist = Math.hypot(clickX - targetX, clickY - targetY);
      if (dist < 30) {
        setScore((s) => s + 1);
        setMessage('Collected! +1 T3x');
        targetX = Math.random() * 500 + 50;
        targetY = Math.random() * 300 + 50;
      }
    }

    canvas.addEventListener('click', onClick);
    draw();

    return () => {
      running = false;
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
      <h1>T3x Steam Demo</h1>
      <p>Browser-accessible playable demo for the T3x game on Steam.</p>
      <p>Steam name: Futuret3Ch</p>
      <p style={{ fontSize: '1.2rem' }}>Score: {score} T3x collected</p>
      <p>{message}</p>
      <canvas
        ref={canvasRef}
        style={{ border: '2px solid #00ff88', borderRadius: 8, cursor: 'pointer', maxWidth: '100%' }}
      />
      <p style={{ marginTop: '1rem' }}>
        Wallet: <a href="https://t3x-wallet.vercel.app/">Infinite Wallet</a>
      </p>
      <p>Prepared for Steamworks integration. Self-custodial. No seed leaves the device.</p>
    </main>
  );
}
