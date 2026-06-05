import EmptyState from '../../../shared/components/EmptyState.jsx';
import CandidateCard from './CandidateCard.jsx';

export default function CandidateList({ candidatos = [] }) {
    if (!candidatos.length) {
        return (
            <div className="candidate-panel">
                <EmptyState title="Sin candidatos" message="No hay oferentes aprobados con coincidencia para este puesto." />
            </div>
        );
    }

    return (
        <div className="candidate-panel">
            <div className="candidate-panel-head">
                <h4>Candidatos encontrados</h4>
                <p className="muted">
                    Ordenados de mayor a menor coincidencia. El porcentaje compara cada requisito del puesto contra el nivel registrado por el oferente.
                </p>
            </div>
            <div className="candidate-list">
                {candidatos.map(c => <CandidateCard key={c.oferenteId || c.usuarioId} candidato={c} />)}
            </div>
        </div>
    );
}
