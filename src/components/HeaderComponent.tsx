import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProfileConfigComponent from "./ProfileConfigComponent";
import { House } from "lucide-react";
import SoundEffects from "./sounds/SoundEffects";

export default function HeaderComponent() {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'nav scrolled' : 'nav'}>
      <div className="left-header">
        {/* NAV PUBLICO */}
        <Link className="header-link-home" to="/">
          <House size={30} />
        </Link>
        
        <Link className="header-link" to="/schedule">Calendario</Link>
        <Link className="header-link" to="/inscription">Inscripción</Link>
        <Link className="header-link" to="/">Reglamento</Link>
        <Link className="header-link" to="/">Clasificación</Link>
        <Link className="header-link" to="/">Contacto</Link>

        {/* NAV PRIVADO */}
        {!isAuthenticated && (
          <Link to="/auth" className="header-link start-link">INGRESAR</Link>
        )}

        {/* PROFILE & CONFIG */}
        {isAuthenticated && <ProfileConfigComponent />}
      </div>

      <div className="right-header">
        {/* EFECTO DE SONIDO */}
        <SoundEffects />
      </div>
    </nav>
  );
}