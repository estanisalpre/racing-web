import { Calendar } from "lucide-react";

const dates = [
  {
    week: "Semana 1",
    date: "27 Jul. 2025",
    category: "FF1600",
    currentPositions: "10",
    totalPositions: "20",
    league: "ESL: The Elite Championship",
    price: "Gratis",
  },
];

export default function ScheduleCardComponent() {
  return (
      <article className="schedule-card-container">
        {dates.map((date, index) => (
          <div
            key={index}
            className="schedule-card-content"
          >
            <div className="schedule-card-date">
                <Calendar className="calendar-icon"/>
                <span>{date.date}</span>
            </div>

            <div>
                <h3>{date.league}</h3>
                <div>
                    <span>{date.category}</span>
                    
                </div>
                <div>
                    <span>{date.currentPositions}/{date.totalPositions}</span>
                </div>
            </div>
            <button>Quiero inscribirme</button>
          </div>
        ))}
      </article>
  );
}