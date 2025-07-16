import ScamDetectiveGraph from '../components/ScamDetectiveGraph';

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: '#f5f6fa' }}>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>
        CryptoNest Dolandırıcılık Dedektif Şeması
      </h1>
      <ScamDetectiveGraph />
    </main>
  );
}