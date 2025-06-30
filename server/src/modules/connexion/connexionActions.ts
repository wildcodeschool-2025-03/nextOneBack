import type { RequestHandler } from "express";
import { userCreate, userEmail } from "./connexionRepository";
import type { Connexion } from "./connexionRepository";

// inscription/register
const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, name, pseudo, email, password } = req.body;
    await userCreate(firstname, name, pseudo, email, password);
    res.status(201).json({ message: "compte créé" });
  } catch (err) {
    next(err);
  }
};

// connexion/login
const read: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

export default { add, read };
