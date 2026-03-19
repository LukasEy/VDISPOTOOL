import { useState } from 'react';

export default function SupporterForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', funktion: '', organisation: '', dsgvo: false });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/supporters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', funktion: '', organisation: '', dsgvo: false });
      onSuccess();
    } catch {
      setErrorMsg('Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-8" id="form">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dieses Papier unterstützen</h2>

      {status === 'success' ? (
        <div className="bg-[#1a5c5a] text-white rounded-lg p-6 text-center">
          <p className="text-lg font-semibold mb-1">Vielen Dank für Ihre Unterstützung!</p>
          <p className="text-sm opacity-80">Ihr Name erscheint gleich in der Unterstützerliste.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              placeholder="Ihr vollständiger Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c5a] focus:ring-1 focus:ring-[#1a5c5a]"
            />
          </div>

          <div>
            <label htmlFor="funktion" className="block text-sm font-semibold text-gray-700 mb-1">
              Funktion / Rolle <span className="text-red-500">*</span>
            </label>
            <input
              id="funktion"
              name="funktion"
              type="text"
              required
              maxLength={100}
              placeholder="z. B. Filmemacherin, Kulturpolitiker, Produzent"
              value={form.funktion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c5a] focus:ring-1 focus:ring-[#1a5c5a]"
            />
          </div>

          <div>
            <label htmlFor="organisation" className="block text-sm font-semibold text-gray-700 mb-1">
              Organisation / Firma
            </label>
            <input
              id="organisation"
              name="organisation"
              type="text"
              maxLength={100}
              placeholder="optional"
              value={form.organisation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a5c5a] focus:ring-1 focus:ring-[#1a5c5a]"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="dsgvo"
              name="dsgvo"
              type="checkbox"
              required
              checked={form.dsgvo}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1a5c5a] focus:ring-[#1a5c5a] cursor-pointer"
            />
            <label htmlFor="dsgvo" className="text-sm text-gray-700 cursor-pointer">
              Ich stimme zu, dass mein Name und meine Funktion auf dieser Seite öffentlich angezeigt werden.{' '}
              <span className="text-red-500">*</span>
            </label>
          </div>

          {status === 'error' && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto bg-[#1a5c5a] hover:bg-[#216e6b] disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded transition-colors text-sm"
          >
            {status === 'loading' ? 'Wird gespeichert …' : 'Jetzt unterstützen →'}
          </button>

          <p className="text-xs text-gray-400">
            Ihre Daten werden ausschließlich für diese Unterstützerliste verwendet.
          </p>
        </form>
      )}
    </div>
  );
}
