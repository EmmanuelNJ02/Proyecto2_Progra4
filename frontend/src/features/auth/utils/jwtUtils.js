export function hasRole(user, role) { return Boolean(user && user.rol === role); }
export function isAuthenticated(user) { return Boolean(user && user.token); }
export function redirectByRole(role) {
    if (role === 'ADMIN') return '/admin';
    if (role === 'EMPRESA') return '/empresa';
    if (role === 'OFERENTE') return '/oferente';
    return '/';
}
