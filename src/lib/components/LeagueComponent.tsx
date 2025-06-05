import { cars } from "../../utils/Resources";

const leagues = [
  {
    name: "ESL League",
  },
];

export default function LeagueComponents() {
  return (
    <article className="league-card-container">
      <h2>LIGAS DISPONIBLES</h2>
      <div className="league-card">
        {leagues.map((league, index) => (
          <div
            key={index}
            className="league-card-content"
          >
            <img className="bg-card" src={cars.ff1600_1} alt="Card background"/>
            <h3>{league.name}</h3>
            <button>Inscribirme</button>
          </div>
        ))}
      </div>
    </article>
  );
}

