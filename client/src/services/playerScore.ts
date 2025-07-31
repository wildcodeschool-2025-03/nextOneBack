import client from "./client";

export async function playerScore() {
  try {
    const response = await client.get("/playerScored");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
