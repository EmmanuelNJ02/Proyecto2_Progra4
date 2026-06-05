import EmptyState from '../../../shared/components/EmptyState.jsx';

export default function PendingUsersPanel({ rol, pendientes = [], onApprove, onReject }) {
    return (
        <section className="admin-section">
            <div className="section-heading compact"><h2>Autorizaciones pendientes</h2><p>Listado actual: {rol}</p></div>
            {pendientes.length ? (
                <div className="table-wrap">
                    <table className="table">
                        <thead><tr><th>Nombre</th><th>Correo</th><th>Acciones</th></tr></thead>
                        <tbody>{pendientes.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>{p.correo}</td>
                                <td><div className="actions"><button className="btn primary" onClick={() => onApprove(p.id)}>Aprobar</button><button className="btn danger" onClick={() => onReject(p.id)}>Rechazar</button></div></td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            ) : <EmptyState title="Sin pendientes" message="No hay registros pendientes para este rol."/>}
        </section>
    );
}
