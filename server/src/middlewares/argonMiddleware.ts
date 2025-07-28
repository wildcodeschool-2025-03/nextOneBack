import argon2 from "argon2";
import type { RequestHandler } from "express";
import { userEmail } from "../modules/connexion/connexionRepository";

// inscription
export const hashPassword: RequestHandler = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hash = await argon2.hash(password);
    req.body.password = hash;
    next();
  } catch (err) {
    next(err);
  }
};

// connexion
export const verifPassword: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userEmail(email);
    if (!user) {
      res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }
    if (user.deleted_at !== null) {
      res.status(403).json({ message: "Compte supprimé" });
      return;
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }
    req.body.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
