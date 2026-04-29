import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import AdBanner from '../components/AdBanner';
import { Download, Clock } from 'lucide-react';

export default function Home({ config }: { config: any }) {
  const [games, setGames] = useState<any[]>([]);
  const [filteredGames, setFilteredGames] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  useEffect(() => {
    fetch('/SteamLuaDB/database.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setFilteredGames(data);
      });
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = games.filter(g => 
        g.name.toLowerCase().includes(query) || 
        g.id.toLowerCase().includes(query)
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames(games);
    }
  }, [query, games]);

  const recentGames = games.slice(0, 4);

  return (
    <div>
      <AdBanner slot={config?.adsense?.slots?.topBanner} config={config} />

      {!query && recentGames.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
            <Clock className="text-brand-accent" size={28} />
            ÚLTIMOS SUBIDOS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-black mb-8">
          {query ? `RESULTADOS PARA "${query.toUpperCase()}"` : 'CATÁLOGO COMPLETO'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {filteredGames.length === 0 && (
          <div className="text-center py-32 bg-brand-card rounded-soft border border-dashed border-white/10">
            <p className="text-xl text-brand-muted italic">No se encontraron juegos con ese nombre o ID.</p>
          </div>
        )}
      </section>

      <AdBanner slot={config?.adsense?.slots?.middleBanner} config={config} />
    </div>
  );
}

function GameCard({ game }: { game: any }) {
  return (
    <Link 
      to={`/game/${game.id}`}
      className="bg-brand-card rounded-soft border border-white/5 overflow-hidden hover:border-brand-accent/50 transition-all hover:-translate-y-2 group"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-white/5">
        {game.icon ? (
          <img src={`${game.icon}`} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 italic">Sin Imagen</div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-black text-xl mb-2 truncate group-hover:text-brand-accent transition-colors">{game.name}</h3>
        <p className="text-base text-brand-muted mb-6 font-mono">ID: {game.id}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-muted">Ver Detalles</span>
          <div className="bg-brand-accent/10 p-3 rounded-soft text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
            <Download size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
