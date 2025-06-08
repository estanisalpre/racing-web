import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Pencil, Check } from 'lucide-react';
import { API_ROUTES } from '@/config/apiRoutes';

export default function IracingInput() {
  const { user, updateUser } = useAuth(); 
  const [editing, setEditing] = useState(false);
  const [iracingId, setIracingId] = useState(user?.iracing_id || '');
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    if (!iracingId || isNaN(Number(iracingId))) {
      alert('Ingrese un ID válido');
      return;
    }

    try {
      setLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.IRACING_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ iracing_cust_id: Number(iracingId) }),
      });

      const updatedUser = { ...user, iracing_id: Number(iracingId) };
      updateUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser)); 
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el ID');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="iracing-id-container">
        {editing ? (
          <>
            <input
              type="number"
              value={iracingId}
              onChange={(e) => setIracingId(e.target.value)}
              disabled={loading}
            />
            <Check
              size={18}
              style={{ cursor: 'pointer', color: 'green' }}
              onClick={handleSave}
            />
          </>
        ) : (
          <>
            <span className="iracing-id-label">
              {user.iracing_id ? `iRacing ID: ${user.iracing_id}` : 'Ingresar iRacing ID'}
            </span>
            <Pencil
              size={20}
              style={{ cursor: 'pointer', color: '#007bff' }}
              onClick={() => setEditing(true)}
            />
          </>
        )}
      </div>
  );
}