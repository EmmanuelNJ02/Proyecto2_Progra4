import { childrenOf, parentFeatures } from '../../../shared/utils/formatters.js';

export default function FeatureFilter({ features = [], selected = [], onToggle, onSearch, onClear }) {
    const parents = parentFeatures(features);

    return (
        <aside className="panel filter-panel">
            <div className="filter-header">
                <h2>Buscar puestos</h2>
                <p className="muted">
                    Selecciona una o varias características para filtrar únicamente puestos públicos activos.
                </p>
            </div>

            <div className="feature-groups">
                {parents.map(parent => (
                    <section key={parent.id} className="feature-group">
                        <div className="feature-group-title">{parent.nombre}</div>

                        <div className="feature-items">
                            {childrenOf(features, parent.id).map(feature => (
                                <label key={feature.id} className="check-row">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(feature.id)}
                                        onChange={() => onToggle(feature.id)}
                                    />
                                    <span>{feature.nombre}</span>
                                </label>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <div className="filter-actions">
                <button className="btn primary" onClick={onSearch}>Buscar</button>
                <button className="btn ghost" onClick={onClear}>Limpiar</button>
            </div>
        </aside>
    );
}
