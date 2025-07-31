import type { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../../database/client";

export type GameInsert = {
  name: string;
  description: string;
  category: string;
  available_online: number;
  available_maintenance: number;
  images: string;
};

export type GameRow = {
  id: number;
  name: string;
  description: string;
  category: string;
  available_online: number;
  available_maintenance: number;
  images: string;
};

// BROWSE – Lire tous les jeux
const findAll = async (): Promise<GameRow[]> => {
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM Game");
  return rows as GameRow[];
};

// ADD – Créer un nouveau jeu
const create = async (game: GameInsert): Promise<GameRow> => {
  const {
    name,
    description,
    category,
    available_online,
    available_maintenance,
    images,
  } = game;

  const [result] = await db.query<ResultSetHeader>(
    `
            INSERT INTO Game (name, description, category, available_online, available_maintenance, images)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
    [
      name,
      description,
      category,
      available_online,
      available_maintenance,
      images,
    ],
  );

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM Game WHERE id = ?",
    [result.insertId],
  );

  return rows[0] as GameRow;
};

// EDIT – Mettre à jour un jeu existant
const updateById = async (
  gameId: number,
  data: {
    name?: string;
    description?: string;
    category?: string;
    available_online?: number;
    available_maintenance?: number;
    newImage?: string;
  },
): Promise<null | { updatedRow: GameRow; oldImage?: string }> => {
  const [existingRows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM Game WHERE id = ?",
    [gameId],
  );

  if (!existingRows.length) return null;

  const current = existingRows[0] as GameRow;

  const updated = {
    name: data.name ?? current.name,
    description: data.description ?? current.description,
    category: data.category ?? current.category,
    available_online: data.available_online ?? current.available_online,
    available_maintenance:
      data.available_maintenance ?? current.available_maintenance,
    images: data.newImage ?? current.images,
  };

  await db.query(
    `
            UPDATE Game
            SET name = ?, description = ?, category = ?, available_online = ?, available_maintenance = ?, images = ?
            WHERE id = ?
        `,
    [
      updated.name,
      updated.description,
      updated.category,
      updated.available_online,
      updated.available_maintenance,
      updated.images,
      gameId,
    ],
  );

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM Game WHERE id = ?",
    [gameId],
  );

  return {
    updatedRow: rows[0] as GameRow,
    oldImage: data.newImage ? current.images : undefined,
  };
};

// DELETE – Supprimer un jeu (et renvoyer l'image à supprimer)
const deleteById = async (gameId: number): Promise<string | null> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT images FROM Game WHERE id = ?",
    [gameId],
  );

  if (!rows.length) return null;

  const filename = rows[0].images;

  await db.query("DELETE FROM Game WHERE id = ?", [gameId]);

  return filename;
};

export default {
  findAll,
  create,
  updateById,
  deleteById,
};
