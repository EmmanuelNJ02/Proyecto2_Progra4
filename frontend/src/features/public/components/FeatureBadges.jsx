export default function FeatureBadges({ requisitos = [], empty = 'Sin requisitos registrados' }) {
  if (!requisitos.length) return <span className="muted">{empty}</span>;
  return (
    <div className="badges">
      {requisitos.map((r, idx) => <span key={`${r.caracteristicaId}-${idx}`} className="badge">{r.nombre} ({r.nivel})</span>)}
    </div>
  );
}
