import type { RequestHandler } from "express";
import {
  cancelParticipate,
  createEvent,
  deleteEvent,
  getEvents,
  participate,
  updateEvent,
} from "./eventRepository";

export const eventActions: {
  browse: RequestHandler;
  add: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
  register: RequestHandler;
  cancel: RequestHandler;
} = {
  // on recupere les events
  async browse(req, res) {
    try {
      const events = await getEvents();
      res.status(200).json(events);
      return;
    } catch (err) {
      res
        .status(500)
        .json({ err: "erreur lors de la recuperation des evenements" });
      return;
    }
  },

  // creer un nouvel event
  async add(req, res) {
    try {
      const { title, description, date } = req.body;

      // si user est !admin
      if (!req.auth.isAdmin) {
        res.status(500).json({
          message: "Accès refusé seul un admin peut créer un nouvel evenement",
        });
        return;
      }
      // creer l'event dans la bdd
      const create = await createEvent(
        title,
        description,
        date,
        Number(req.auth.sub),
      );
      if (!create) {
        res
          .status(500)
          .json({ message: "erreur lors de la création de l'événement" });
        return;
      }
      res.status(201).json({ message: "événement créé avec succès !" });
      return;
    } catch {
      res
        .status(500)
        .json({ message: "erreur lors de la création de l'événement" });
      return;
    }
  },

  // modifier les events (seulement l'admin)
  async update(req, res) {
    try {
      const eventId = req.params.id;
      const { title, description, date } = req.body;

      // si user est !admin
      if (!req.auth.isAdmin) {
        res.status(500).json({
          message:
            "Accès refusé seul un admin peut modifier un nouvel evenement",
        });
        return;
      }
      const updated = await updateEvent(
        Number(eventId),
        title,
        description,
        date,
      );
      if (!updated) {
        res.status(404).json({ message: "événément non trouvé" });
        return;
      }
      res.status(200).json({ message: "événément modifié avec succès" });
      return;
    } catch (err) {
      res.status(500).json({ message: "erreur lors de la mise a jour" });
      return;
    }
  },

  // supprimer un evenement
  async remove(req, res) {
    try {
      const eventId = req.params.id;

      // si user est !admin
      if (!req.auth.isAdmin) {
        res.status(500).json({
          message:
            "Accès refusé seul un admin peut supprimer un nouvel evenement",
        });
        return;
      }
      const deleted = await deleteEvent(Number(eventId));
      if (!deleted) {
        res.status(404).json({ message: "événément non trouvé" });
        return;
      }
      res.status(200).json({ message: "evenement supprimé" });
      return;
    } catch (err) {
      res.status(500).json({ message: "erreur lors de la suppression" });
      return;
    }
  },

  // inscription d'un utilisateur à un événément
  async register(req, res) {
    try {
      const eventId = req.params.id;

      // vérifier que l'utilisateur est connecté
      const userId = Number(req.auth.sub);

      // ajouter un utilisateur
      await participate(userId, Number(eventId));
      res.status(200).json({ message: "inscription réussie à l'événement" });
      return;
    } catch (err) {
      res
        .status(500)
        .json({ message: "erreur lors de l'inscription à l'évenement" });
      return;
    }
  },

  // annuler la participation
  async cancel(req, res) {
    try {
      const eventId = req.params.id;
      // verification que l'utilisateur est connecté
      const userId = Number(req.auth.sub);

      // annule la participation
      await cancelParticipate(userId, Number(eventId));
      res.status(200).json({ message: "désinscription réussie à l'événement" });
      return;
    } catch (err) {
      res
        .status(500)
        .json({ message: "erreur lors de la désinscription à l'évenement" });
      return;
    }
  },
};
