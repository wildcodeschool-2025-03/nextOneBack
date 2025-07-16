import db from "../../../database/client";


const findAll = async () => {
    const [rows] = await db.query("SELECT * FROM Game");
    return rows;
};

const findTopRankingByGameId = async (gameId: number) => {
    const [rows] = await db.query(
        `SELECT u.pseudo AS username, p.score
     FROM Party p
     JOIN User u ON p.id_user = u.id
     WHERE p.id_game = ?
     ORDER BY p.score DESC
     LIMIT 3`,
        [gameId]
    );
    return rows;
};

export default {
    findAll,
    findTopRankingByGameId,
};
