import { useState } from 'react';
import { leafFeatures } from '../../../shared/utils/formatters.js';
import LevelSelect from '../../../shared/components/LevelSelect.jsx';

export default function PuestoForm({ features = [], onSubmit }) {
    const [form, setForm] = useState({ descripcionGeneral: '', salario: '', tipoPublicacion: 'PUBLICO' });
    const [requisitos, setRequisitos] = useState([]);
    const hojas = leafFeatures(features);

    function change(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
    function addReq() { const first = hojas[0]; if (first) setRequisitos([...requisitos, { caracteristicaId: Number(first.id), nivel: 3 }]); }
    function updateReq(index, values) { setRequisitos(list => list.map((item, idx) => idx === index ? { ...item, ...values } : item)); }
    function removeReq(index) { setRequisitos(list => list.filter((_, idx) => idx !== index)); }

    async function submit(e) {
        e.preventDefault();
        const descripcionGeneral = form.descripcionGeneral.trim();
        const salario = Number(String(form.salario).replace(',', '.'));
        const requisitosValidos = requisitos.filter(r => r.caracteristicaId && r.nivel);
        if (!descripcionGeneral) {
            alert('Debe indicar la descripción general del puesto.');
            return;
        }
        if (!Number.isFinite(salario) || salario <= 0) {
            alert('Debe indicar un salario válido mayor a cero.');
            return;
        }
        if (!requisitosValidos.length) {
            alert('Debe agregar al menos un requisito al puesto.');
            return;
        }
        await onSubmit({ descripcionGeneral, salario, tipoPublicacion: form.tipoPublicacion, requisitos: requisitosValidos });
        setForm({ descripcionGeneral: '', salario: '', tipoPublicacion: 'PUBLICO' });
        setRequisitos([]);
    }

    return (
        <form onSubmit={submit} className="job-form">
            <div className="section-heading">
                <h2>Publicar puesto</h2>
                <p>Registra un puesto con salario, tipo de publicación y requisitos medibles.</p>
            </div>

            <label>Descripción general
                <textarea name="descripcionGeneral" value={form.descripcionGeneral} onChange={change} required placeholder="Ejemplo: Desarrollador Backend Java para APIs REST." />
            </label>

            <div className="form-grid-2">
                <label>Salario en colones
                    <input className="input" name="salario" type="text" inputMode="decimal" value={form.salario} onChange={change} required placeholder="Ejemplo: 850000" />
                </label>
                <label>Tipo publicación
                    <select name="tipoPublicacion" value={form.tipoPublicacion} onChange={change}>
                        <option value="PUBLICO">Público</option>
                        <option value="PRIVADO">Privado</option>
                    </select>
                </label>
            </div>

            <h3>Requisitos del puesto</h3>
            <div className="editor-list">
                {requisitos.map((r, i) => (
                    <div className="inline-form requirement-row" key={i}>
                        <select value={r.caracteristicaId} onChange={e => updateReq(i, { caracteristicaId: Number(e.target.value) })}>
                            {hojas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                        </select>
                        <LevelSelect value={r.nivel} onChange={nivel => updateReq(i, { nivel })} />
                        <button type="button" className="btn ghost" onClick={() => removeReq(i)}>Quitar</button>
                    </div>
                ))}
                {!requisitos.length && <p className="hint-box">Agrega al menos un requisito antes de publicar el puesto.</p>}
            </div>

            <div className="actions form-actions">
                <button type="button" className="btn ghost" onClick={addReq}>Agregar requisito</button>
                <button className="btn primary">Publicar puesto</button>
            </div>
        </form>
    );
}
