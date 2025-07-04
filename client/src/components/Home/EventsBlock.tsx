import { useState } from "react";
import "./EventsBlock.css";

export default function EventsBlock() {
  const saveEvent = localStorage.getItem("event");
  let eventInitial: string[] = [];
  if (saveEvent) {
    eventInitial = JSON.parse(saveEvent);
  }

  const [event, setEvent] = useState<string[]>(eventInitial);
  const [newEvent, setNewEvent] = useState("");

  const addEvent = () => {
    if (!newEvent) return;
    const updateEvent = [...event, newEvent];
    setEvent(updateEvent);
    setNewEvent("");
    localStorage.setItem("event", JSON.stringify(updateEvent));
  };

  const deleteEvent = (deleteIndex: number) => {
    const updateEvent = event.filter((_, index) => index !== deleteIndex);
    setEvent(updateEvent);
    localStorage.setItem("event", JSON.stringify(updateEvent));
  };

  return (
    <div className="events-container">
      <div className="block-title">
        <span className="line" />
        <h2>EVENEMENTS</h2>
        <span className="line" />
      </div>
      <section className="current-event">
        <ul>
          {event.map((event, e) => (
            <li key={event}>
              {event}
              <button
                type="button"
                onClick={() => deleteEvent(e)}
                className="delete-button"
              >
                ❯ supprimer
              </button>
            </li>
          ))}
        </ul>
      </section>
      <div className="events-content">
        {/* Textarea pour l'admin seulement :) */}
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="saisir un nouvel événement"
          className="input-event"
        />
        <button type="button" onClick={addEvent} className="add-button-event">
          Ajouter
        </button>
      </div>
    </div>
  );
}
