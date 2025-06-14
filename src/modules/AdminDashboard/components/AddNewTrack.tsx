import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_ROUTES } from '@/config/apiRoutes';

export default function AddNewTrack() {
  const [status, setStatus] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      corners: 0,
      length_meters: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Nombre de la pista'),
      corners: Yup.number().required('Cantidad de curvas'),
      length_meters: Yup.number().required('Longitud en metros'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.CREATE_TRACK}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(values)
        });

        const data = await res.json();
        if (res.ok) {
          setStatus('✅ Pista creada correctamente');
          resetForm();
        } else {
          setStatus(`❌ ${data.message}`);
        }
      } catch (error) {
        console.error(error);
        setStatus('❌ Error al crear la pista.');
      }
    }
  });

  return (
    <article className="create-event-form">
      <h2>AGREGAR NUEVA PISTA</h2>

      <form onSubmit={formik.handleSubmit}>
        <label>Nombre del circuito:</label>
        <input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="error">{formik.errors.name}</p>
        )}

        <label>Cantidad de curvas:</label>
        <input
          name="corners"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.corners}
        />
        {formik.touched.corners && formik.errors.corners && (
          <p className="error">{formik.errors.corners}</p>
        )}

        <label>Longitud (en mts):</label>
        <input
          name="length_meters"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.length_meters}
        />
        {formik.touched.length_meters && formik.errors.length_meters && (
          <p className="error">{formik.errors.length_meters}</p>
        )}

        <button type="submit">Cargar pista</button>
      </form>

      {status && <p className="status">{status}</p>}
    </article>
  );
}

