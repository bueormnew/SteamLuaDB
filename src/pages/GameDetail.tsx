import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, ShieldCheck } from 'lucide-react';
import AdBanner from '../components/AdBanner';

export default function GameDetail({ config }: { config: any }) {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    fetch('./database.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((g: any) => g.id === id);
        setGame(found);
      });
  }, [id]);

  if (!game) return <div className="py-20 text-center">Cargando...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-3 text-brand-muted hover:text-brand-accent mb-10 transition-colors text-lg font-bold">
        <ArrowLeft size={24} />
        Volver al catálogo
      </Link>

      <div className="bg-brand-card rounded-soft border border-white/5 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 p-10">
          {/* Left: Icon */}
          <div className="md:col-span-2">
            <div className="aspect-[3/4] rounded-soft overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
              {game.icon ? (
                <img src={`${game.icon}`} alt={game.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 italic text-xl">Sin Imagen</div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="md:col-span-3 flex flex-col justify-center">
            <h1 className="text-5xl font-black mb-4 tracking-tighter">{game.name}</h1>
            <p className="text-brand-accent font-mono text-xl mb-10">ID de Juego: {game.id}</p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-10">
              <a
                href={`${game.downloadUrl}`}
                download
                className="inline-flex items-center justify-center gap-4 bg-brand-accent hover:bg-blue-600 text-white font-black py-5 px-10 rounded-soft transition-all transform hover:scale-105 text-xl shadow-lg shadow-brand-accent/20"
              >
                <Download size={28} />
                DESCARGAR .LUA
              </a>
              <div className="flex items-center justify-center gap-3 text-green-500 text-lg bg-green-500/10 px-6 py-4 rounded-soft border border-green-500/20 font-bold">
                <ShieldCheck size={24} />
                Seguro / Verificado
              </div>
            </div>

            <AdBanner slot={config?.adsense?.slots?.bottomBanner} config={config} />
          </div>
        </div>

        {/* Bottom: Readme Content */}
        <div className="border-t border-white/5 p-10 bg-black/20">
          <h2 className="text-2xl font-black mb-6 uppercase tracking-widest text-brand-muted">Información y Guía</h2>
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-brand-text leading-relaxed text-lg bg-white/5 p-8 rounded-soft border border-white/5">
              {game.description}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
