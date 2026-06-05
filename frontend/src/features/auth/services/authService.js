import { apiClient } from '../../../shared/api/apiClient.js';

export const authService = {
    login(usuario, clave) { return apiClient.post('/api/auth/login', { usuario, clave }); },
    registrarEmpresa(form) { return apiClient.post('/api/auth/registro/empresa', form); },
    registrarOferente(form) { return apiClient.post('/api/auth/registro/oferente', form); }
};
