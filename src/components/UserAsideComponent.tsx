import { useAuth } from '@/context/AuthContext';

export default function UserAsideComponent(){
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <aside className="user-aside">
      <div className="user-header">
        <strong>¡Hola, {user.username}!</strong>
      </div>
      <ul className="user-menu">
        <li><a href="/perfil">Mi Perfil</a></li>
        <li><button onClick={logout}>Cerrar Sesión</button></li>
      </ul>
    </aside>
  );
};