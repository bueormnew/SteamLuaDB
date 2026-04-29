import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

export default function App() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Error cargando config:", err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-brand-dark">
        <Navbar config={config} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home config={config} />} />
            <Route path="/game/:id" element={<GameDetail config={config} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
