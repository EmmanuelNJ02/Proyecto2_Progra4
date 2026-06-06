import { cvUrl } from '../../../shared/utils/formatters.js';

export default function OferenteProfile({ perfil }) {
    if (!perfil) return null;

    return (
        <section className="profile-card">
            <h2>Perfil</h2>

            <p><b>Identificación:</b> {perfil.identificacion}</p>
            <p><b>Teléfono:</b> {perfil.telefono}</p>
            <p><b>Residencia:</b> {perfil.lugarResidencia}</p>

            <p>
                <b>Currículo:</b>{' '}
                {perfil.curriculum ? (
                    <a href={cvUrl(perfil.curriculum)} target="_blank" rel="noreferrer">
                        Ver PDF actual
                    </a>
                ) : (
                    'Sin currículo cargado'
                )}
            </p>

            <h3>Mis habilidades actuales</h3>

            <div className="badges">
                {(perfil.habilidades || []).map(h => (
                    <span key={h.caracteristicaId} className="badge">
            {h.nombre} ({h.nivel})
          </span>
                ))}
            </div>
        </section>
    );
}
