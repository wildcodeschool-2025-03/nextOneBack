import axios from "axios";
import { toast } from "react-toastify";

type DataParty = {
  id_game: number;
  score: number;
  date_game: string;
};

export async function postScore(dataParty: DataParty) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("utilisateur non connecté ❌");
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/partys`,
      dataParty,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {}
}
