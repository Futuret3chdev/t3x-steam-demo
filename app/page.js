'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [message, setMessage] = useState('Click the gold T3x tokens to collect them');
  const [tutorialStep, setTutorialStep] = useState(0);
  const steps = [
    'Click to move and collect gold T3x tokens.',
    'Each collection raises your score. Keep going.',
    'This slice previews the predator loop in the full ASHWAKE beta.',
    'Bank your progress in the full game — dock to keep t3x.'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 400;

    let playerX = 320;
    let playerY = 200;
    let tokens = [];
    let running = true;

    function spawnToken() {
      tokens.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
        r: 14
      });
    }

    for (let i = 0; i < 5; i++) spawnToken();

    function draw() {
      if (!running) return;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.beginPath();
      ctx.arc(playerX, playerY, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('You', playerX - 12, playerY + 4);

      tokens.forEach((t) => {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('T3x', t.x - 10, t.y + 4);
      });

      requestAnimationFrame(draw);
    }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      playerX = clickX;
      playerY = clickY;

      const before = tokens.length;
      tokens = tokens.filter((t) => {
        const dist = Math.hypot(clickX - t.x, clickY - t.y);
        if (dist < t.r + 18) {
          setScore((s) => {
            const next = s + 1;
            setBest((b) => Math.max(b, next));
            return next;
          });
          return false;
        }
        return true;
      });

      if (tokens.length < before) {
        setMessage(`Collected! Score: ${score + (before - tokens.length)}`);
        while (tokens.length < 5) spawnToken();
      } else {
        setMessage('Move closer and click a gold T3x');
      }
    }

    canvas.addEventListener('click', onClick);
    draw();

    return () => {
      running = false;
      canvas.removeEventListener('click', onClick);
    };
  }, [score]);

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: 860, margin: '0 auto', textAlign: 'center', background: '#111', color: '#eee', minHeight: '100vh' }}>
      <h1 style={{ color: '#00ff88' }}>T3x Steam Demo</h1>
      <p>Playable browser slice. Steam developer: <strong>Futuret3Ch</strong></p>
      <p style={{ fontSize: '1.4rem', color: '#ffd700' }}>Score: {score} T3x &nbsp;|&nbsp; Best: {best}</p>
      <p>{message}</p>

      {tutorialStep < steps.length && (
        <div style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid #00ff88', borderRadius: 8, padding: '12px 16px', margin: '1rem auto', maxWidth: 480 }}>
          <div>{steps[tutorialStep]}</div>
          <button type="button" onClick={() => setTutorialStep(tutorialStep + 1)} style={{ marginTop: 8, background: '#00ff88', color: '#000', border: 'none', padding: '6px 14px', borderRadius: 4, cursor: 'pointer' }}>
            {tutorialStep + 1 >= steps.length ? 'Start collecting' : 'Next'}
          </button>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{ border: '3px solid #00ff88', borderRadius: 12, cursor: 'pointer', maxWidth: '100%', background: '#000', margin: '1rem 0' }}
      />

      <div style={{ margin: '1.5rem 0', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="https://ashwake-unv5.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.8rem 1.6rem', background: '#00ff88', color: '#000', borderRadius: 6, textDecoration: 'none', fontWeight: 'bold' }}>
          Play full ASHWAKE beta
        </a>
        <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '0.8rem 1.6rem', background: '#1b2838', color: '#fff', borderRadius: 6, textDecoration: 'none', fontWeight: 'bold' }}>
          Wishlist on Steam (coming soon)
        </a>
      </div>

      <section style={{ textAlign: 'left', maxWidth: 640, margin: '2rem auto', lineHeight: 1.6 }}>
        <h2 style={{ color: '#00ff88' }}>Best-run summary</h2>
        <p>Your best score this session: <strong>{best} T3x</strong>. In the full ASHWAKE beta you bank t3x by docking, keep a third if the city falls, and spend it at the Stack.</p>
        <h2 style={{ color: '#00ff88', marginTop: '1.5rem' }}>From this slice to Steam</h2>
        <p>This collector is the lightweight vertical slice. The full game (pilot VANTAGE, eat towns, manage wake, unpack the workshop) lives at the ASHWAKE beta. The native Steam build under Futuret3Ch will add Steamworks achievements, cloud saves, and overlay while preserving the same core loop.</p>
        <p>Self-custodial wallet stays client-side. No seed leaves the device.</p>
        <p>Wallet: <a href="https://t3x-wallet.vercel.app/" style={{ color: '#00ff88' }}>Infinite Wallet</a></p>
      </section>

      <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Prepared for Steamworks. Demo AppID can be created separately on Steam.</p>
    </main>
  );
}
