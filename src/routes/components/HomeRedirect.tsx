import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Roles } from "@/types/auth";

export default function HomeRedirect() {
  const { role, isLoading } = useAuth();

  console.log('Rol del usuario:', role);
  
  if (isLoading) return <div>Cargando...</div>;

  switch (role) {
    case Roles.superAdmin:
      return <Navigate to="/superadmin" replace />;
    case Roles.admin:
      return <Navigate to="/admin" replace />;
    case Roles.racer:
      return <Navigate to="/racer" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}