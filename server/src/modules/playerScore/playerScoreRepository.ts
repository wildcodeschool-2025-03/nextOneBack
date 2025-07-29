import db from "../../../database/client";

class playerScoreRepository {
  async read(userId: number) {
    const [rows] = await db.query(
      " SELECT p.id AS party_id, g.name AS game_name, p.score, p.date_game FROM Party p JOIN Game g ON p.id_game = g.id WHERE p.id_user = ? ORDER BY p.date_game DESC",
      [userId],
    );
    return rows;
  }
}
export default new playerScoreRepository();
