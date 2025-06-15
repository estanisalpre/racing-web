import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_ROUTES } from '@/config/apiRoutes';

export default function CreateEvent() {
  const [leagues, setLeagues] = useState<{ id: string; name: string }[]>([]);
  const [tracks, setTracks] = useState<{ id: string; name: string, corners: number, length_meters: number, image_base64: string }[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.ALL_LEAGUES}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
      .then(res => res.json())
      .then(data => setLeagues(data.leagues || []));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.ALL_TRACKS}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
      .then(res => res.json())
      .then(data => setTracks(data.tracks || []));
  }, []);

  const formik = useFormik({
    initialValues: {
      league_id: '',
      name: '',
      track_id: '',
      week_number: '',
      start_date: '',
    },
    validationSchema: Yup.object({
      league_id: Yup.string().required('Liga obligatoria'),
      name: Yup.string().required('Nombre del evento'),
      track_id: Yup.string().required('Pista obligatoria'),
      week_number: Yup.number().required('Número de semana'),
      start_date: Yup.date().required('Fecha de inicio'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.CREATE_EVENT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(values)
        });

        const data = await res.json();
        if (res.ok) {
          setStatus('✅ Evento creado correctamente');
          resetForm();
        } else {
          setStatus(`❌ ${data.message}`);
        }
      } catch (error) {
        console.error(error);
        setStatus('❌ Error al crear el evento');
      }
    }
  });

  return (
    <article className="create-event-form">
      <h2>CREAR NUEVO EVENTO</h2>

      <form onSubmit={formik.handleSubmit}>
        <select
          name="league_id"
          onChange={formik.handleChange}
          value={formik.values.league_id}
        >
          <option value="">Seleccionar liga</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
        {formik.touched.league_id && formik.errors.league_id && (
          <p className="error">{formik.errors.league_id}</p>
        )}

        <label>Nombre del evento:</label>
        <input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="error">{formik.errors.name}</p>
        )}

        <select
          name="track_id"
          onChange={formik.handleChange}
          value={formik.values.track_id}
        >
          <option value="">Seleccionar pista</option>
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.name}
            </option>
          ))}
        </select>
        {formik.touched.track_id && formik.errors.track_id && (
          <p className="error">{formik.errors.track_id}</p>
        )}

        <label>Semana del campeonato:</label>
        <input
          name="week_number"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.week_number}
        />
        {formik.touched.week_number && formik.errors.week_number && (
          <p className="error">{formik.errors.week_number}</p>
        )}

        <label>Fecha de inicio:</label>
        <input
          name="start_date"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.start_date}
        />
        {formik.touched.start_date && formik.errors.start_date && (
          <p className="error">{formik.errors.start_date}</p>
        )}

        <button type="submit">Crear evento</button>
      </form>

      {status && <p className="status">{status}</p>}
    </article>
  );
}
