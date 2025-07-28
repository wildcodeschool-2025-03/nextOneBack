import client from "./client";

export async function deleteAccount() {
  try {
    const response = await client.delete("/connexion/profile");
    return response.data;
  } catch {
    return null;
  }
}
