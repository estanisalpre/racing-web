import { useState, useEffect } from 'react';
import { API_ROUTES } from '@/config/apiRoutes';
import { Upload } from 'lucide-react';
import type { Event } from '@/types/events';

export default function UploadRacingSummary() {
  const [file, setFile] = useState<File | null>(null);
  const [sessionType, setSessionType] = useState('practice'); 
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState<Event[]>([]);  
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.ALL_EVENTS}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
      .then(res => res.json())
      .then(data => setEvents(data.events || []));
  }, []);

  const handleUpload = async () => {
    if (!file || !sessionType || !eventId) return alert('Completa todos los campos');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('eventId', eventId);
    formData.append('sessionType', sessionType);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.UPLOAD_RESULTS}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: formData
      });

      const data = await res.json();
      setStatus(data.message || 'Subido con éxito');
    } catch (error) {
      console.error(error);
      setStatus('Error al subir el archivo');
    }
  };

  return (
    <article className='upload-racing-container'>
      <h2>SUBIR NUEVOS RESULTADOS</h2>

      <label>Tipo de sesión:</label>
      <select value={sessionType} onChange={(e) => setSessionType(e.target.value)}>
        <option value="practice">Práctica (viernes)</option>
        <option value="qualify">Clasificación (sábado)</option>
        <option value="race">Carrera (domingo)</option>
      </select>

      <label>Evento:</label>
      <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
        <option value="">Seleccionar fecha</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>

        <label htmlFor="file-upload" className="custom-file-upload">
            <Upload size={20} /> 
            Seleccionar archivo
        </label>

      <input type="file" id='file-upload' accept=".json" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />

      <button onClick={handleUpload}>Subir</button>

      {status && <p className='status'>{status}</p>}
    </article>
  );
}
