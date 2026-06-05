import { useCallback, useEffect, useState } from 'react';
import { empresaService } from '../services/empresaService.js';

export function useEmpresaDashboard(user) {
    const [puestos, setPuestos] = useState([]);
    const [candidatos, setCandidatos] = useState({});
    const [loadingCandidates, setLoadingCandidates] = useState({});

    const cargarPuestos = useCallback(async () => {
        if (user?.rol === 'EMPRESA') {
            setPuestos(await empresaService.puestos(user.usuarioId));
        }
    }, [user]);

    useEffect(() => { cargarPuestos(); }, [cargarPuestos]);

    async function togglePuesto(puesto) {
        if (puesto.activo) await empresaService.desactivar(puesto.id);
        else await empresaService.activar(puesto.id);
        await cargarPuestos();
    }

    async function buscarCandidatos(puestoId) {
        setLoadingCandidates(actual => ({ ...actual, [puestoId]: true }));
        try {
            const encontrados = await empresaService.candidatos(puestoId);
            setCandidatos(actual => ({ ...actual, [puestoId]: encontrados }));
        } finally {
            setLoadingCandidates(actual => ({ ...actual, [puestoId]: false }));
        }
    }

    return { puestos, candidatos, loadingCandidates, cargarPuestos, togglePuesto, buscarCandidatos };
}
