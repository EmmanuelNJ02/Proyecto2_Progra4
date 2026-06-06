import Modal from '../../../shared/components/Modal.jsx';
import { money } from '../../../shared/utils/formatters.js';
import FeatureBadges from './FeatureBadges.jsx';

export default function JobDetailModal({ puesto, onClose }) {
    if (!puesto) return null;

    return (
        <Modal title={puesto.descripcionGeneral} onClose={onClose}>
            <p><b>Empresa:</b> {puesto.empresa}</p>
            <p><b>Salario:</b> {money(puesto.salario)}</p>
            <p><b>Tipo:</b> {puesto.tipoPublicacion}</p>

            <h3>Requisitos</h3>
            <FeatureBadges requisitos={puesto.requisitos || []} />
        </Modal>
    );
}
