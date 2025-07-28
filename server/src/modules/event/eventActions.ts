import type { RequestHandler } from "express";
import {
  cancelParticipate,
  createEvent,
  deleteEvent,
  getEventById,
  getEventWithParticipants,
  getEvents,
  participate,
  updateEvent,
  userRegister,
} from "./eventRepository";

export const eventActions: {
  browse: RequestHandler;
  read: RequestHandler;
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
      res.sendStatus(500);
      return;
    }
  },

  // recupere un event
  async read(req, res) {
    try {
      const eventId = Number(req.params.id);
      const event = await getEventById(eventId);
      if (!event) {
        res.sendStatus(404);
        return;
      }

      if (req.auth?.isAdmin) {
        const eventWithParticipants = await getEventWithParticipants(eventId);
        res.status(200).json(eventWithParticipants);
      } else {
        res.status(200).json(event);
      }
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  },

  // creer un nouvel event (admin seulement)
  async add(req, res) {
    try {
      const { title, description, date } = req.body;

      // creer l'event dans la bdd
      const create = await createEvent(
        title,
        description || null,
        date,
        Number(req.auth.sub),
      );
      if (!create) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(201);
      return;
    } catch {
      res.sendStatus(500);
      return;
    }
  },

  // modifier les events (seulement l'admin)
  async update(req, res) {
    try {
      const eventId = Number(req.params.id);
      const { title, description, date } = req.body;

      const existEvent = await getEventById(eventId);
      if (!existEvent) {
        res.sendStatus(404);
        return;
      }

      const updated = await updateEvent(
        Number(eventId),
        title,
        description,
        date,
      );
      if (!updated) {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(200);
      return;
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  },

  // supprimer un evenement
  async remove(req, res) {
    try {
      const eventId = Number(req.params.id);

      const existEvent = await getEventById(eventId);
      if (!existEvent) {
        res.sendStatus(404);
        return;
      }
      const deleted = await deleteEvent(Number(eventId));
      if (!deleted) {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(200);
      return;
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  },

  // inscription d'un utilisateur à un événément
  async register(req, res) {
    try {
      const eventId = Number(req.params.id);
      const userId = Number(req.auth.sub);

      const existEvent = await getEventById(eventId);
      if (!existEvent) {
        res.sendStatus(404);
        return;
      }
      const register = await userRegister(userId, Number(eventId));
      if (register) {
        res.sendStatus(400);
        return;
      }

      // ajouter un utilisateur
      await participate(userId, Number(eventId));
      res.sendStatus(200);
      return;
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  },

  // annuler la participation
  async cancel(req, res) {
    try {
      const eventId = Number(req.params.id);
      const userId = Number(req.auth.sub);

      const existEvent = await getEventById(eventId);
      if (!existEvent) {
        res.sendStatus(404);
        return;
      }

      const register = await userRegister(userId, Number(eventId));
      if (!register) {
        res.sendStatus(400);
        return;
      }

      // annule la participation
      await cancelParticipate(userId, Number(eventId));
      res.sendStatus(200);
      return;
    } catch (err) {
      res.sendStatus(500);
      return;
    }
  },
};
