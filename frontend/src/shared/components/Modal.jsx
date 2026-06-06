import { createPortal } from 'react-dom';

export default function Modal({ title, children, onClose }) {
  const content = (
    <div className="modal-back" onMouseDown={onClose}>
      <article className="modal" role="dialog" aria-modal="true" onMouseDown={e => e.stopPropagation()}>
        <button className="close" type="button" onClick={onClose} aria-label="Cerrar">×</button>
        {title && <h2>{title}</h2>}
        <div className="modal-body">{children}</div>
      </article>
    </div>
  );
  return createPortal(content, document.body);
}
