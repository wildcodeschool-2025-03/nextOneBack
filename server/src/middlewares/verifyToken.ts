import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export type MyPayload = {
  sub: string;
  isAdmin: boolean;
};

// verification du token
const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      throw new Error("token missing");
    }

    const payload = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as MyPayload;
    req.auth = payload;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
export default verifyToken;
