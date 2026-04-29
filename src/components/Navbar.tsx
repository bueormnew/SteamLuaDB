import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ config }: { config: any }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-brand-card border-b border-white/5 py-6 px-8 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-black text-brand-accent tracking-tighter">
          STEAM<span className="text-white">LUA</span>DB
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Buscar por nombre de juego o ID..."
            className="w-full bg-brand-dark border border-white/10 rounded-soft px-12 py-4 text-lg focus:outline-none focus:border-brand-accent transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-4.5 text-brand-muted" size={24} />
        </form>

        {/* Support */}
        <div className="flex items-center gap-4">
          <a
            href={config?.support?.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-bold hover:text-brand-accent transition-colors bg-white/5 px-6 py-3 rounded-soft border border-white/5"
          >
            {config?.support?.text || 'Soporte'}
          </a>
        </div>
      </div>
    </nav>
  );
}
