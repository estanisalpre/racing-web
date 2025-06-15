import { useEffect, useState } from "react";
import { API_ROUTES } from "@/config/apiRoutes";
import type { League } from "@/types/leagues";

export function useLeagues() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.ALL_LEAGUES}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLeagues(data.leagues || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { leagues, setLeagues, loading, error };
}
