import type React from "react";
import { useEffect, useRef, useState } from "react";
import "./GameFormModal.css";

type Mode = "add" | "edit";

type Props = {
  mode: Mode;
  initialData?: {
    id?: number;
    name: string;
    description: string;
    images?: string;
    available_online?: number;
    available_maintenance?: number;
    category?: string;
  };
  onClose: () => void;
  onSubmit: (data: FormData) => void;
};

export default function GameFormModal({
  mode,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [category, setCategory] = useState(initialData?.category ?? "Solo");
  const [availableOnline, setAvailableOnline] = useState<number>(
    initialData?.available_online ?? 1,
  );
  const [availableMaintenance, setAvailableMaintenance] = useState<number>(
    initialData?.available_maintenance ?? 0,
  );
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.images ?? null,
  );
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (initialData?.id) formData.append("id", String(initialData.id));
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("available_online", String(availableOnline));
      formData.append("available_maintenance", String(availableMaintenance));
      if (file) formData.append("image", file);
      onSubmit(formData);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire jeu:", error);
    }
  };

  return (
    <div className="modal-overlay" aria-modal="true">
      <div className="modal-content" ref={dialogRef}>
        <h2>{mode === "add" ? "Ajouter un jeu" : "Modifier le jeu"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="game-name">Titre</label>
          <input
            id="game-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="game-description">Descriptif</label>
          <textarea
            id="game-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />

          <label htmlFor="game-category">Catégorie</label>
          <select
            id="game-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Solo">Solo</option>
            <option value="Multijoueur">Multijoueur</option>
          </select>

          <label htmlFor="game-available-online">Disponible en ligne</label>
          <select
            id="game-available-online"
            value={availableOnline}
            onChange={(e) => setAvailableOnline(Number(e.target.value))}
            required
          >
            <option value={1}>Oui</option>
            <option value={0}>Non</option>
          </select>

          <label htmlFor="game-available-maintenance">En maintenance</label>
          <select
            id="game-available-maintenance"
            value={availableMaintenance}
            onChange={(e) => setAvailableMaintenance(Number(e.target.value))}
            required
          >
            <option value={1}>Oui</option>
            <option value={0}>Non</option>
          </select>

          <label htmlFor="game-image">Image</label>
          <input
            id="game-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {previewUrl && (
            <div className="image-preview">
              <p>Aperçu :</p>
              <img src={previewUrl} alt="" className="preview-img" />
            </div>
          )}

          <div className="modal-buttons">
            <button type="submit">
              {mode === "add" ? "Ajouter" : "Modifier"}
            </button>
            <button type="button" onClick={onClose} className="cancel">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
