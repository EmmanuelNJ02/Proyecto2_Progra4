export default function LevelSelect({ value, onChange, className = '' }) {
  return (
    <select className={className || 'input small'} value={value} onChange={e => onChange(Number(e.target.value))}>
      <option value={1}>1 - Básico</option>
      <option value={2}>2 - Principiante</option>
      <option value={3}>3 - Intermedio</option>
      <option value={4}>4 - Avanzado</option>
      <option value={5}>5 - Experto</option>
    </select>
  );
}
