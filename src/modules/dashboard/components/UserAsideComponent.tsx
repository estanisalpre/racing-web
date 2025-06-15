import { useAuth } from '@/context/AuthContext';

// components
import AvatarComponent from './custom/AvatarComponent';
import IracingInput from '@/modules/dashboard/components/custom/IracingInput';
import RacerStatsComponent from './custom/RacerStatsComponent';


export default function UserAsideComponent() {
  const { user } = useAuth(); 

  if (!user) return null;

  return (
    <aside className="user-aside-container">
      <AvatarComponent/>
      <IracingInput/>
      <RacerStatsComponent/>
    </aside>
  );
}