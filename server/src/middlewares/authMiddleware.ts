import type { RequestHandler } from "express";

// verifier que l'user est admin
export const adminAuth: RequestHandler = (req, res, next) => {
  if (!req.auth || !req.auth.isAdmin) {
    res.sendStatus(401);
    return;
  }
  next();
};

// verifier que l'user est connecté
export const userAuth: RequestHandler = (req, res, next) => {
  if (!req.auth || !req.auth.sub) {
    res.sendStatus(401);
    return;
  }
  next();
};
