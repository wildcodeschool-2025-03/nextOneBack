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
} from "./connexionRepository";

// Inscription (register)
const registerUser: RequestHandler = async (req, res, next) => {
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

    const token = jwt.sign(myPayload, process.env.APP_SECRET as string, {
      expiresIn: "7d",
    });

    await connectedUser(user.email);

    res
      .cookie("auth_token", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

// Connexion (login)
const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    if (!user) {
      res.sendStatus(422);
      return;
    }

    const { password, ...userWithoutPassword } = user;

    const myPayload: MyPayload = {
      sub: user.id.toString(),
      isAdmin: user.id_role === 2,
    };

    const token = jwt.sign(myPayload, process.env.APP_SECRET as string, {
      expiresIn: "7d",
    });

    await connectedUser(user.email);

    res
      .cookie("auth_token", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

//  Profil utilisateur connecté
const getUserProfile: RequestHandler = async (req, res, next) => {
  try {
    if (!req.auth?.sub) {
      res.sendStatus(401);
      return;
    }

    const user = await userById(Number(req.auth.sub));
    if (!user) {
      res.sendStatus(401);
      return;
    }

    if (user.deleted_at !== null) {
      res.status(403).json({ message: "Compte désactivé" });
      return;
    }

    const { password, ...userWithoutPassword } = user;

    res.status(200).json({
      userId: userWithoutPassword.id,
      email: userWithoutPassword.email,
      pseudo: userWithoutPassword.pseudo,
      firstname: userWithoutPassword.firstname,
      name: userWithoutPassword.name,
      id_role: userWithoutPassword.id_role,
    });
  } catch (err) {
    next(err);
  }
};

//  Déconnexion (logout)
const logoutUser: RequestHandler = async (req, res) => {
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

    await disconnectedUser(user.email);

    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });

    res.json({ message: "Déconnexion réussie, cookie supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la déconnexion" });
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

export default {
  add: registerUser,
  read: loginUser,
  profile: getUserProfile,
  disconnected: logoutUser,
  remove,
};
