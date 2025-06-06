import '../../../styles/modules/landing/landing.css'

// Components
import HeroComponent from "../components/HeroComponent"
import ScheduleComponent from "../components/ScheduleComponent"
import InscriptionComponent from '../components/InscriptionComponent'
import RulesComponent from '../components/RulesComponent'
import QualifyComponent from '../components/QualifyComponent'
import ContactComponent from '../components/ContactComponent'

export default function LandingView() {
  return (
    <div className="landing-view-container">
        <HeroComponent/>
        <ScheduleComponent/>
        <InscriptionComponent/>
        <RulesComponent/>
        <QualifyComponent/>
        <ContactComponent/>
    </div>
    
  )
}
