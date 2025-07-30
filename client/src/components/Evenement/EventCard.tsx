import type { User } from "../../types/auth";
import type { Event } from "../../types/event";

import { CiCalendar } from "react-icons/ci";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";

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

type EventCardProps = {
  event: Event;
  user: User | null | undefined;
  isAdmin: boolean;
  edit: (event: Event) => void;
  deleteEvent: (id: number) => void;
};

export const EventCard = ({
  event,
  isAdmin,
  edit,
  deleteEvent,
}: EventCardProps) => (
  <div className="event-card">
    <div className="event-card-header">
      <h3>{event.title}</h3>
      {isAdmin && (
        <div className="admin-actions">
          <button
            className="btn-icon-edit"
            type="button"
            onClick={() => edit(event)}
          >
            <FaRegPenToSquare />
          </button>
          <button
            className="btn-icon-delete"
            type="button"
            onClick={() => deleteEvent(event.id)}
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      )}
    </div>
    {event.description && (
      <p className="event-description">{event.description}</p>
    )}
    <p className="event-date">
      <CiCalendar />
      {formDate(event.date)}
    </p>
  </div>
);
