import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoginContext } from "../Auth/LoginContext";
import type { Tarif } from "../types/tarifs";
import "../styles/tarifsPage.css";

export default function TarifsPage() {
  const loginContext = useContext(LoginContext);
  const isAdmin = loginContext?.isAdmin ?? false;
  const [tarif, setTarif] = useState<Tarif[]>([]);

  // recupere les tarifs
  const fetchTarifs = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tarifs`,
      );
      setTarif(response.data);
    } catch (error) {
      console.error("erreur lors de la récupération des tarifs");
    }
  }, []);

  // met a jour les tarsifs dans la bdd
  const updateTarif = async (index: number, newPrice: number) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tarifs/${tarif[index].id}`,
        {
          price: newPrice,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error("erreur lors de la mise a jour des tarifs");
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
    } else {
      console.log("prix invalide");
    }
  };

  useEffect(() => {
    fetchTarifs();
  }, [fetchTarifs]);

  return (
    <>
      <div>
        <section className="tarifs-section">
          <div className="tarifs-header">
            <span className="line" />
            <h2 className="tarifs-title">TARIFS</h2>
            <span className="line" />
          </div>
          <div className="tarifs-grid">
            {tarif.map((t, index) => (
              <div key={t.id} className="tarif-block">
                <div>
                  <input
                    type="text"
                    value={t.price}
                    onChange={(e) => changeTarif(index, e.target.value)}
                    className="tarif-input"
                    disabled={!isAdmin}
                  />
                  <span className="euro-symbole">€</span>
                </div>
                <div className="title">{t.title}</div>
                <div className="subtitle">{t.subtitle}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="tarifs-description">
          <h3 className="description-tarifs">Description des tarifs</h3>
          <p className="price-description">
            . <span className="price-decoration">Tarif 1</span> : FREEPLAY 1
            JOUR , valable à la journée uniquement
          </p>
          <p className="price-description">
            . <span className="price-decoration">Tarif 2</span> : WEEK-END 2
            jours , valable pour deux jours (samedi et dimanche)
          </p>
          <p className="price-description">
            . <span className="price-decoration">Tarif 3</span> : FAMILLE ,
            s'applique pour un groupe de 4 personnes, dont deux enfants de moins
            de 14 ans et un adulte. Puis 5€ par personne supplémentaire.
          </p>
          <p className="price-description">
            . <span className="price-decoration">Tarif 4</span> : CONCOURS ET
            EVENEMENTS , tarifs valable pour les soirées et évenements
            exceptionnels
          </p>
        </section>
      </div>
    </>
  );
}
