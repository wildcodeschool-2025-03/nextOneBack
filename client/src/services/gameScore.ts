import client from "./client";

export async function gameScore(gameId: number) {
  try {
    const response = await client.get(`/games/${gameId}/party`);
    return response.data;
  } catch (error) {}
}
