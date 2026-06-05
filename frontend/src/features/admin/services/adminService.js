import { apiClient } from '../../../shared/api/apiClient.js';

export const adminService = {
    pendientes(rol) { return apiClient.get(`/api/admin/pendientes/${rol}`); },
    aprobar(id) { return apiClient.post(`/api/admin/usuarios/${id}/aprobar`, {}); },
    rechazar(id) { return apiClient.post(`/api/admin/usuarios/${id}/rechazar`, {}); },
    crearCaracteristica(form) { return apiClient.post('/api/admin/caracteristicas', form); },
    actualizarCaracteristica(id, form) { return apiClient.post(`/api/admin/caracteristicas/${id}`, form); },
    eliminarCaracteristica(id) { return apiClient.delete(`/api/admin/caracteristicas/${id}`); }
};
