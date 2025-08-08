import type { Request, RequestHandler, Response } from "express";
import favoriteRepository from "./favoriteRepository";

const getAllByUser: RequestHandler = async (req, res) => {
  const userId = Number.parseInt(req.auth.sub, 10);
  if (Number.isNaN(userId)) {
    res.status(400).json({ error: "ID utilisateur invalide" });
    return;
  }

  try {
    const favorites = await favoriteRepository.getAllByUser(userId);
    const ids = favorites.map((fav: { id_game: number }) => fav.id_game);
    res.status(200).json(ids);
  } catch (err) {
    console.error("Erreur getAllByUser:", err);
    res.sendStatus(500);
  }
};
const read: RequestHandler = async (req, res, next) => {
  const id_user = Number(req.auth?.sub);
  if (!id_user) {
    res.status(401).json({ error: "Utilisateur non authentifié" });
    return;
  }
  try {
    const playerFavorite = await favoriteRepository.getFavorite(id_user);
    res.status(200).json(playerFavorite);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res) => {
  const { id_user, id_game } = req.body;
  if (!id_user || !id_game) {
    res.status(400).json({ error: "Champs manquants" });
    return;
  }
  if (id_user !== +req.auth.sub) {
    res.sendStatus(401);
  }
  try {
    await favoriteRepository.add(id_user, id_game);
    res.sendStatus(201);
  } catch (err) {
    console.error("Erreur d'ajouts aux favoris:", err);
    res.sendStatus(500);
  }
};

const remove: RequestHandler = async (req, res) => {
  const userId = Number.parseInt(req.params.userId, 10);
  const gameId = Number.parseInt(req.params.gameId, 10);
  if (Number.isNaN(userId) || Number.isNaN(gameId)) {
    res.status(400).json({ error: "ID(s) invalide(s)" });
    return;
  }

  try {
    await favoriteRepository.remove(userId, gameId);
    res.sendStatus(204);
  } catch (err) {
    console.error("Erreur suppression favori:", err);
    res.sendStatus(500);
  }
};

export default {
  getAllByUser,
  add,
  remove,
  read,
};
