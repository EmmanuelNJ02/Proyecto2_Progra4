import { useState } from 'react';
import Alert from '../../../shared/components/Alert.jsx';
import { authService } from '../services/authService.js';

export default function RegistroOferenteForm() {
    const [form, setForm] = useState({ identificacion:'', nombreOferente:'', primerApellido:'', segundoApellido:'', nacionalidad:'', telefono:'', correoElectronico:'', lugarResidencia:'', clave:'' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
    async function submit(e) { e.preventDefault(); setError(''); setMessage(''); try { const r = await authService.registrarOferente(form); setMessage(r.mensaje); } catch (err) { setError(err.message); } }

    return <section className="panel"><h2>Registro de oferente</h2><Alert>{message}</Alert><Alert type="bad">{error}</Alert><form className="split" onSubmit={submit}>
        <label>Identificación<input className="input" name="identificacion" value={form.identificacion} onChange={change}/></label>
        <label>Teléfono<input className="input" name="telefono" value={form.telefono} onChange={change}/></label>
        <label>Nombre<input className="input" name="nombreOferente" value={form.nombreOferente} onChange={change}/></label>
        <label>Primer apellido<input className="input" name="primerApellido" value={form.primerApellido} onChange={change}/></label>
        <label>Segundo apellido<input className="input" name="segundoApellido" value={form.segundoApellido} onChange={change}/></label>
        <label>Nacionalidad<input className="input" name="nacionalidad" value={form.nacionalidad} onChange={change}/></label>
        <label>Correo<input className="input" name="correoElectronico" value={form.correoElectronico} onChange={change}/></label>
        <label>Lugar de residencia<input className="input" name="lugarResidencia" value={form.lugarResidencia} onChange={change}/></label>
        <label>Clave<input className="input" name="clave" type="password" value={form.clave} onChange={change}/></label>
        <button className="btn primary">Registrarme como oferente</button>
    </form></section>;
}
