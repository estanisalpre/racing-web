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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}${API_ROUTES.RACER_STATS(
            Number(user.id)
          )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        );
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

  const { general, ranking } = stats;

  return (
    <div className="racer-stats-container">
      <h2 className="text-2xl font-bold mb-4">
        MIS ESTADÍSTICAS
      </h2>

      <div className='racer-points'>
        <span>{general.total_puntos}</span>
        pts.
      </div>

      <section className='racer-information'>
        <ul>
          <li>
            <strong>Temporadas participadas:</strong>{' '}
            {general.seasons_participated}
          </li>
          <li>
            <strong>Prácticas corridas:</strong> {general.practices_participated}
          </li>
          <li>
            <strong>Clasificaciones completadas:</strong>{' '}
            {general.qualifies_participated}
          </li>
          <li>
            <strong>Carreras corridas:</strong> {general.races_participated}
          </li>
          <li>
            <strong>Total de participaciones:</strong>{' '}
            {general.total_participaciones}
          </li>
          <li>
            <strong>Victorias:</strong> {general.victorias}
          </li>
          <li>
            <strong>Podios:</strong> {general.podiums}
          </li>
          <li>
            <strong>Poles:</strong> {general.poles}
          </li>
        </ul>
      </section>

      <section className='championship-information'>
        <h3>Campeonato</h3>
        <ul>
          <li>
            <strong>Mejor posición alcanzada:</strong>{' '}
            {ranking.best_championship_rank || 'N/A'}
          </li>
          <li>
            <strong>Ligas ganadas:</strong> {ranking.leagues_won || 'Ninguna'}
          </li>
        </ul>
      </section>
    </div>
  );
}