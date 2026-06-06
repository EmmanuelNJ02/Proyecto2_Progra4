export default function Button({ children, variant = '', type = 'button', ...props }) {
  return <button type={type} className={`btn ${variant}`.trim()} {...props}>{children}</button>;
}
