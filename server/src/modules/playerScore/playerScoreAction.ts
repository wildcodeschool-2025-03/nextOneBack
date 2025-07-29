import type { RequestHandler } from "express";
import playerScoreRepository from "./playerScoreRepository";

const read: RequestHandler = async (req, res, next) => {
  const id_user = Number(req.auth?.sub);
  if (!id_user) {
    res.status(401).json({ error: "Utilisateur non authentifié" });
    return;
  }
  try {
    const playerScored = await playerScoreRepository.read(id_user);
    res.status(200).json(playerScored);
  } catch (err) {
    next(err);
  }
};
export default { read };
