import { useState } from 'react';
import Alert from '../../../shared/components/Alert.jsx';

export default function LoginForm({ onSubmit }) {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');

    async function submit(e) {
        e.preventDefault();
        setError('');
        try { await onSubmit(usuario, clave); }
        catch (err) { setError(err.message); }
    }

    return (
        <form className="panel auth-form" onSubmit={submit}>
            <h2>Ingresar</h2>
            <Alert type="bad">{error}</Alert>
            <label>Correo electrónico</label>
            <input className="input" value={usuario} onChange={e => setUsuario(e.target.value)} placeholder="admin@bolsaempleo.com" />
            <label>Clave</label>
            <input className="input" type="password" value={clave} onChange={e => setClave(e.target.value)} placeholder="admin123" />
            <button className="btn primary">Ingresar</button>
        </form>
    );
}
