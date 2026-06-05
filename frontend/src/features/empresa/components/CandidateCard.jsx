import { cvUrl, percent } from '../../../shared/utils/formatters.js';

export default function CandidateCard({ candidato }) {
    const cv = cvUrl(candidato.curriculum);
    return (
        <article className="candidate-card">
            <div className="candidate-main">
                <h5>{candidato.nombre} {candidato.primerApellido}</h5>
                <p className="muted">{candidato.telefono} · {candidato.lugarResidencia}</p>
            </div>
            <div className="match-box"><b>{percent(candidato.coincidencia)}</b><span>coincidencia</span></div>
            <div className="candidate-skills">{(candidato.habilidades || []).map(h => <span className="badge" key={h.caracteristicaId}>{h.nombre} ({h.nivel})</span>)}</div>
            <div className="candidate-cv">{cv ? <a className="btn" href={cv} target="_blank" rel="noreferrer">Ver CV</a> : <span className="muted">Sin CV</span>}</div>
        </article>
    );
}
