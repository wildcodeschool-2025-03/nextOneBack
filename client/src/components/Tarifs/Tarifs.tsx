import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Tarif } from "../../types/tarifs";

let request: ReturnType<typeof setTimeout>;

export default function useTarifs() {
  const [tarif, setTarif] = useState<Tarif[]>([]);

  // recupere les tarifs
  const fetchTarifs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tarifs`,
      );
      setTarif(response.data);
    } catch (error) {
      toast.error("erreur lors de la récupération des tarifs");
    }
  }, []);

  // met a jour les tarifs dans la bdd
  const updateTarif = async (index: number, newPrice: number) => {
    try {
      if (request) {
        clearTimeout(request);
      }
      request = setTimeout(async () => {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/tarifs/${tarif[index].id}`,
          {
            price: newPrice,
          },
          {
            withCredentials: true,
          },
        );
      }, 100);
    } catch (error) {
      toast.error("erreur lors de la mise a jour du tarif");
      fetchTarifs();
    }
  };

  // modification du tarif
  const changeTarif = async (index: number, value: string) => {
    const updatePrice = Number.parseFloat(value);
    if (!Number.isNaN(updatePrice) && updatePrice >= 0) {
      const update = [...tarif];
      update[index].price = updatePrice;
      setTarif(update);
      await updateTarif(index, updatePrice);
    } else if (value !== "") {
      toast.error("prix invalide");
    }
  };

  useEffect(() => {
    fetchTarifs();
  }, [fetchTarifs]);

  return {
    tarif,
    changeTarif,
    fetchTarifs,
  };
}
