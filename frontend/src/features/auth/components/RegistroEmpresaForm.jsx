import { useState } from 'react';
import Alert from '../../../shared/components/Alert.jsx';
import { authService } from '../services/authService.js';

export default function RegistroEmpresaForm() {
    const [form, setForm] = useState({ nombreEmpresa:'', localizacion:'', correoElectronico:'', telefono:'', descripcion:'', clave:'' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
    async function submit(e) { e.preventDefault(); setError(''); setMessage(''); try { const r = await authService.registrarEmpresa(form); setMessage(r.mensaje); } catch (err) { setError(err.message); } }

    return <section className="panel"><h2>Registro de empresa</h2><Alert>{message}</Alert><Alert type="bad">{error}</Alert><form className="split" onSubmit={submit}>
        <label>Nombre<input className="input" name="nombreEmpresa" value={form.nombreEmpresa} onChange={change}/></label>
        <label>Teléfono<input className="input" name="telefono" value={form.telefono} onChange={change}/></label>
        <label>Localización<input className="input" name="localizacion" value={form.localizacion} onChange={change}/></label>
        <label>Descripción<textarea name="descripcion" value={form.descripcion} onChange={change}/></label>
        <label>Correo<input className="input" name="correoElectronico" value={form.correoElectronico} onChange={change}/></label>
        <label>Clave<input className="input" name="clave" type="password" value={form.clave} onChange={change}/></label>
        <button className="btn primary">Registrarme como empresa</button>
    </form></section>;
}
