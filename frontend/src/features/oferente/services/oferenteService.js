import { apiClient } from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/shared/api/apiClient.js';

export const oferenteService = {
  perfil(oferenteId) { return apiClient.get(`/api/oferente/${oferenteId}/perfil`); },
  guardarHabilidades(oferenteId, habilidades) { return apiClient.post(`/api/oferente/${oferenteId}/habilidades`, { habilidades }); },
  subirCv(oferenteId, file) { const form = new FormData(); form.append('file', file); return apiClient.postForm(`/api/oferente/${oferenteId}/cv`, form); }
};
