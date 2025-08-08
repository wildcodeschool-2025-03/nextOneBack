import type { RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Party = {
  id: number;
  id_user: number;
  id_game: number;
  score: number;
  date_game: string;
};
class PartyRepository {
  // The C of CRUD - Create operation
  async create(party: Omit<Party, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO party (id_user, id_game, score, date_game) values (?, ?, ?, ?)",
      [party.id_user, party.id_game, party.score, party.date_game],
    );
    return result.insertId;
  }
  // The Rs of CRUD - Read operations
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM party WHERE id = ?",
      [id],
    );
    return rows[0] as Party;
  }
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM party");
    return rows as Party[];
  }
  // READ – Top 3 des scores pour un jeu
  async findTopRankingByGameId(
    gameId: number,
  ): Promise<{ username: string; score: number }[]> {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      `
            SELECT u.pseudo AS username, p.score
            FROM Party p
                     INNER JOIN User u ON p.id_user = u.id
            WHERE p.id_game = ?
            ORDER BY p.score DESC
            LIMIT 3
        `,
      [gameId],
    );

    return rows as { username: string; score: number }[];
  }

  // READ – meilleur score par jeu
  async topScore(gameId: number, userId: number) {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      `
            SELECT score
FROM Party p
WHERE id_game = ? AND id_user = ?
ORDER BY p.score DESC
LIMIT 1;
        `,
      [gameId, userId],
    );

    return rows[0];
  }
}
export default new PartyRepository();
