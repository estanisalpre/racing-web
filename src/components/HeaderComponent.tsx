import { Link } from "react-router-dom"

export default function HeaderComponent() {
  return (
    <nav>
        <Link className="header-link" to={"/"}>Inicio</Link>
        <Link className="header-link" to={"/"}>Calendario</Link>
        <Link className="header-link" to={"/"}>Inscripción</Link>
        <Link className="header-link" to={"/"}>Reglamento</Link>
        <Link className="header-link" to={"/"}>Clasificación</Link>
        <Link className="header-link" to={"/"}>Contacto</Link>
        <Link className="header-link start-link" to={"/"}>COMENZAR</Link>
    </nav>
  )
}
