import { logos, utils } from "../../../utils/Resources"
import LeagueComponent from "../../../lib/components/LeagueComponent"

export default function HeroComponent() {
  return (
    <section className="hero-section">
        <img src={utils.twoCars} alt="Two iRacing Cars competing" className="hero-bg-img" />
        <img src={logos.logo1} alt="ESL Logo - Elite Sim League" className="esl-logo"/>

        <article className="hero-content">
            <div className="title-hero-container">
              <h1 className="hero-title">The iRacing Experience</h1>
              <h2 className="hero-subtitle">Compite cada semana, demuestra tu talento y alcanza la gloria virtual.</h2>
            </div>
            <LeagueComponent/>
        </article>
    </section>
  )
}
