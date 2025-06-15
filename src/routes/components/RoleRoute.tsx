import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Roles } from "@/types/auth";

export default function RoleRoute({ allowedRoles }: { allowedRoles: Roles[] }) {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  if (!allowedRoles.includes(role!)) return <Navigate to="/" replace />;

  return <Outlet />;
}