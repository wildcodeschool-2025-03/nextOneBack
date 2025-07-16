import type { RequestHandler } from "express";
import { getTarifs, updateTarif } from "./tarifsRepository";

export const tarifsActions: { browse: RequestHandler; update: RequestHandler } =
  {
    // on recupere les tarifs
    async browse(req, res) {
      try {
        const tarifs = await getTarifs();
        res.status(200).json(tarifs);
      } catch (err) {
        res
          .status(500)
          .json({ err: "erreur lors de la recuperation des tarifs" });
      }
    },

    // mettre a jour les tarifs
    async update(req, res) {
      const tarifId = req.params.id;
      const newPrice = req.body.price;
      try {
        const updatedTarif = await updateTarif(
          Number.parseInt(tarifId),
          newPrice,
        );
        if (!updatedTarif) {
          res.status(404).json({ message: "tarif non trouvé" });
          return;
        }
        res.status(200).json(updatedTarif);
      } catch (err) {
        res.status(500).json({ message: "erreur lors de la mise a jour" });
      }
    },
  };
