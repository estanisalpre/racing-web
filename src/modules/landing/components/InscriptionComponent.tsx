import LeagueComponent from "@/lib/components/LeagueComponent"

export default function InscriptionComponent() {
  return (
    <section className="inscription-container">
      <article className="inscription-content">
        <h2>¡Elige tu próximo desafío!</h2>
        <p>
          Estas son las ligas disponibles en ESL. ¿Estás listo para correr?
        </p>

        <LeagueComponent/>

      </article>
    </section>
  )
}
