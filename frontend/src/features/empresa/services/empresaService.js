import { apiClient } from '../../../shared/api/apiClient.js';

export const empresaService = {
    puestos(empresaId) { return apiClient.get(`/api/empresa/${empresaId}/puestos`); },
    publicar(empresaId, form) { return apiClient.post(`/api/empresa/${empresaId}/puestos`, form); },
    actualizar(puestoId, form) { return apiClient.post(`/api/empresa/puestos/${puestoId}`, form); },
    actualizarRequisitos(puestoId, requisitos) { return apiClient.post(`/api/empresa/puestos/${puestoId}/requisitos`, requisitos); },
    desactivar(puestoId) { return apiClient.post(`/api/empresa/puestos/${puestoId}/desactivar`, {}); },
    activar(puestoId) { return apiClient.post(`/api/empresa/puestos/${puestoId}/activar`, {}); },
    candidatos(puestoId) { return apiClient.get(`/api/empresa/puestos/${puestoId}/candidatos`); }
};
