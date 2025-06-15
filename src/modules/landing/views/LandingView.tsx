import '../../../styles/modules/landing/landing.css'

// Components
import HeroComponent from "../components/HeroComponent"
import InscriptionComponent from '../components/InscriptionComponent'
import QualifyComponent from '../components/QualifyComponent'
import ContactComponent from '../components/ContactComponent'

export default function LandingView() {
  return (
    <div className="landing-view-container">
        <HeroComponent/>
        <InscriptionComponent/>
        <QualifyComponent/>
        <ContactComponent/>
    </div>
    
  )
}
