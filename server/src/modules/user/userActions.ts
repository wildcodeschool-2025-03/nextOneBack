import type { RequestHandler } from "express";
import userRepository from "./userRepository";
// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    if (req.query.type && req.query.format && req.query.format === "count") {
      const userCount = await userRepository.countUser(
        req.query.type as string,
      );
      if (userCount == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(userCount);
      }
      return;
    }
    res.sendStatus(400);
  } catch (err) {
    next(err);
  }
};
export default { read };
