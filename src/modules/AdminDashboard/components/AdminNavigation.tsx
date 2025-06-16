interface AdminNavigationProps {
  openModal: (type: "leagues" | "events" | "tracks") => void;
}

export default function AdminNavigation({ openModal }: AdminNavigationProps) {
  return (
    <header className="admin-navigation">
      <button onClick={() => openModal("leagues")} className="btn">Ver Ligas</button>
      <button onClick={() => openModal("events")} className="btn">Ver Eventos</button>
      <button onClick={() => openModal("tracks")} className="btn">Ver Pistas</button>
    </header>
  );
}