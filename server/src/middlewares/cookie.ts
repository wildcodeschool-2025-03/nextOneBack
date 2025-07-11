import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

// verifier le cookie "token"
export const verifyCookie: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.cookies.auth_token;

    if (!authorization) {
      res.status(401).json({ message: "cookie invalide !" });
      return;
    }

    const payload = jwt.verify(
      authorization,
      process.env.APP_SECRET as string,
    ) as { sub: string; isAdmin: boolean };
    req.auth = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

// supprimer le cookie "token"
export const deleteCookie: RequestHandler = (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });
    res.json({ message: "cookie supprimé" });
  } catch (err) {
    res.status(500).json({ message: "erreur pour supprimer le cookie" });
  }
};
