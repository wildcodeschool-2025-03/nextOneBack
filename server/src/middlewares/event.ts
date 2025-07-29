import type { RequestHandler } from "express";

// validation des datas pour créer un event
export const valideDataEvent: RequestHandler = (req, res, next) => {
  const { title, date } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    res.sendStatus(400);
    return;
  }

  if (!date || typeof date !== "string" || date.trim() === "") {
    res.sendStatus(400);
    return;
  }
  next();
};

// validation de l'id evenement
export const valideEventId: RequestHandler = (req, res, next) => {
  const eventId = req.params.id;

  if (!eventId || Number.isNaN(Number(eventId))) {
    res.sendStatus(400);
    return;
  }
  next();
};
