import { useContext } from "react";
import { AuthContext } from "../Auth/LoginContext";
import useTarifs from "../components/Tarifs/Tarifs";
import "../styles/tarifsPage.css";

export default function TarifsPage() {
  const context = useContext(AuthContext);
  const isAdmin = context?.isAdmin ?? false;
  const { tarif, changeTarif } = useTarifs();

  return (
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
          . <span className="price-decoration">Tarif 1</span> : FREEPLAY 1 JOUR,
          valable à la journée uniquement
        </p>
        <p className="price-description">
          . <span className="price-decoration">Tarif 2</span> : WEEK-END 2
          jours, valable pour deux jours (samedi et dimanche)
        </p>
        <p className="price-description">
          . <span className="price-decoration">Tarif 3</span> : FAMILLE,
          s'applique pour un groupe de 4 personnes, dont deux enfants de moins
          de 14 ans et un adulte. Puis 5€ par personne supplémentaire.
        </p>
        <p className="price-description">
          . <span className="price-decoration">Tarif 4</span> : CONCOURS ET
          ÉVÉNEMENTS, tarifs valables pour les soirées et événements
          exceptionnels
        </p>
      </section>
    </div>
  );
}
