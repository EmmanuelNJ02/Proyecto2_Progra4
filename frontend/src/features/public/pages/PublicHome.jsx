import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/shared/components/Loading.jsx';
import JobCard from '../components/JobCard.jsx';
import { publicService } from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/features/public/services/publicService.js';

export default function PublicHome() {
  const [puestos, setPuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.puestosRecientes().then(setPuestos).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-card">
          <h2>Bolsa de empleo para empresas y oferentes</h2>
          <p>Publicá puestos, registrá habilidades, subí tu CV en PDF y consultá coincidencias entre lo solicitado por empresas y lo ofrecido por candidatos.</p>
          <div className="actions">
            <Link className="btn primary" to="/buscar">Buscar puestos públicos</Link>
            <Link className="btn" to="/login">Ingresar</Link>
          </div>
        </div>
        <div className="panel">
          <h3>Accesos de prueba</h3>
          <p><b>Admin:</b> admin@bolsaempleo.com / admin123</p>
          <p><b>Empresa:</b> empresa.demo@bolsaempleo.com / demo123</p>
          <p><b>Oferente:</b> oferente.demo@bolsaempleo.com / demo123</p>
        </div>
      </section>
      <h2 className="section-title">Puestos públicos recientes</h2>
      {loading ? <Loading /> : <section className="grid">{puestos.map(p => <JobCard key={p.id} puesto={p} />)}</section>}
    </>
  );
}
