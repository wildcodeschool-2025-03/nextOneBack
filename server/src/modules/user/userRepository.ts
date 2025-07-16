import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
class userRepository {
  async countUser() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT COUNT(id) AS count FROM user WHERE id_role",
    );
    return rows[0];
  }
}
export default new userRepository();
