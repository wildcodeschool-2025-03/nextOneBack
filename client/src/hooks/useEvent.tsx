import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { eventAPI } from "../services/eventAPI";
import type { Event, EventFormData } from "../types/event";

export const useEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // loading au démarrage
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
    saveEvent,
    deleteEvent,
  };
};
