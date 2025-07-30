import { useState } from "react";
import type { Event, EventFormData } from "../../types/event";

import { toast } from "react-toastify";

// creer/modifier un evenement
type EventFormProps = {
  event?: Event;
  eventSave: (data: EventFormData) => void;
  eventCancel: () => void;
};
export const EventForm = ({
  event,
  eventSave,
  eventCancel,
}: EventFormProps) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date ? event.date.split("T")[0] : "");
  const [time, setTime] = useState(
    event?.date ? event.date.split("T")[1]?.substring(0, 5) : "19:00",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) {
      toast.error("Titre et date obligatoires");
      return;
    }

    eventSave({ title, description, date: `${date} ${time}:00` });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3>{event ? "Modifier l'événement" : "Nouvel événement"}</h3>
        <button type="button" className="btn-close" onClick={eventCancel}>
          x
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-groupe">
          <label className="form-label" htmlFor="title">
            Titre
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nom de l'événement"
          />
        </div>
        <div className="form-groupe">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de l'événement"
          />
        </div>
        <div className="form-groupe">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            className="form-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-groupe">
          <label className="form-label" htmlFor="heure">
            Heure
          </label>
          <input
            id="heure"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button className="btn-cancel" type="button" onClick={eventCancel}>
            Annuler
          </button>
          <button
            className="btn-submit"
            type="submit"
            disabled={!title || !date}
          >
            {event ? "Modifier" : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
};
