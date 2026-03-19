function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function SupporterList({ supporters, loading }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {supporters.length === 0
          ? 'Unterstützerliste'
          : `${supporters.length} ${supporters.length === 1 ? 'Person unterstützt' : 'Personen unterstützen'} dieses Papier`}
      </h2>

      {loading ? (
        <p className="text-gray-400 text-sm">Lade Unterstützerliste …</p>
      ) : supporters.length === 0 ? (
        <p className="text-gray-500 italic">Noch keine Unterstützer – seien Sie die erste Person!</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {supporters.map((s, i) => (
            <li
              key={s.id}
              className={`py-3 px-2 flex flex-col sm:flex-row sm:items-baseline sm:gap-2 ${i % 2 === 0 ? '' : 'bg-gray-50'}`}
            >
              <span className="font-semibold text-gray-900">{s.name}</span>
              <span className="text-gray-500 text-sm">· {s.funktion}</span>
              {s.organisation && (
                <span className="text-gray-500 text-sm">· {s.organisation}</span>
              )}
              <span className="text-gray-400 text-xs sm:ml-auto">{formatDate(s.timestamp)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
