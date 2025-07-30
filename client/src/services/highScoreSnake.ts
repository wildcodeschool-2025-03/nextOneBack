import client from "./client";

export async function highScoreSnake() {
  try {
    const response = await client.get("/highscore-snake");
    return response.data;
  } catch (error) {}
}
