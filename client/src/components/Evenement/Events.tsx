import { useState } from "react";
import { useEvent } from "../../hooks/useEvent";
import type { User } from "../../types/auth";
import type { Event, EventFormData } from "../../types/event";

import { BsPeople } from "react-icons/bs";
import { CiCalendar } from "react-icons/ci";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";

// format de la date
const formDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// creer/modifier un evenement
const EventForm = ({
  event,
  save,
  cancel,
}: {
  event?: Event;
  save: (data: EventFormData) => void;
  cancel: () => void;
}) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date ? event.date.split("T")[0] : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) {
      toast.error("Titre et date obligatoires");
      return;
    }

    save({ title, description, date: `${date}T19:00:00Z` });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nom de l'événement"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description de l'événement"
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={cancel}>
          Annuler
        </button>
        <button type="submit">{event ? "Modifier" : "Créer"}</button>
      </div>
    </form>
  );
};

// carte d'événement
const EventCard = ({
  event,
  user,
  isAdmin,
  participate,
  edit,
  deleteEvent,
}: {
  event: Event;
  user: User | null | undefined;
  isAdmin: boolean;
  participate: (id: number, isParticipating: boolean) => void;
  edit: (event: Event) => void;
  deleteEvent: (id: number) => void;
}) => (
  <div>
    <div>
      <h3>{event.title}</h3>
      {isAdmin && (
        <div>
          <button type="button" onClick={() => edit(event)}>
            <FaRegPenToSquare />
          </button>
          <button type="button" onClick={() => deleteEvent(event.id)}>
            <RiDeleteBin5Line />
          </button>
        </div>
      )}
    </div>
    {event.description && <p>{event.description}</p>}
    <p>
      <CiCalendar />
      {formDate(event.date)}
    </p>
    <div>
      <span>
        <BsPeople />
        {event.participantCount || 0} participant(s)
      </span>
      {user ? (
        <button
          type="button"
          onClick={() => participate(event.id, event.isParticipating || false)}
        >
          {event.isParticipating ? "Se désinscrire" : "Participer"}
        </button>
      ) : (
        <span>Connectez-vous pour participer</span>
      )}
    </div>
  </div>
);

// fenetre modale
export const Events = () => {
  const {
    events,
    loading,
    user,
    isAdmin,
    handleParticipation,
    saveEvent,
    deleteEvent,
  } = useEvent();
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
    try {
      await saveEvent(data, eventEdit?.id);
      closeModal();
    } catch (error) {}
  };

  if (loading) {
    return <div>Chargement des événements ...</div>;
  }

  return (
    <div>
      <div>
        <h2>Evénements</h2>
        {isAdmin && (
          <button type="button" onClick={() => openModal()}>
            + Nouvel événément
          </button>
        )}
      </div>
      {events.length === 0 ? (
        <div>
          <p>Aucun événement pour le moment</p>
        </div>
      ) : (
        <div>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              user={user}
              isAdmin={isAdmin}
              participate={handleParticipation}
              edit={openModal}
              deleteEvent={deleteEvent}
            />
          ))}
        </div>
      )}

      {modal && (
        <div>
          <div>
            <h3> {eventEdit ? "Modifier l'événement" : "Nouvel événement"}</h3>
            <EventForm
              event={eventEdit}
              save={handleSave}
              cancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};
