import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export type MyPayload = {
  sub: string;
  isAdmin: boolean;
};

// verification du token
const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authorization = req.get("Authorization");
    if (authorization == null) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
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
