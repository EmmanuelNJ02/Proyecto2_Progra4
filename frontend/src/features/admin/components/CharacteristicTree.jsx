import { useState } from 'react';
import { childrenOf, parentFeatures } from '../../../shared/utils/formatters.js';

export default function CharacteristicTree({ features = [], onUpdate, onDelete }) {
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ nombreCaracteristica: '', caracteristicaPadreId: '' });

    function start(feature) {
        setEditing(feature.id);
        setForm({ nombreCaracteristica: feature.nombre, caracteristicaPadreId: feature.padreId ?? '' });
    }

    async function save(e) {
        e.preventDefault();
        const nombreCaracteristica = form.nombreCaracteristica.trim();
        if (!nombreCaracteristica) {
            alert('Debe indicar el nombre de la característica.');
            return;
        }
        await onUpdate(editing, {
            nombreCaracteristica,
            caracteristicaPadreId: form.caracteristicaPadreId ? Number(form.caracteristicaPadreId) : null
        });
        setEditing(null);
    }

    async function remove(feature) {
        const hijos = childrenOf(features, feature.id);
        const detalle = hijos.length
            ? `\n\nEsta característica tiene ${hijos.length} subcaracterística(s). Al eliminarla también se eliminarán sus subcaracterísticas y referencias asociadas.`
            : '';
        if (confirm(`¿Desea eliminar la característica "${feature.nombre}"?${detalle}`)) {
            await onDelete(feature.id);
            if (editing === feature.id) setEditing(null);
        }
    }

    function row(feature, isChild = false) {
        if (editing === feature.id) {
            return (
                <form className={`tree-edit ${isChild ? 'tree-child-edit' : ''}`} onSubmit={save}>
                    <input
                        className="input"
                        value={form.nombreCaracteristica}
                        onChange={e => setForm({ ...form, nombreCaracteristica: e.target.value })}
                        placeholder="Nombre de la característica"
                    />
                    <select
                        value={form.caracteristicaPadreId}
                        onChange={e => setForm({ ...form, caracteristicaPadreId: e.target.value })}
                    >
                        <option value="">Sin padre</option>
                        {features.filter(f => f.id !== feature.id).map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}
                    </select>
                    <button className="btn primary">Guardar</button>
                    <button type="button" className="btn ghost" onClick={() => setEditing(null)}>Cancelar</button>
                </form>
            );
        }

        return (
            <div className={isChild ? 'tree-child' : 'tree-parent'}>
                <span>{feature.nombre}</span>
                <div className="tree-actions">
                    <button type="button" className="btn ghost mini" onClick={() => start(feature)}>Editar</button>
                    <button type="button" className="btn danger mini" onClick={() => remove(feature)}>Eliminar</button>
                </div>
            </div>
        );
    }

    const padres = parentFeatures(features);

    return (
        <section className="admin-section">
            <div className="section-heading compact">
                <h2>Características existentes</h2>
                <p>Consulta, edita o elimina categorías y subcaracterísticas usadas en puestos y habilidades.</p>
            </div>

            {!padres.length && <p className="hint-box">No hay características registradas.</p>}

            {padres.map(parent => (
                <div key={parent.id} className="tree">
                    {row(parent)}
                    <div className="tree-children">
                        {childrenOf(features, parent.id).map(child => <div key={child.id}>{row(child, true)}</div>)}
                    </div>
                </div>
            ))}
        </section>
    );
}
