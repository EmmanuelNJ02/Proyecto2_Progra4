import { useEffect, useState } from 'react';
import RegistroOferenteForm from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/features/auth/components/RegistroOferenteForm.jsx';
import { useAuth } from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/features/auth/context/AuthContext.jsx';
import { publicService } from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/features/public/services/publicService.js';
import Alert from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/shared/components/Alert.jsx';
import { oferenteService } from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/features/oferente/services/oferenteService.js';
import OferenteProfile from '../components/OferenteProfile.jsx';
import SkillEditor from '../components/SkillEditor.jsx';
import CvUploader from '../components/CvUploader.jsx';

export default function OferenteDashboard() {
  const { user } = useAuth();
  const [features, setFeatures] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { publicService.caracteristicas().then(setFeatures); }, []);
  useEffect(() => { if (user?.rol === 'OFERENTE') cargarPerfil(); }, [user]);
  async function cargarPerfil() { setPerfil(await oferenteService.perfil(user.usuarioId)); }
  async function guardarHabilidades(habilidades) { try { const r = await oferenteService.guardarHabilidades(user.usuarioId, habilidades); setMessage(r.mensaje); await cargarPerfil(); } catch (err) { setError(err.message); } }
  async function subirCv(file) { try { const r = await oferenteService.subirCv(user.usuarioId, file); setMessage(r.mensaje); await cargarPerfil(); } catch (err) { setError(err.message); } }

  if (!user || user.rol !== 'OFERENTE') return <RegistroOferenteForm />;

  return <section className="dashboard"><aside className="side"><h2>Oferente</h2><p>Actualiza habilidades y sube tu currículo PDF para que empresas puedan verlo.</p></aside><section className="panel"><Alert>{message}</Alert><Alert type="bad">{error}</Alert><OferenteProfile perfil={perfil}/><hr/><SkillEditor features={features} habilidadesActuales={perfil?.habilidades || []} onSave={guardarHabilidades}/><hr/><CvUploader onUpload={subirCv}/></section></section>;
}
