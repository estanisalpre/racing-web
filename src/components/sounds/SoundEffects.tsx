import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Volume2, VolumeOff } from "lucide-react";
import { audios } from "@/utils/Resources";

export default function SoundEffects() {
  const location = useLocation();
  const [muted, setMuted] = useState(false);
  const [audio] = useState(() => new Audio(audios.f1CarPassing));

  // Play sound on route change
  useEffect(() => {
    if (!muted) {
      audio.volume = 0.1;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, [location, muted, audio]);

  // Cleanup on unmount
  useEffect(() => {
    audio.loop = false;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      audio.muted = next;
      return next;
    });
  };

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? "Activar sonido" : "Silenciar sonido"}
      className="header-audio-toggle"
    >
      {muted ? <VolumeOff size={24} /> : <Volume2 size={24} />}
    </button>
  );
}
