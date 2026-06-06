import { useState } from 'react';
import { money } from '../../../shared/utils/formatters.js';
import FeatureBadges from './FeatureBadges.jsx';
import JobDetailModal from './JobDetailModal.jsx';

export default function JobCard({ puesto, actions, showStatus = false }) {
    const [detailOpen, setDetailOpen] = useState(false);
    const requisitos = puesto.requisitos || [];

    return (
        <article className={`job-card ${puesto.activo === false ? 'disabled' : ''}`}>
            <div className="job-head">
                <p className="company">{puesto.empresa}</p>

                {showStatus && (
                    <div className="status-group">
                        <span className="status neutral-status">{puesto.tipoPublicacion}</span>
                        <span className={`status ${puesto.activo ? 'active-status' : 'inactive-status'}`}>
              {puesto.activo ? 'Activo' : 'Inactivo'}
            </span>
                    </div>
                )}
            </div>

            <h3>{puesto.descripcionGeneral}</h3>
            <p className="salary">{money(puesto.salario)}</p>

            {requisitos.length ? (
                <FeatureBadges requisitos={requisitos} />
            ) : (
                <p className="muted">Sin requisitos registrados</p>
            )}

            <div className="actions">
                <button className="btn" onClick={() => setDetailOpen(true)}>Ver detalle</button>
                {actions}
            </div>

            {detailOpen && (
                <JobDetailModal puesto={puesto} onClose={() => setDetailOpen(false)} />
            )}
        </article>
    );
}
