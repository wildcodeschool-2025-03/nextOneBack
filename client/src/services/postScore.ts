import axios from "axios";

type DataParty = {
  id_game: number;
  score: number;
  date_game: string;
};

export async function postScore(dataParty: DataParty) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/partys`,
      dataParty,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {}
}
