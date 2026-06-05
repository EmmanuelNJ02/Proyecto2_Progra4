import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext.jsx';

export default function ProtectedRoute({ rol, children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    if (rol && user.rol !== rol) return <Navigate to="/" replace />;
    return children;
}
