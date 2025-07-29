import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LoginContext } from "../Auth/LoginContext";
import { eventAPI } from "../services/eventAPI";
import type { Event, EventFormData } from "../types/event";

export const useEvent = () => {
  const context = useContext(LoginContext);
  const user = context?.user;
  const isAdmin = context?.isAdmin || false;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // les evenements au démarrage
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await eventAPI.getAll();
      setEvents(data);
    } catch (error) {
      toast.error("erreur lors du chargement des événements");
    } finally {
      setLoading(false);
    }
  };

  // s'inscrire ou se désinscrire
  const handleParticipation = async (
    eventId: number,
    isParticipating: boolean,
  ) => {
    if (!user) {
      toast.warn("Connectez-vous pour participer");
      return;
    }
    try {
      if (isParticipating) {
        await eventAPI.unparticipate(eventId);
        toast.success("Vous êtes désinscrit");
      } else {
        await eventAPI.participate(eventId);
        toast.success("Inscription confirmée !");
      }

      setEvents(
        events.map((event) =>
          event.id === eventId
            ? {
                ...event,
                isParticipating: !isParticipating,
                participantCount: isParticipating
                  ? (event.participantCount || 0) - 1
                  : (event.participantCount || 0) + 1,
              }
            : event,
        ),
      );
    } catch (error) {
      toast.error("Erreur lors de la participation");
    }
  };

  // creer ou modifier un evenement
  const saveEvent = async (data: EventFormData, editingId?: number) => {
    try {
      if (editingId) {
        await eventAPI.update(editingId, data);
        toast.success("Evenement modifié avec succès");
      } else {
        await eventAPI.create(data);
        toast.success("Evenement créé avec succès");
      }
      loadEvents();
    } catch (error) {
      toast.error("Erreur lors de la création/modification");
    }
  };

  // supprimer un événément
  const deleteEvent = async (eventId: number) => {
    if (!confirm("Supprimer cet événement ?")) return;
    try {
      await eventAPI.delete(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
      toast.success("Evénement supprimé");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return {
    events,
    loading,
    user,
    isAdmin,
    handleParticipation,
    saveEvent,
    deleteEvent,
  };
};
