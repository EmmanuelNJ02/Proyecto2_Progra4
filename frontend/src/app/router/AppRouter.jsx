import { Navigate, Route, Routes } from 'react-router-dom';
import PublicHome from '../../features/public/pages/PublicHome.jsx';
import SearchJobs from '../../features/public/pages/SearchJobs.jsx';
import LoginPage from '../../features/auth/pages/LoginPage.jsx';
import EmpresaDashboard from '../../features/empresa/pages/EmpresaDashboard.jsx';
import OferenteDashboard from '../../features/oferente/pages/OferenteDashboard.jsx';
import AdminDashboard from '../../features/admin/pages/AdminDashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminRoute from './AdminRoute.jsx';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<PublicHome />} />
            <Route path="/buscar" element={<SearchJobs />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/empresa" element={<EmpresaDashboard />} />
            <Route path="/oferente" element={<OferenteDashboard />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/empresa/dashboard" element={<ProtectedRoute rol="EMPRESA"><EmpresaDashboard /></ProtectedRoute>} />
            <Route path="/oferente/dashboard" element={<ProtectedRoute rol="OFERENTE"><OferenteDashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
