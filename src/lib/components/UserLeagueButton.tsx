import { useEffect, useState } from "react";
import type { League } from "@/types/leagues";
import { API_ROUTES } from "@/config/apiRoutes";

interface Props {
  userId: string;
  league: League;
  onInscriptionSuccess?: () => void;
}

export function UserLeagueButton({ userId, league, onInscriptionSuccess }: Props) {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}${API_ROUTES.CHECK_INSCRIPTION}?user_id=${userId}&league_id=${league.id}`
    )
      .then((res) => res.json())
      .then((data) => setIsRegistered(data.isRegistered))
      .catch((err) => {
        console.error("Error al verificar inscripción", err);
      });
  }, [userId, league.id]);

  const handleInscription = () => {
    if (isRegistered) return;

    fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.JOIN_LEAGUE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ user_id: userId, league_id: league.id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Sin cupos");
        setIsRegistered(true);
        onInscriptionSuccess?.(); 
      })
      .catch((err) => {
        alert(
          err.message === "Sin cupos"
            ? "No hay más cupos disponibles."
            : "Error al inscribirse"
        );
      });
  };

  if (new Date(league.start_date) < new Date()) return <button disabled>Ya ha comenzado</button>;

  return isRegistered ? (
    <button disabled>Ya estás inscripto</button>
  ) : (
    <button onClick={handleInscription} disabled={isRegistered}>Inscribirme</button>
  );
}