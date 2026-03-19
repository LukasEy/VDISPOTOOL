import { useState, useEffect, useRef } from 'react';
import PolicyDocument from './components/PolicyDocument.jsx';
import SupporterForm from './components/SupporterForm.jsx';
import SupporterList from './components/SupporterList.jsx';

export default function App() {
  const [supporters, setSupporters] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const formRef = useRef(null);

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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1a5c5a] text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-sm font-medium tracking-wide uppercase opacity-80">Filmkultur Schleswig-Holstein e.V.</p>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">Strategiepapier Filmstandort SH 2026</h1>
          </div>
          <button
            onClick={scrollToForm}
            className="self-start sm:self-auto bg-white text-[#1a5c5a] font-semibold px-4 py-2 rounded text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Jetzt unterstützen →
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Policy document */}
        <PolicyDocument />

        {/* Supporter form */}
        <div ref={formRef} id="unterstuetzen">
          <SupporterForm onSuccess={fetchSupporters} />
        </div>

        {/* Supporter list */}
        <SupporterList supporters={supporters} loading={loadingList} />
      </main>

      <footer className="text-center text-xs text-gray-400 py-8 px-4">
        Filmkultur Schleswig-Holstein e.V. · Lukas Eylandt · Vorstand · le@filmkultur.sh · www.filmkultur.sh
      </footer>
    </div>
  );
}
