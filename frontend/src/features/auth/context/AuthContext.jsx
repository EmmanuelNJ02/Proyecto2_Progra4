import { createContext, useContext, useMemo, useState } from 'react';
import { authService } from '../services/authService.js';
import { clearSession, getStoredUser, storeSession } from '../utils/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getStoredUser());

    async function login(usuario, clave) {
        const session = await authService.login(usuario, clave);
        storeSession(session);
        setUser(session);
        return session;
    }

    function logout() {
        clearSession();
        setUser(null);
    }

    const value = useMemo(() => ({ user, login, logout, isLogged: Boolean(user) }), [user]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
