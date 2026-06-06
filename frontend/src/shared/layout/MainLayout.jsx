import Navbar from '../components/Navbar.jsx';

export default function MainLayout({ children }) {
  return (
    <main className="container">
      <Navbar />
      {children}
      <footer className="footer">
        <b>Bolsa de Empleo</b>
        <span>Contacto: info@bolsaempleo.local · Créditos: Emmanuel y Dorian</span>
      </footer>
    </main>
  );
}
