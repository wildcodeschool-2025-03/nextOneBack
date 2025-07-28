import type { RequestHandler } from "express";
import { getEventById } from "../modules/event/eventRepository";

// verifier que l'event existe
export const eventExist: RequestHandler = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    if (!eventId || Number.isNaN(eventId)) {
      res.status(400).json({ message: "ID d'événement invalde" });
      return;
    }

    const event = await getEventById(Number(eventId));
    if (!event) {
      res.status(400).json({ message: "événement non trouvé" });
      return;
    }
    next();
  } catch (err) {
    res
      .status(500)
      .json({ message: "erreur lors de la vérification de l'événement" });
    return;
  }
};

// verifier que l'user est admin
export const admin: RequestHandler = (req, res, next) => {
  if (!req.auth || !req.auth.isAdmin) {
    res.status(401).json({
      message:
        "accès refusé, seul un administrateur est autorisé à effectuer cette action",
    });
    return;
  }
  next();
};

// verifier que l'user est connecté pour s'inscrire et se désinscrire
export const userAuth: RequestHandler = (req, res, next) => {
  if (!req.auth || !req.auth.sub) {
    res.status(401).json({
      message: "vous devez être connecté pour effectuer cette actions",
    });
    return;
  }
  next();
};
