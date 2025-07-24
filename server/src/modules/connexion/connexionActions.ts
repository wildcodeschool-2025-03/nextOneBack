import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { MyPayload } from "../../middlewares/verifyToken";
import {
  type Connexion,
  connectedUser,
  deleteUser,
  disconnectedUser,
  userById,
  userCreate,
  userEmail,
} from "./connexionRepository";

// inscription/register
const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, name, pseudo, email, password } = req.body;
    const user: Connexion = await userCreate(
      firstname,
      name,
      pseudo,
      email,
      password,
    );
    const { password: _, ...userWithoutPassword } = user;

    const myPayload: MyPayload = {
      sub: user.id.toString(),
      isAdmin: user.id_role === 2,
    };
    const token = await jwt.sign(myPayload, process.env.APP_SECRET as string, {
      expiresIn: "7d",
    });

    await connectedUser(user.email);

    res
      .cookie("auth_token", token, {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
      })
      .status(200)
      .json({
        user: userWithoutPassword,
      });
  } catch (err) {
    next(err);
  }
};

// connexion/login
const read: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    if (!user) {
      res.sendStatus(422);
      return;
    }
    const { password, ...userWithoutPassword } = user;

    await connectedUser(user.email);

    const myPayload: MyPayload = {
      sub: user.id.toString(),
      isAdmin: user.id_role === 2,
    };
    const token = await jwt.sign(myPayload, process.env.APP_SECRET as string, {
      expiresIn: "7d",
    });

    res
      .cookie("auth_token", token, {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
      })
      .status(200)
      .json({
        user: userWithoutPassword,
      });
  } catch (err) {
    next(err);
  }
};

// profil utilisateur connecté
const profile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.auth?.sub) {
      res.sendStatus(401);
      return;
    }
    const user = await userById(Number.parseInt(req.auth.sub));
    if (!user) {
      res.sendStatus(401);
      return;
    }

    if (user.deleted_at !== null) {
      res.status(403).json({ message: "Compte désactivé" });
      return;
    }

    const { password, ...userWithoutPassword } = user;
    res.json({
      userId: userWithoutPassword.id,
      email: userWithoutPassword.email,
      pseudo: userWithoutPassword.pseudo,
    });
  } catch (err) {
    next(err);
  }
};
// Déconnexion"
const disconnected: RequestHandler = async (req, res) => {
  try {
    if (!req.auth?.sub) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }
    const user = await userById(Number(req.auth.sub));
    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    if (user.deleted_at !== null) {
      res.status(403).json({ message: "Compte supprimé" });
      return;
    }
    // Delete Coockie
    await disconnectedUser(user.email);
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });
    res.json({ message: "Déconnexion reussié,cookie supprimé" });
  } catch (err) {
    res.status(500).json({ message: "erreur pour supprimer le cookie" });
  }
};
const remove: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.auth?.sub);
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    await deleteUser(userId);
    res.status(200).json({ message: "Compte supprimé avec succès." });
  } catch (err) {
    next(err);
  }
};
export default { add, read, profile, disconnected, remove };
