import { useState, useEffect, useRef } from 'react';
import PolicyDocument from './components/PolicyDocument.jsx';
import SupporterForm from './components/SupporterForm.jsx';
import SupporterList from './components/SupporterList.jsx';

export default function App() {
  const [supporters, setSupporters] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const formRef = useRef(null);
  const heroRef = useRef(null);

  const fetchSupporters = async () => {
    try {
      const res = await fetch('/api/supporters');
      const data = await res.json();
      setSupporters(data.supporters || []);
    } catch {
      // silent
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchSupporters();
    const interval = setInterval(fetchSupporters, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sticky top CTA bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-[#1a5c5a] text-white shadow-lg transition-transform duration-300 ${
          showSticky ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <span className="text-sm font-medium truncate">
            <span className="font-bold text-[#a3d9d7]">{supporters.length}</span>
            {' '}Unterstützer:innen · Strategiepapier Filmstandort SH 2026
          </span>
          <button
            onClick={scrollToForm}
            className="shrink-0 bg-white text-[#1a5c5a] font-semibold px-4 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors"
          >
            Unterstützen →
          </button>
        </div>
      </div>

      {/* Hero */}
      <header ref={heroRef} className="bg-[#1a5c5a] text-white">
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#a3d9d7] mb-3">
            Filmkultur Schleswig-Holstein e.V.
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Strategiepapier<br />Filmstandort SH 2026
          </h1>
          <p className="text-[#d1edec] text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Zukunftsfähig. Vernetzt. Unverwechselbar. — Ein Aktionsplan für den Filmstandort
            Schleswig-Holstein 2026–2032, erarbeitet von Filmkultur SH e.V.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex flex-col">
              <span className="text-4xl font-bold tabular-nums">
                {loadingList ? '—' : supporters.length}
              </span>
              <span className="text-[#a3d9d7] text-sm">Unterstützer:innen</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">6</span>
              <span className="text-[#a3d9d7] text-sm">Sofort-Schritte</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">3</span>
              <span className="text-[#a3d9d7] text-sm">Phasen bis 2032</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={scrollToForm}
              className="bg-white text-[#1a5c5a] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Jetzt unterstützen →
            </button>
            <a
              href="#strategiepapier"
              className="border border-white/40 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm text-center"
            >
              Strategiepapier lesen ↓
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Recent supporters preview */}
        {supporters.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 px-6 py-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1a5c5a] mb-3">
              Zuletzt unterzeichnet
            </p>
            <div className="flex flex-wrap gap-2">
              {supporters.slice(0, 8).map((s) => (
                <RecentBadge key={s.id} supporter={s} />
              ))}
              {supporters.length > 8 && (
                <span className="inline-flex items-center text-xs text-gray-400 px-2">
                  +{supporters.length - 8} weitere
                </span>
              )}
            </div>
          </div>
        )}

        {/* Policy document */}
        <div id="strategiepapier">
          <PolicyDocument />
        </div>

        {/* Supporter form */}
        <div ref={formRef} id="unterstuetzen" className="scroll-mt-4">
          <SupporterForm onSuccess={fetchSupporters} />
        </div>

        {/* Supporter list */}
        <SupporterList supporters={supporters} loading={loadingList} />
      </main>

      <footer className="border-t border-stone-200 text-center text-xs text-gray-400 py-10 px-4 space-y-1">
        <p className="font-medium text-gray-500">Filmkultur Schleswig-Holstein e.V.</p>
        <p>Lukas Eylandt · Vorstand · le@filmkultur.sh · www.filmkultur.sh</p>
        <p className="pt-2">
          Daten werden ausschließlich für diese Unterstützerliste gespeichert.
          IP-Adressen werden gehashed und nicht personenbezogen gespeichert.
        </p>
      </footer>
    </div>
  );
}

function RecentBadge({ supporter }) {
  const initials = supporter.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-full px-3 py-1" title={`${supporter.name} · ${supporter.funktion}`}>
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1a5c5a] text-white text-[10px] font-bold shrink-0">
        {initials}
      </span>
      <span className="text-xs text-gray-700 font-medium truncate max-w-[120px]">
        {supporter.name.split(' ')[0]}
      </span>
    </div>
  );
}
