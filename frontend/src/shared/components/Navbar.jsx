import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext.jsx';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function salir() {
        logout();
        navigate('/');
    }

    return (
        <header className="topbar">
            <Link className="brand" to="/">
                <div className="logo">BE</div>
                <div>
                    <h1>BolsaEmpleo</h1>
                    <p>
                        Proyecto II · Programación IV
                        {user ? ` · ${user.nombre} (${user.rol})` : ''}
                    </p>
                </div>
            </Link>

            <nav className="nav">
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/buscar">Buscar puestos</NavLink>
                <NavLink to="/empresa">Empresa</NavLink>
                <NavLink to="/oferente">Oferente</NavLink>
                {user?.rol === 'ADMIN' && <NavLink to="/admin">Admin</NavLink>}
                {user ? (
                    <button onClick={salir}>Salir</button>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </nav>
        </header>
    );
}
