import { apiClient } from '../../../shared/api/apiClient.js';

export const oferenteService = {
  perfil(oferenteId) {
    return apiClient.get(`/api/oferente/${oferenteId}/perfil`);
  },

  guardarHabilidades(oferenteId, habilidades) {
    return apiClient.post(`/api/oferente/${oferenteId}/habilidades`, { habilidades });
  },

  subirCv(oferenteId, file) {
    const form = new FormData();
    form.append('file', file);
    return apiClient.postForm(`/api/oferente/${oferenteId}/cv`, form);
  }
};
