import { useEffect, useState } from 'react';
import Alert from '../../../shared/components/Alert.jsx';
import { publicService } from '../../public/services/publicService.js';
import { adminService } from '../services/adminService.js';
import PendingUsersPanel from '../components/PendingUsersPanel.jsx';
import CharacteristicForm from '../components/CharacteristicForm.jsx';
import CharacteristicTree from '../components/CharacteristicTree.jsx';

export default function AdminDashboard() {
    const [rol, setRol] = useState('EMPRESA');
    const [pendientes, setPendientes] = useState([]);
    const [features, setFeatures] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => { cargarFeatures(); cargarPendientes('EMPRESA'); }, []);
    async function cargarFeatures() { setFeatures(await publicService.caracteristicas()); }
    async function cargarPendientes(nextRol = rol) { setRol(nextRol); setPendientes(await adminService.pendientes(nextRol)); }
    async function aprobar(id) { setMessage(''); setError(''); try { const r = await adminService.aprobar(id); setMessage(r.mensaje); await cargarPendientes(rol); } catch (err) { setError(err.message); } }
    async function rechazar(id) { setMessage(''); setError(''); try { const r = await adminService.rechazar(id); setMessage(r.mensaje); await cargarPendientes(rol); } catch (err) { setError(err.message); } }
    async function crear(form) { setMessage(''); setError(''); try { const r = await adminService.crearCaracteristica(form); setMessage(r.mensaje); await cargarFeatures(); } catch (err) { setError(err.message); } }
    async function actualizarCaracteristica(id, form) { setMessage(''); setError(''); try { const r = await adminService.actualizarCaracteristica(id, form); setMessage(r.mensaje); await cargarFeatures(); } catch (err) { setError(err.message); } }
    async function eliminarCaracteristica(id) { setMessage(''); setError(''); try { const r = await adminService.eliminarCaracteristica(id); setMessage(r.mensaje); await cargarFeatures(); } catch (err) { setError(err.message); } }

    return (
        <section className="dashboard">
            <aside className="side"><h2>Administrador</h2><p>Autoriza empresas y oferentes, rechaza solicitudes y administra características jerárquicas.</p><button className="btn" onClick={() => cargarPendientes('EMPRESA')}>Empresas pendientes</button><button className="btn" onClick={() => cargarPendientes('OFERENTE')}>Oferentes pendientes</button></aside>
            <section className="panel dashboard-panel"><Alert>{message}</Alert><Alert type="bad">{error}</Alert><PendingUsersPanel rol={rol} pendientes={pendientes} onApprove={aprobar} onReject={rechazar}/><hr/><CharacteristicForm features={features} onSubmit={crear}/><hr/><CharacteristicTree features={features} onUpdate={actualizarCaracteristica} onDelete={eliminarCaracteristica}/></section>
        </section>
    );
}
