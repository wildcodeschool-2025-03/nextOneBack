import type { RequestHandler } from "express";
import partyRepository from "./partyRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const partys = await partyRepository.readAll();
    res.json(partys);
  } catch (err) {
    next(err);
  }
};
// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const partyId = Number(req.params.id);
    const party = await partyRepository.read(partyId);
    if (party == null) {
      res.sendStatus(404);
    } else {
      res.json(party);
    }
  } catch (err) {
    next(err);
  }
}; // The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const id_user = Number(req.auth?.sub);
    if (!id_user) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
    }
    const newParty = {
      id_user,
      id_game: req.body.id_game,
      score: req.body.score,
      date_game: req.body.date_game,
    };
    const insertId = await partyRepository.create(newParty);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
// READ classement
const readRanking: RequestHandler = async (req, res, next) => {
  const gameId = Number(req.params.id);
  if (Number.isNaN(gameId)) {
    res.status(400).json({ error: "ID de jeu invalide" });
    return;
  }

  try {
    const ranking = await partyRepository.findTopRankingByGameId(gameId);
    res.status(200).json(ranking);
  } catch (error) {
    next(error);
  }
};
const readScore: RequestHandler = async (req, res, next) => {
  const gameId = Number(req.params.id);
  const id_user = Number(req.auth?.sub);
  if (!id_user) {
    res.status(401).json({ error: "Utilisateur non authentifié" });
    return;
  }
  try {
    const playerScored = await partyRepository.topScore(gameId, id_user);
    res.status(200).json(playerScored);
  } catch (err) {
    next(err);
  }
};

export default { browse, readRanking, readScore, read, add };
