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

import type { Event, EventWithParticipants } from "./eventRepository";

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
      let event: Event | null;

      if (req.auth?.isAdmin) {
        event = await getEventWithParticipants(+req.params.id);
      } else {
        event = await getEventById(+req.params.id);
      }

      if (!event) {
        res.sendStatus(422);
        return;
      }

      res.status(200).json(event);
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
      const { title, description, date } = req.body;

      const updated = await updateEvent(
        Number(req.params.id),
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

      const register = await userRegister(userId, Number(eventId));
      if (register) {
        res.sendStatus(409);
        return;
      }

      // ajouter un utilisateur
      await participate(userId, Number(eventId));
      res.sendStatus(201);
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
