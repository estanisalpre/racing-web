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

  const { general, ranking, ligas } = stats;

  return (
    <div className="racer-stats p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Estadísticas de {user.username}
      </h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Resumen General</h3>
        <ul className="list-disc list-inside">
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
            <strong>Total de puntos:</strong> {general.total_puntos}
          </li>
          <li>
            <strong>Victorias en carreras:</strong> {general.victorias}
          </li>
          <li>
            <strong>Podios (1°–3°):</strong> {general.podiums}
          </li>
          <li>
            <strong>Poles en clasificación:</strong> {general.poles}
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Ranking de Campeonato</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Mejor posición alcanzada:</strong>{' '}
            {ranking.best_championship_rank || 'N/A'}
          </li>
          <li>
            <strong>Ligas ganadas:</strong> {ranking.leagues_won || 'Ninguna'}
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Participaciones por Liga</h3>
        <ul className="list-disc list-inside">
          {ligas.length ? (
            ligas.map((liga: any) => (
              <li key={liga.id}>
                <strong>{liga.name}</strong>: {liga.participaciones} participaciones
              </li>
            ))
          ) : (
            <li>No ha participado en ninguna liga aún.</li>
          )}
        </ul>
      </section>
    </div>
  );
}