import client from "./client";

export async function favoriteGame() {
  try {
    const response = await client.get("/myfavorites");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
