import { useEffect, useState } from 'react';
import { leafFeatures } from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/shared/utils/formatters.js';
import LevelSelect from '../../../../../../Proyecto2_BolsaEmpleo_Emmanuel_Dorian_Corregido/Proyecto2_BolsaEmpleo_Emmanuel_Dorian_FINAL_ESTABLE_DISENO_CORREGIDO/frontend/src/shared/components/LevelSelect.jsx';

export default function SkillEditor({ features = [], habilidadesActuales = [], onSave }) {
  const [items, setItems] = useState([]);
  const hojas = leafFeatures(features);

  useEffect(() => {
    setItems((habilidadesActuales || []).map(h => ({
      caracteristicaId: Number(h.caracteristicaId),
      nivel: Number(h.nivel || 3)
    })));
  }, [habilidadesActuales]);

  function addSkill() {
    const firstAvailable = hojas.find(f => !items.some(item => Number(item.caracteristicaId) === Number(f.id))) || hojas[0];
    if (firstAvailable) setItems(list => [...list, { caracteristicaId: Number(firstAvailable.id), nivel: 3 }]);
  }

  function updateSkill(i, values) {
    setItems(list => list.map((item, idx) => idx === i ? { ...item, ...values } : item));
  }

  function removeSkill(i) { setItems(list => list.filter((_, idx) => idx !== i)); }

  async function save() {
    const map = new Map();
    items.forEach(h => {
      if (h.caracteristicaId) map.set(Number(h.caracteristicaId), { caracteristicaId: Number(h.caracteristicaId), nivel: Number(h.nivel) });
    });
    await onSave([...map.values()]);
  }

  return (
    <section className="skill-editor">
      <div className="section-heading compact">
        <h3>Editar habilidades</h3>
        <p>Agrega, elimina o cambia el nivel de tus habilidades. Los niveles van de 1 a 5.</p>
      </div>

      <div className="editor-list">
        {items.map((d, i) => (
          <div className="inline-form skill-row" key={i}>
            <select value={d.caracteristicaId} onChange={e => updateSkill(i, { caracteristicaId: Number(e.target.value) })}>
              {hojas.map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}
            </select>
            <LevelSelect value={d.nivel} onChange={nivel => updateSkill(i, { nivel })} />
            <button type="button" className="btn ghost" onClick={() => removeSkill(i)}>Quitar</button>
          </div>
        ))}
        {!items.length && <p className="hint-box">Aún no tienes habilidades registradas. Agrega la primera habilidad para que las empresas puedan encontrarte.</p>}
      </div>

      <div className="actions form-actions">
        <button type="button" className="btn ghost" onClick={addSkill}>Agregar habilidad</button>
        <button type="button" className="btn primary" onClick={save}>Guardar habilidades</button>
      </div>
    </section>
  );
}
