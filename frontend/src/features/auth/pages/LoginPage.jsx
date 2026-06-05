import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { redirectByRole } from '../utils/jwtUtils.js';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    async function submit(usuario, clave) {
        const session = await login(usuario, clave);
        navigate(redirectByRole(session.rol));
    }

    return (
        <section className="hero">
            <LoginForm onSubmit={submit} />
            <div className="panel">
                <h2>Registro público</h2>
                <p>Empresas y oferentes quedan pendientes hasta aprobación administrativa.</p>
                <div className="actions">
                    <Link className="btn" to="/empresa">Registrar empresa</Link>
                    <Link className="btn" to="/oferente">Registrar oferente</Link>
                </div>
            </div>
        </section>
    );
}
