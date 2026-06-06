import { apiClient } from '../../../shared/api/apiClient.js';

export const publicService = {
  caracteristicas() {
    return apiClient.get('/api/public/caracteristicas');
  },

  puestosRecientes() {
    return apiClient.get('/api/public/puestos/recientes');
  },

  buscarPuestos(caracteristicas = []) {
    const query = caracteristicas
        .map(id => `caracteristicas=${encodeURIComponent(id)}`)
        .join('&');

    return apiClient.get('/api/public/puestos/buscar' + (query ? `?${query}` : ''));
  }
};
