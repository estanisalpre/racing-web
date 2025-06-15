import { useLeagues } from "@/hooks/useLeagues";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isBefore } from "date-fns";
import { UserLeagueButton } from "./UserLeagueButton";
import type { League } from "@/types/leagues";
import type { Event as ApiEvent } from "@/types/events";

type EventWithWeek = ApiEvent & { week_number: number };

type WeekGroup = {
  week: number;
  events: EventWithWeek[];
};

export default function ScheduleCardComponent() {
  const { leagues, loading, setLeagues } = useLeagues();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Cargando calendario...</p>;

  return (
    <div className="schedule-card-container">
      <h2 className="schedule-title">CALENDARIO</h2>
      <p>Aquí puedes ver el calendario de las ligas con sus eventos respectivos.</p>
      {leagues.map((league: League) => {
        const leagueStarted = isBefore(new Date(league.start_date), new Date());

        const weeksMap: Record<number, EventWithWeek[]> = {};
        league.events.forEach((evt) => {
          const week = (evt as any).week_number ?? 0;
          if (!weeksMap[week]) weeksMap[week] = [];
          weeksMap[week].push(evt as EventWithWeek);
        });
        const weekGroups: WeekGroup[] = Object.entries(weeksMap)
          .map(([wk, evts]) => ({ week: +wk, events: evts }))
          .sort((a, b) => a.week - b.week);

        return (
          <section className="league-content">
            <div key={league.id} className="league-section">
              <div className="league-header">
                <h2 className="league-title">{league.name}</h2>

                {!user ? (
                  leagueStarted ? (
                    <button className="btn-disabled" disabled>Ya ha comenzado</button>
                  ) : (
                    <button className="btn-action" onClick={() => navigate('/auth')}>Quiero inscribirme</button>
                  )
                ) : (
                  <UserLeagueButton
                    userId={user.id}
                    league={league}
                    onInscriptionSuccess={() => {
                      setLeagues((prev) =>
                        prev.map((l) =>
                          l.id === league.id
                            ? { ...l, current_participants: l.current_participants + 1 }
                            : l
                        )
                      );
                    }}
                  />
                )}
              </div>

              {weekGroups.map((wg) => (
                <div key={wg.week} className="week-block">
                  <h3 className="week-title">Semana {wg.week}</h3>
                  <ul className="event-list">
                    {wg.events.map((evt) => {
                      const evtDate = new Date(evt.start_date);
                      const past = isBefore(evtDate, new Date());
                      return (
                        <li key={evt.id} className={`event-item ${past ? 'past' : ''}`}>
                          <span className="session-name">{evt.name}</span>
                          <span className="session-time">{evtDate.toLocaleString()}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}