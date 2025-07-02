import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import type { MyPayload } from "../../middlewares/verifyToken";
import { userCreate, userEmail } from "./connexionRepository";

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
      expiresIn: "2h",
    });
    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};

export default { add, read };
