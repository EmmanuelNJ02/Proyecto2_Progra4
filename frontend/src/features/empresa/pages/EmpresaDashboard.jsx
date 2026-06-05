import { useEffect, useState } from 'react';
import RegistroEmpresaForm from '../../auth/components/RegistroEmpresaForm.jsx';
import { useAuth } from '../../auth/context/AuthContext.jsx';
import { publicService } from '../../public/services/publicService.js';
import Alert from '../../../shared/components/Alert.jsx';
import { empresaService } from '../services/empresaService.js';
import { useEmpresaDashboard } from '../hooks/useEmpresaDashboard.js';
import PuestoForm from '../components/PuestoForm.jsx';
import PuestoList from '../components/PuestoList.jsx';

export default function EmpresaDashboard() {
    const { user } = useAuth();
    const [features, setFeatures] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const { puestos, candidatos, loadingCandidates, cargarPuestos, togglePuesto, buscarCandidatos } = useEmpresaDashboard(user);

    useEffect(() => { publicService.caracteristicas().then(setFeatures); }, []);

    async function publicar(form) {
        setMessage(''); setError('');
        try {
            const r = await empresaService.publicar(user.usuarioId, form);
            setMessage(r.mensaje);
            await cargarPuestos();
        } catch (err) { setError(err.message); }
    }

    async function guardarPuesto(puestoId, form) {
        setMessage(''); setError('');
        try {
            const r = await empresaService.actualizar(puestoId, form);
            setMessage(r.mensaje);
            setEditingId(null);
            await cargarPuestos();
        } catch (err) { setError(err.message); }
    }

    async function buscar(puestoId) {
        setMessage(''); setError('');
        try { await buscarCandidatos(puestoId); }
        catch (err) { setError(err.message); }
    }

    if (!user || user.rol !== 'EMPRESA') return <RegistroEmpresaForm />;

    return (
        <section className="dashboard">
            <aside className="side">
                <h2>Empresa</h2>
                <p>Dashboard privado para publicar puestos, actualizar requisitos, cambiar visibilidad y buscar candidatos.</p>
            </aside>
            <section className="panel dashboard-panel">
                <Alert>{message}</Alert><Alert type="bad">{error}</Alert>
                <PuestoForm features={features} onSubmit={publicar} />
                <hr />
                <div className="section-heading compact"><h2>Mis puestos</h2><p>Administra tus puestos publicados y consulta candidatos compatibles.</p></div>
                <PuestoList
                    puestos={puestos}
                    candidatos={candidatos}
                    loadingCandidates={loadingCandidates}
                    features={features}
                    editingId={editingId}
                    onToggle={togglePuesto}
                    onBuscar={buscar}
                    onEdit={setEditingId}
                    onCancelEdit={() => setEditingId(null)}
                    onSavePuesto={guardarPuesto}
                />
            </section>
        </section>
    );
}
