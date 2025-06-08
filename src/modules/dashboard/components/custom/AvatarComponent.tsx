import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { API_ROUTES } from '@/config/apiRoutes';

export default function AvatarComponent() {
  const { user, updateUser } = useAuth(); 
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  if (!user) return null;

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tamaño < 2MB (opcional)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe pesar menos de 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result;

      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.AVATAR_URL}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify({ avatar_base64: base64data }),
        });

        if (!res.ok) throw new Error('Error subiendo avatar');

        const data = await res.json();
        
        const updatedUser = { ...user, avatar: data.avatar_url };
        updateUser(updatedUser)
        localStorage.setItem('user_data', JSON.stringify(updatedUser)); 
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="user-avatar-container">
      <img
        src={user.avatar}
        alt="User Avatar"
        className="user-avatar"
        style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
        onClick={() => !loading && fileInputRef.current.click()}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={loading}
      />
    </div>
  );
}