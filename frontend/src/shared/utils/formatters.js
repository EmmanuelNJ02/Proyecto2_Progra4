export function money(value) { return '₡ ' + Number(value || 0).toLocaleString('es-CR'); }
export function percent(value) { return `${Number(value || 0)}%`; }
export function cvUrl(path) {
  if (!path) return '';
  const fileName = String(path).split('/').pop();
  return '/uploads/cv/' + encodeURIComponent(fileName);
}
export function parentFeatures(features = []) { return features.filter(c => c.padreId === null || c.padreId === undefined); }
export function leafFeatures(features = []) { return features.filter(c => c.padreId !== null && c.padreId !== undefined); }
export function childrenOf(features = [], parentId) { return features.filter(c => Number(c.padreId) === Number(parentId)); }
export function featureName(features = [], id) { return features.find(c => Number(c.id) === Number(id))?.nombre || `Característica ${id}`; }
export function normalizeNumber(value, fallback = 0) { const n = Number(value); return Number.isNaN(n) ? fallback : n; }
