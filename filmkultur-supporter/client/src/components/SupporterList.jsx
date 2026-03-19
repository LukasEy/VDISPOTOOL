function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

// Deterministic color from name for avatars
const AVATAR_COLORS = [
  'bg-[#1a5c5a]', 'bg-stone-600', 'bg-teal-700', 'bg-slate-600',
  'bg-emerald-700', 'bg-cyan-700', 'bg-neutral-600', 'bg-zinc-600',
];
function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function SupporterList({ supporters, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="bg-stone-50 border-b border-stone-200 px-8 py-5 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
          Unterstützerliste
        </h2>
        {!loading && supporters.length > 0 && (
          <span className="text-sm text-[#1a5c5a] font-semibold">
            {supporters.length} {supporters.length === 1 ? 'Person' : 'Personen'}
          </span>
        )}
      </div>

      <div className="p-8">
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-stone-200 shrink-0" />
                <div className="flex-1 space-y-1.5 py-1">
                  <div className="h-3.5 bg-stone-200 rounded w-1/3" />
                  <div className="h-3 bg-stone-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : supporters.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">Noch keine Unterstützer</p>
            <p className="text-gray-400 text-xs mt-1">Seien Sie die erste Person!</p>
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {supporters.map((s) => (
              <li key={s.id} className="flex items-center gap-3 py-3 group">
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-white text-xs font-bold ${avatarColor(s.name)}`}
                >
                  {getInitials(s.name)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{s.name}</p>
                  <p className="text-gray-500 text-xs truncate">
                    {s.funktion}{s.organisation ? ` · ${s.organisation}` : ''}
                  </p>
                </div>
                <span className="text-gray-300 text-xs shrink-0 group-hover:text-gray-400 transition-colors">
                  {formatDate(s.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
