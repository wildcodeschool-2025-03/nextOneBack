import { useContext, useState } from "react";
import Modal from "react-modal";
import { AuthContext } from "../../Auth/LoginContext";
import { useEvent } from "../../hooks/useEvent";
import type { EventFormData } from "../../types/event";
import { EventCard } from "./EventCard";
import { EventForm } from "./EventForm";
import "../../styles/eventForm.css";
import "../../styles/events.css";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// fenetre modale
export const Events = () => {
  const { events, loading, saveEvent, deleteEvent } = useEvent();
  const context = useContext(AuthContext);
  const user = context?.user;
  const isAdmin = context?.isAdmin || false;

  const [modal, setModal] = useState(false);
  const [eventEdit, setEventEdit] = useState<number>();

  const eventToEdit = events.find((event) => event.id === eventEdit);

  const openModal = (eventId?: number) => {
    setEventEdit(eventId);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEventEdit(undefined);
  };

  const handleSave = async (data: EventFormData) => {
    await saveEvent(data, eventEdit);
    closeModal();
  };

  if (loading) {
    return <div className="loading">Chargement des événements ...</div>;
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <div className="block-title-event">
          <span className="line-event" />
          <h2 className="events-title">EVENEMENTS</h2>
          <span className="line-event" />
        </div>
        {isAdmin && (
          <button
            type="button"
            className="btn-newEvent"
            onClick={() => openModal()}
          >
            + Nouvel événément
          </button>
        )}
      </div>
      {events.length === 0 ? (
        <div className="state">
          <p>Aucun événement pour le moment</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              user={user}
              isAdmin={isAdmin}
              edit={(event) => openModal(event.id)}
              deleteEvent={deleteEvent}
            />
          ))}
        </div>
      )}

      <div className="event-modal-container">
        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel={eventEdit ? "Modifier l'événement" : "Nouvel événement"}
        >
          <EventForm
            event={eventToEdit}
            eventSave={handleSave}
            eventCancel={closeModal}
          />
        </Modal>
      </div>
    </div>
  );
};
