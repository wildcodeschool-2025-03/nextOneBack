import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
class userRepository {
  async countUser(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(id) AS count FROM user WHERE id_role = 1",
      [],
    );
    return rows[0];
  }
}
export default new userRepository();
