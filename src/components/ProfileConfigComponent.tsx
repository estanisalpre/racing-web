import { Bolt, LogOut, Bell } from "lucide-react"
import { useAuth } from '@/context/AuthContext';
import { Link } from "react-router-dom";
import { icons } from "@/utils/Resources";

export default function ProfileConfigComponent() {
    const { user, logout } = useAuth();

    if (!user) return null;
    return (
        <div className="profile-config-container">
            <Link to="/home" className="home-button" >
                <img src={icons.raceFlag} alt="User avatar"/>
            </Link>
            
            <span className="user-name">
                Hola, {user.username}
            </span>

            <Bell size={30} className="notification-icon" />
            
            <Link to="/profile" className="config-button">
                <Bolt size={30} className="config-icon" />
            </Link>

            <button className="logout-button" onClick={logout}>
                <LogOut size={15} className="logout-icon"/>
                Salir
            </button>
        </div>
    )
}
