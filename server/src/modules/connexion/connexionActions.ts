import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { MyPayload } from "../../middlewares/verifyToken";
import {
  type Connexion,
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
export default { add, read, profile };
