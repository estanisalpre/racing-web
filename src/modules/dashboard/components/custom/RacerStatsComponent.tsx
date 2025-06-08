import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { API_ROUTES } from '@/config/apiRoutes';

export default function RacerStatsComponent() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.RACER_STATS(Number(user.id))}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error al obtener stats del usuario:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (!user) return null;
  if (loading) return <p>Cargando estadísticas...</p>;
  if (!stats) return <p>No se encontraron estadísticas.</p>;

  return (
    <div className="racer-stats">
      <h2>Estadísticas de {user.username}</h2>
      <ul>
        <li><strong>Participaciones totales:</strong> {stats.general.total_participaciones}</li>
        <li><strong>Total de puntos:</strong> {stats.general.total_puntos}</li>
        <li><strong>Victorias en carreras:</strong> {stats.general.victorias}</li>
      </ul>

      <h3>Participaciones por liga:</h3>
      <ul>
        {stats.ligas.map((liga: any) => (
          <li key={liga.id}>
            {liga.name} – {liga.participaciones} participaciones
          </li>
        ))}
      </ul>
    </div>
  );
}

