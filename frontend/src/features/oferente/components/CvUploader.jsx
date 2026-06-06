import { useState } from 'react';

export default function CvUploader({ onUpload }) {
  const [file, setFile] = useState(null);

  async function submit(e) {
    e.preventDefault();
    if (!file) {
      alert('Debe seleccionar un archivo PDF.');
      return;
    }
    await onUpload(file);
    setFile(null);
    e.currentTarget.reset();
  }

  return (
    <section className="cv-uploader">
      <div className="section-heading compact">
        <h2>Subir currículo PDF</h2>
        <p>El archivo queda guardado en el servidor y la ruta se conserva en la base de datos.</p>
      </div>
      <form onSubmit={submit} className="upload-form">
        <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="btn primary">Subir currículo</button>
      </form>
    </section>
  );
}
