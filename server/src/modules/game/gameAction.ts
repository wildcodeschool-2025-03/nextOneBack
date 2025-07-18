import type { Request, Response } from "express";
import gameRepository from "./gameRepository";

const browse = async (_req: Request, res: Response): Promise<void> => {
  try {
    const games = await gameRepository.findAll();
    res.status(200).json(games);
  } catch (err) {
    console.error("Erreur lors de la récupération des jeux :", err);
    res.sendStatus(500);
  }
};

const readRanking = async (req: Request, res: Response): Promise<void> => {
  const gameId: number = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(gameId)) {
    res.status(400).json({ error: "ID de jeu invalide" });
    return;
  }

  try {
    const ranking = await gameRepository.findTopRankingByGameId(gameId);
    res.status(200).json(ranking);
  } catch (err) {
    console.error("Erreur lors de la récupération du classement :", err);
    res.sendStatus(500);
  }
};

export default {
  browse,
  readRanking,
};
