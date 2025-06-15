import { useEffect, useState } from "react";
import { useUserEvents } from "@/hooks/useUserEvents";
import type { Event } from "@/types/events";
import { useNavigate } from "react-router-dom";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function NextEventCountdown() {
  const { userEvents, loading, error } = useUserEvents();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  const calculateTimeLeft = (date: string): TimeLeft => {
    const target = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    if (!userEvents.length) return;

    const upcomingEvents = userEvents.filter(event =>
      new Date(event.start_date).getTime() > Date.now()
    );

    upcomingEvents.sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    if (upcomingEvents.length > 0) {
      setNextEvent(upcomingEvents[0] as Event | null);
    }
  }, [userEvents]);

  useEffect(() => {
    if (!nextEvent) return;

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(nextEvent.start_date));
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <header className="next-event-countdown">
      {nextEvent ? (
        <>
          <h2>Próximo evento:</h2>
          <p>{nextEvent.name}</p>
          <p>{new Date(nextEvent.start_date).toLocaleString()}</p>
          {timeLeft && (
            <div className="countdown">
              <span>{timeLeft.days}d</span> :
              <span>{timeLeft.hours}h</span> :
              <span>{timeLeft.minutes}m</span> :
              <span>{timeLeft.seconds}s</span>
            </div>
          )}
        </>
      ) : (
        <div className="no-events">
          <p>Aún no estás inscripto a ningún evento.</p>
          <button onClick={() => navigate("/inscription")}>Inscribirme</button>
        </div>
      )}
    </header>
  );
}