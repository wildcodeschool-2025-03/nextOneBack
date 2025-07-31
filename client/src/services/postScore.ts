import client from "./client";

type DataParty = {
  id_game: number;
  score: number;
  date_game: string;
};

export async function postScore(dataParty: DataParty) {
  try {
    const response = await client.post("/partys", dataParty);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
