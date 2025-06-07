import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function HeaderComponent() {
    const { isAuthenticated } = useAuth();

    return (
      <nav>
          {/* NAV PUBLICO */}
          <Link className="header-link" to={"/"}>Inicio</Link>
          <Link className="header-link" to={"/"}>Calendario</Link>
          <Link className="header-link" to={"/"}>Inscripción</Link>
          <Link className="header-link" to={"/"}>Reglamento</Link>
          <Link className="header-link" to={"/"}>Clasificación</Link>
          <Link className="header-link" to={"/"}>Contacto</Link>

          {/* NAV PRIVADO */}
          {!isAuthenticated && (
            <Link to="/auth" className="header-link start-link">Comenzar</Link>
          )}
      </nav>
    )
}
