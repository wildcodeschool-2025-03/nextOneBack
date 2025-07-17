import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";
class userRepository {
  async countUser(type: string) {
    if (type === "user") {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT COUNT(id) AS count FROM user WHERE id_role = 1",
      );
      return rows[0];
    }

    if (type === "connected") {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT COUNT(id) AS count FROM user WHERE id_role = 1 AND registration = true",
      );
      return rows[0];
    }

    return null;
  }
}
export default new userRepository();
