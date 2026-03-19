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

  if (status === 'success') {
    return (
      <div className="bg-[#1a5c5a] text-white rounded-xl shadow-sm p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-1">Vielen Dank für Ihre Unterstützung!</h3>
        <p className="text-white/70 text-sm">Ihr Name erscheint gleich in der Unterstützerliste.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="bg-stone-50 border-b border-stone-200 px-8 py-5">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
          Dieses Strategiepapier unterstützen
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Zeigen Sie öffentlich Ihre Unterstützung für den Filmstandort Schleswig-Holstein.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            id="name"
            label="Name"
            required
            placeholder="Ihr vollständiger Name"
            value={form.name}
            onChange={handleChange}
          />
          <Field
            id="funktion"
            label="Funktion / Rolle"
            required
            placeholder="z. B. Filmemacherin, Produzent"
            value={form.funktion}
            onChange={handleChange}
          />
        </div>
        <Field
          id="organisation"
          label="Organisation / Firma"
          placeholder="optional"
          value={form.organisation}
          onChange={handleChange}
        />

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            id="dsgvo"
            name="dsgvo"
            type="checkbox"
            required
            checked={form.dsgvo}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1a5c5a] focus:ring-[#1a5c5a] cursor-pointer"
          />
          <span className="text-sm text-gray-600 leading-snug group-hover:text-gray-800 transition-colors">
            Ich stimme zu, dass mein Name und meine Funktion auf dieser Seite öffentlich angezeigt werden.{' '}
            <span className="text-red-500">*</span>
          </span>
        </label>

        {status === 'error' && (
          <div className="flex gap-2 text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#1a5c5a] hover:bg-[#216e6b] disabled:opacity-60 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Wird gespeichert …
              </span>
            ) : 'Jetzt unterstützen →'}
          </button>
          <p className="text-xs text-gray-400">
            Ihre Daten werden ausschließlich für diese Unterstützerliste verwendet.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ id, label, required, placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        required={required}
        maxLength={100}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1a5c5a] focus:ring-2 focus:ring-[#1a5c5a]/20 transition-shadow"
      />
    </div>
  );
}
