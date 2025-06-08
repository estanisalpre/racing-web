import { useAuth } from '@/context/AuthContext';

export default function AvatarComponent() {
  const { user } = useAuth(); 

  if (!user) return null;

  return (
    <div className="user-info-container">
      <span></span>
      
    </div>
  );
}