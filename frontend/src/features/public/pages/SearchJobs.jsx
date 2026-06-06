import { useEffect, useState } from 'react';
import Loading from '../../../shared/components/Loading.jsx';
import EmptyState from '../../../shared/components/EmptyState.jsx';
import JobCard from '../components/JobCard.jsx';
import FeatureFilter from '../components/FeatureFilter.jsx';
import { publicService } from '../services/publicService.js';

export default function SearchJobs() {
  const [features, setFeatures] = useState([]);
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([publicService.caracteristicas(), publicService.buscarPuestos()])
        .then(([featuresData, puestosData]) => {
          setFeatures(featuresData);
          setResults(puestosData);
        })
        .catch(err => setError(err.message || 'No fue posible cargar la búsqueda.'))
        .finally(() => setLoading(false));
  }, []);

  function toggle(id) {
    setSelected(prev =>
        prev.includes(id)
            ? prev.filter(x => x !== id)
            : [...prev, id]
    );
  }

  async function buscar() {
    setLoading(true);
    setError('');

    try {
      setResults(await publicService.buscarPuestos(selected));
    } catch (err) {
      setError(err.message || 'No fue posible buscar puestos.');
    } finally {
      setLoading(false);
    }
  }

  async function limpiar() {
    setSelected([]);
    setLoading(true);
    setError('');

    try {
      setResults(await publicService.buscarPuestos());
    } catch (err) {
      setError(err.message || 'No fue posible limpiar la búsqueda.');
    } finally {
      setLoading(false);
    }
  }

  return (
      <section className="search-page">
        <FeatureFilter
            features={features}
            selected={selected}
            onToggle={toggle}
            onSearch={buscar}
            onClear={limpiar}
        />

        <section className="results-panel">
          <div className="results-header">
            <div>
              <h2 className="section-title">Resultados</h2>
              <p className="muted">{results.length} puesto(s) público(s) encontrado(s).</p>
            </div>
          </div>

          {error && <div className="alert bad">{error}</div>}

          {loading ? (
              <Loading />
          ) : results.length ? (
              <div className="results-grid">
                {results.map(p => <JobCard key={p.id} puesto={p} />)}
              </div>
          ) : (
              <EmptyState
                  title="Sin resultados"
                  message="No hay puestos públicos que coincidan con las características seleccionadas."
              />
          )}
        </section>
      </section>
  );
}
