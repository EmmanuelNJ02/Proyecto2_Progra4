import { useEffect, useState } from 'react';
import { leafFeatures } from '../../../shared/utils/formatters.js';
import LevelSelect from '../../../shared/components/LevelSelect.jsx';

export default function RequirementEditor({ features = [], puesto, onSave, onCancel }) {
    const hojas = leafFeatures(features);
    const [form, setForm] = useState({ descripcionGeneral: '', salario: '', tipoPublicacion: 'PUBLICO', activo: true });
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!puesto) return;
        setForm({
            descripcionGeneral: puesto.descripcionGeneral || '',
            salario: puesto.salario ?? '',
            tipoPublicacion: puesto.tipoPublicacion || 'PUBLICO',
            activo: Boolean(puesto.activo)
        });
        setItems((puesto.requisitos || []).map(r => ({
            caracteristicaId: Number(r.caracteristicaId),
            nivel: Number(r.nivel || 3)
        })));
    }, [puesto]);

    function change(e) {
        const { name, value } = e.target;
        setForm(actual => ({ ...actual, [name]: value }));
    }

    function addReq() {
        const first = hojas[0];
        if (first) setItems(list => [...list, { caracteristicaId: Number(first.id), nivel: 3 }]);
    }

    function updateReq(index, values) {
        setItems(list => list.map((item, idx) => idx === index ? { ...item, ...values } : item));
    }

    function removeReq(index) { setItems(list => list.filter((_, idx) => idx !== index)); }

    async function save() {
        const descripcionGeneral = form.descripcionGeneral.trim();
        const salario = Number(String(form.salario).replace(',', '.'));
        const requisitos = items.filter(item => item.caracteristicaId).map(item => ({ caracteristicaId: Number(item.caracteristicaId), nivel: Number(item.nivel) }));
        if (!descripcionGeneral) { alert('Debe indicar la descripción general del puesto.'); return; }
        if (!Number.isFinite(salario) || salario <= 0) { alert('Debe indicar un salario válido mayor a cero.'); return; }
        if (!requisitos.length) { alert('Debe agregar al menos un requisito al puesto.'); return; }
        await onSave({ descripcionGeneral, salario, tipoPublicacion: form.tipoPublicacion, activo: form.activo, requisitos });
    }

    return (
        <section className="requirement-editor">
            <div className="section-heading compact">
                <h4>Editar puesto y requisitos</h4>
                <p>Modifica datos generales, estado, visibilidad y características solicitadas.</p>
            </div>

            <label>Descripción general
                <textarea name="descripcionGeneral" value={form.descripcionGeneral} onChange={change} />
            </label>

            <div className="form-grid-3">
                <label>Salario en colones
                    <input className="input" name="salario" type="text" inputMode="decimal" value={form.salario} onChange={change} />
                </label>
                <label>Tipo publicación
                    <select name="tipoPublicacion" value={form.tipoPublicacion} onChange={change}>
                        <option value="PUBLICO">Público</option>
                        <option value="PRIVADO">Privado</option>
                    </select>
                </label>
                <label>Estado
                    <select value={String(form.activo)} onChange={e => setForm(actual => ({ ...actual, activo: e.target.value === 'true' }))}>
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
                </label>
            </div>

            <h4>Requisitos</h4>
            <div className="editor-list">
                {items.map((item, index) => (
                    <div className="inline-form requirement-row" key={index}>
                        <select value={item.caracteristicaId} onChange={e => updateReq(index, { caracteristicaId: Number(e.target.value) })}>
                            {hojas.map(feature => <option key={feature.id} value={feature.id}>{feature.nombre}</option>)}
                        </select>
                        <LevelSelect value={item.nivel} onChange={nivel => updateReq(index, { nivel })} />
                        <button type="button" className="btn ghost" onClick={() => removeReq(index)}>Quitar</button>
                    </div>
                ))}
                {!items.length && <p className="hint-box">Este puesto aún no tiene requisitos registrados.</p>}
            </div>

            <div className="actions form-actions">
                <button type="button" className="btn ghost" onClick={addReq}>Agregar requisito</button>
                <button type="button" className="btn primary" onClick={save}>Guardar cambios</button>
                <button type="button" className="btn" onClick={onCancel}>Cancelar</button>
            </div>
        </section>
    );
}
