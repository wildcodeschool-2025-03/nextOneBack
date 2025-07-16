import type { RequestHandler } from "express";
import userRepository from "./userRepository";
// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const userCount = await userRepository.countUser();
    if (userCount == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(userCount);
    }
  } catch (err) {
    next(err);
  }
};
export default { read };
