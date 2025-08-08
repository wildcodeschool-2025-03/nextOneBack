import type { RowDataPacket } from "mysql2";
import db from "../../../database/client";

const getAllByUser = async (userId: number): Promise<{ id_game: number }[]> => {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT id_game FROM favorite WHERE id_user = ?",
    [userId],
  );
  return rows as { id_game: number }[];
};

const add = async (userId: number, gameId: number) => {
  const [result] = await db.query(
    "INSERT INTO favorite (id_user, id_game) VALUES (?, ?)",
    [userId, gameId],
  );
  return result;
};

const remove = async (userId: number, gameId: number) => {
  const [result] = await db.query(
    "DELETE FROM favorite WHERE id_user = ? AND id_game = ?",
    [userId, gameId],
  );
  return result;
};

const getFavorite = async (userId: number) => {
  const [rows] = await db.query(
    `
      SELECT 
        g.id AS game_id,
        g.name,
        g.description,
        g.images
      FROM Favorite f
      JOIN Game g ON f.id_game = g.id
      WHERE f.id_user = ?
      `,
    [userId],
  );
  return rows;
};
export default {
  getAllByUser,
  add,
  remove,
  getFavorite,
};
