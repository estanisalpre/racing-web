import { useEffect, useState } from "react";
import type { Event } from "@/types/events";
import { API_ROUTES } from "@/config/apiRoutes";

export function useUserEvents() {
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.USER_EVENTS}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener eventos del usuario");

        const data = await res.json();
        setUserEvents(data.events || []);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { userEvents, loading, error };
}
