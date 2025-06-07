import { useAuth } from '@/context/AuthContext';

export default function UserAsideComponent(){
  const { user } = useAuth();

  if (!user) return null; 

  return (
    <aside className="user-aside-container">
      <img src={(user as any).avatar} alt="User Avatar" className='user-avatar' />
    </aside>
  );
};