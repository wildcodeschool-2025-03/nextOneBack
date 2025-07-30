import { useState } from "react";
import Modal from "react-modal";
import { useEvent } from "../../hooks/useEvent";
import type { Event, EventFormData } from "../../types/event";
import { EventCard } from "./EventCard";
import { EventForm } from "./EventForm";

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
  const { events, loading, user, isAdmin, saveEvent, deleteEvent } = useEvent();
  const [modal, setModal] = useState(false);
  const [eventEdit, setEventEdit] = useState<Event | undefined>();

  const openModal = (event?: Event) => {
    setEventEdit(event);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEventEdit(undefined);
  };

  const handleSave = async (data: EventFormData) => {
    await saveEvent(data, eventEdit?.id);
    closeModal();
  };

  if (loading) {
    return <div className="loading">Chargement des événements ...</div>;
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h2 className="events-title">Evénements</h2>
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
              edit={openModal}
              deleteEvent={deleteEvent}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel={eventEdit ? "Modifier l'événement" : "Nouvel événement"}
      >
        <EventForm event={eventEdit} save={handleSave} cancel={closeModal} />
      </Modal>
    </div>
  );
};
