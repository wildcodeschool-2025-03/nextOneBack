import fs from "node:fs";
import path from "node:path";
import type { Request, Response } from "express";
import db from "../../../database/client";
import gameRepository from "./gameRepository";

// UTILS
function parseAndValidateGameBody(
  req: Request,
  res: Response,
): null | {
  name: string;
  description: string;
  category: string;
  available_online: number;
  available_maintenance: number;
} {
  const {
    name,
    description,
    category,
    available_online,
    available_maintenance,
  } = req.body;

  if (!name || !description || !category) {
    res.status(400).json({ message: "Champs obligatoires manquants" });
    return null;
  }

  const online = Number(available_online);
  const maintenance = Number(available_maintenance);

  if (Number.isNaN(online) || Number.isNaN(maintenance)) {
    res.status(400).json({ message: "Champs de disponibilité invalides" });
    return null;
  }

  return {
    name,
    description,
    category,
    available_online: online,
    available_maintenance: maintenance,
  };
}

// BROWSE
const browse = async (_req: Request, res: Response): Promise<void> => {
  try {
    const games = await gameRepository.findAll();
    res.status(200).json(games);
  } catch (error) {
    console.error("Erreur récupération jeux :", error);
    res.sendStatus(500);
  }
};

// READ classement
const readRanking = async (req: Request, res: Response): Promise<void> => {
  const gameId = Number(req.params.id);
  if (Number.isNaN(gameId)) {
    res.status(400).json({ error: "ID de jeu invalide" });
    return;
  }

  try {
    const ranking = await gameRepository.findTopRankingByGameId(gameId);
    res.status(200).json(ranking);
  } catch (error) {
    console.error("Erreur récupération classement :", error);
    res.sendStatus(500);
  }
};

// ADD
const add = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.auth?.isAdmin) {
      res.status(403).json({ message: "Accès interdit" });
      return;
    }

    const parsed = parseAndValidateGameBody(req, res);
    if (!parsed) return;

    const imageFilename = req.file?.filename ?? "";

    const newGame = await gameRepository.create({
      ...parsed,
      images: imageFilename,
    });

    res.status(201).json(newGame);
  } catch (error) {
    console.error("Erreur ajout jeu :", error);
    res.sendStatus(500);
  }
};

// UPDATE
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.auth?.isAdmin) {
      res.status(403).json({ message: "Accès interdit" });
      return;
    }

    const gameId = Number(req.params.id);
    if (Number.isNaN(gameId)) {
      res.status(400).json({ error: "ID de jeu invalide" });
      return;
    }

    const parsed = parseAndValidateGameBody(req, res);
    if (!parsed) return;

    const newImage = req.file?.filename;

    const result = await gameRepository.updateById(gameId, {
      ...parsed,
      newImage,
    });

    if (!result) {
      res.status(404).json({ message: "Jeu non trouvé" });
      return;
    }

    const { updatedRow, oldImage } = result;

    if (oldImage && newImage) {
      const oldPath = path.join(
        __dirname,
        "../../../public/assets/images/games",
        oldImage,
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    res.status(200).json(updatedRow);
  } catch (error) {
    console.error("Erreur modification jeu :", error);
    res.sendStatus(500);
  }
};

// DELETE
const destroy = async (req: Request, res: Response): Promise<void> => {
  const gameId = Number(req.params.id);
  if (Number.isNaN(gameId)) {
    res.status(400).json({ error: "ID de jeu invalide" });
    return;
  }

  try {
    await db.query("DELETE FROM Favorite WHERE id_game = ?", [gameId]);

    const imageFilename = await gameRepository.deleteById(gameId);
    if (!imageFilename) {
      res.status(200).json({ message: "Jeu déjà supprimé." });
      return;
    }

    const imagePath = path.join(
      __dirname,
      "../../../public/assets/images/games",
      imageFilename,
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: "Jeu et image supprimés avec succès" });
  } catch (error) {
    console.error("Erreur suppression jeu :", error);
    res.sendStatus(500);
  }
};

export default {
  browse,
  readRanking,
  add,
  update,
  destroy,
};
