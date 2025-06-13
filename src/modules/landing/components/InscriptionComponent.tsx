import LeagueComponent from "@/lib/components/LeagueComponent"
import { Link } from "react-router-dom";

export default function InscriptionComponent() {
  return (
    <section className="inscription-container">
      <article className="inscription-content">
        <h2>¡Elige tu próximo desafío!</h2>
        <p>
          Estas son las ligas disponibles en ESL. ¿Estás listo para correr?
        </p>

        <LeagueComponent/>

        <span className="support-span">
          ¿No encuentras lo que buscas?
          <Link to="/contact" className="support-link"> Contáctanos</Link>
        </span>
      </article>
    </section>
  )
}
