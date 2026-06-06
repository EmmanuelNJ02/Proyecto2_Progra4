export default function PageTitle({ title, subtitle }) {
  return <header className="page-title"><h2>{title}</h2>{subtitle && <p className="muted">{subtitle}</p>}</header>;
}
