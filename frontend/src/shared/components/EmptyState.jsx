export default function EmptyState({ title = 'Sin resultados', message = 'No hay información para mostrar.' }) {
  return <div className="empty-state"><h3>{title}</h3><p className="muted">{message}</p></div>;
}
