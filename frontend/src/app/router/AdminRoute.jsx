import ProtectedRoute from './ProtectedRoute.jsx';
export default function AdminRoute({ children }) { return <ProtectedRoute rol="ADMIN">{children}</ProtectedRoute>; }
