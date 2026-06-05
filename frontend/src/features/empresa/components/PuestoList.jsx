import JobCard from '../../public/components/JobCard.jsx';
import CandidateList from './CandidateList.jsx';
import RequirementEditor from './RequirementEditor.jsx';

export default function PuestoList({ puestos = [], candidatos = {}, loadingCandidates = {}, features = [], editingId = null, onToggle, onBuscar, onEdit, onCancelEdit, onSavePuesto }) {
    return (
        <section className="puesto-list">
            {puestos.map(puesto => (
                <div key={puesto.id} className="job-wrap empresa-job">
                    <JobCard puesto={puesto} showStatus={true} actions={<>
                        <button className="btn" onClick={() => onBuscar(puesto.id)} disabled={loadingCandidates[puesto.id]}>
                            {loadingCandidates[puesto.id] ? 'Buscando...' : 'Buscar candidatos'}
                        </button>
                        <button className="btn" onClick={() => onEdit(puesto.id)}>Editar puesto</button>
                        <button className="btn danger" onClick={() => onToggle(puesto)}>{puesto.activo ? 'Desactivar' : 'Activar'}</button>
                    </>} />
                    {editingId === puesto.id && (
                        <RequirementEditor
                            features={features}
                            puesto={puesto}
                            onCancel={onCancelEdit}
                            onSave={(form) => onSavePuesto(puesto.id, form)}
                        />
                    )}
                    {candidatos[puesto.id] && <CandidateList candidatos={candidatos[puesto.id]} />}
                </div>
            ))}
        </section>
    );
}
