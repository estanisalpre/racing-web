import { useState, useEffect } from "react";
import { API_ROUTES } from "@/config/apiRoutes";
import { Trash, Pencil } from "lucide-react";

interface Track {
  id: number;
  name: string;
  corners: number;
  length_meters: number;
  image_base64: string;
}

export function ViewTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [editTrackId, setEditTrackId] = useState<number | null>(null);
  const [editedTrack, setEditedTrack] = useState<Partial<Track>>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = () => {
    fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.ALL_TRACKS}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(res => res.json())
      .then(data => setTracks(data.tracks || []));
  };

  const onDelete = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.DELETE_TRACK}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadTracks();
      });
  };

  const startEdit = (track: Track) => {
    setEditTrackId(track.id);
    setEditedTrack({ ...track });
    setSelectedImage(null);
  };

  const handleInputChange = (field: keyof Track, value: string | number) => {
    setEditedTrack(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const saveChanges = async () => {
    if (!editTrackId) return;

    const formData = new FormData();
    formData.append("name", editedTrack.name || "");
    formData.append("corners", editedTrack.corners?.toString() || "");
    formData.append("length_meters", editedTrack.length_meters?.toString() || "");
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    await fetch(`${import.meta.env.VITE_API_URL}${API_ROUTES.UPDATE_TRACK}/${editTrackId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },
      body: formData
    });

    setEditTrackId(null);
    setSelectedImage(null);
    setEditedTrack({});
    loadTracks();
  };

  return (
    <div className="modal-container">
      <table className="modal-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Curvas</th>
            <th>Longitud</th>
            <th>Imagen</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => {
            const isEditing = editTrackId === track.id;
            return (
              <tr key={track.id}>
                <td>{track.id}</td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTrack.name || ""}
                      onChange={e => handleInputChange("name", e.target.value)}
                    />
                  ) : (
                    track.name
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedTrack.corners || ""}
                      onChange={e => handleInputChange("corners", Number(e.target.value))}
                    />
                  ) : (
                    track.corners
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedTrack.length_meters || ""}
                      onChange={e => handleInputChange("length_meters", Number(e.target.value))}
                    />
                  ) : (
                    `${track.length_meters} mts`
                  )}
                </td>
                <td>
                  <label style={{ cursor: "pointer" }}>
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : track.image_base64
                      }
                      alt={`Track ${track.name}`}
                      width={60}
                      height={60}
                    />
                    {isEditing && (
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    )}
                  </label>
                </td>
                <td>
                  {isEditing ? (
                    <button onClick={saveChanges}>💾</button>
                  ) : (
                    <Pencil
                      size={20}
                      color="#0785D9"
                      className="action-icon"
                      onClick={() => startEdit(track)}
                    />
                  )}
                </td>
                <td>
                  <Trash
                    size={20}
                    color="#9707D9"
                    className="action-icon"
                    onClick={() => onDelete(track.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}