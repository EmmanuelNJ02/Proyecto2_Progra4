import { useState } from 'react';

export default function CharacteristicForm({ features = [], onSubmit }) {
    const [form, setForm] = useState({ nombreCaracteristica: '', caracteristicaPadreId: '' });
    async function submit(e) { e.preventDefault(); await onSubmit({ nombreCaracteristica: form.nombreCaracteristica, caracteristicaPadreId: form.caracteristicaPadreId ? Number(form.caracteristicaPadreId) : null }); setForm({ nombreCaracteristica: '', caracteristicaPadreId: '' }); }
    return <form onSubmit={submit}><h2>Registrar característica</h2><label>Nombre<input className="input" value={form.nombreCaracteristica} onChange={e => setForm({ ...form, nombreCaracteristica: e.target.value })}/></label><label>Característica padre<select value={form.caracteristicaPadreId} onChange={e => setForm({ ...form, caracteristicaPadreId: e.target.value })}><option value="">Sin padre</option>{features.map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}</select></label><button className="btn primary">Guardar característica</button></form>;
}
