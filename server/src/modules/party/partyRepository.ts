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
}
export default new PartyRepository();
