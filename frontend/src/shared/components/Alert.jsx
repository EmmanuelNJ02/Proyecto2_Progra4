export default function Alert({ type = 'ok', children }) {
  if (!children) return null;
  return <div className={`alert ${type}`}>{children}</div>;
}
