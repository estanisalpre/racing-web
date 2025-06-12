import { useLeagues } from "@/hooks/useLeagues";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isBefore } from "date-fns";
import { UserLeagueButton } from "./UserLeagueButton";

export default function LeagueComponent() {
  const { leagues, setLeagues, loading } = useLeagues();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Cargando ligas...</p>;

  return (
    <div className="league-card-container">
      {leagues.map((league) => {
        const leagueStarted = isBefore(new Date(league.start_date), new Date());

        return (
          <div key={league.id} className="league-card">
            <img src={league.background_image} className="bg-card" alt={`Fondo de ${league.name}`} />
            <h3>{league.name}</h3>
            <p>{league.description}</p>

            {league.current_participants >= 10 && (
              <p>
                {league.current_participants}/{league.max_participants} cupos
              </p>
            )}

            {league.events.length > 0 && (
              <ul>
                {league.events.map((event) => (
                  <li key={event.id}>
                    {event.name} - {new Date(event.start_date).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}

            {!user ? (
              leagueStarted ? (
                <button disabled>Ya ha comenzado</button>
              ) : (
                <button onClick={() => navigate("/auth")}>Quiero inscribirme</button>
              )
            ) : (
              <UserLeagueButton
                userId={user.id}
                league={league}
                onInscriptionSuccess={() => {
                  setLeagues((prevLeagues) =>
                    prevLeagues.map((l) =>
                      l.id === league.id
                        ? { ...l, current_participants: l.current_participants + 1 }
                        : l
                    )
                  );
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}