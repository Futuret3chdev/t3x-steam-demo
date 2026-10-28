export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: 800, margin: '0 auto' }}>
      <h1>T3x Steam Demo</h1>
      <p>Browser-accessible demo / landing for the T3x game on Steam.</p>
      <p>Play the demo below or wishlist on Steam (coming soon).</p>
      <div style={{ border: '1px solid #ccc', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem 0' }}>
        <p>Interactive demo canvas / game embed goes here.</p>
      </div>
      <p>
        Wallet: <a href="https://t3x-wallet.vercel.app/">Infinite Wallet</a>
      </p>
      <p>Prepared for Steamworks integration. Self-custodial. No seed leaves the device.</p>
    </main>
  );
}
