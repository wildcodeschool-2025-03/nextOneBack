import { useEffect, useState } from "react";
import "../styles/tarifsPage.css";

export default function TarifsPage() {
  const arrayTarifs = ["", "", "", ""];
  const labels = [
    { id: 0, title: "FREEPLAY", subtitle: "1 jour" },
    { id: 1, title: "WEEK-END", subtitle: "2 jours" },
    { id: 2, title: "FAMILLE", subtitle: "" },
    { id: 3, title: "CONCOURS / EVENEMENTS", subtitle: "" },
  ];

  const [tarif, setTarif] = useState<string[]>(() => {
    const save = localStorage.getItem("tarifs");
    return save ? JSON.parse(save) : arrayTarifs;
  });

  useEffect(() => {
    localStorage.setItem("tarifs", JSON.stringify(tarif));
  }, [tarif]);

  const changeTarif = (index: number, value: string) => {
    const update = [...tarif];
    update[index] = value;
    setTarif(update);
  };

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
            {labels.map((label) => (
              <div key={label.id} className="tarif-block">
                <div>
                  <input
                    type="text"
                    value={tarif[label.id]}
                    onChange={(e) => changeTarif(label.id, e.target.value)}
                    className="tarif-input"
                  />
                </div>
                <div className="title">{label.title}</div>
                <div className="subtitle">{label.subtitle}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="tarifs-description">
          <h3 className="description-tarifs">Description des tarifs</h3>
          <p className="price-description">
            . Tarif 1 : FREEPLAY 1 JOUR , valable à la journée uniquement
          </p>
          <p className="price-description">
            . Tarif 2 : WEEK-END 2 jours , valable pour deux jours (samedi et
            dimanche)
          </p>
          <p className="price-description">
            . Tarif 3 : FAMILLE , s'applique pour un groupe de 4 personnes, dont
            deux enfants de moins de 14 ans et un adulte. Puis 5€ par personne
            supplémentaire.
          </p>
          <p className="price-description">
            . Tarif 4 : CONCOURS ET EVENEMENTS , tarifs valable pour les soirées
            et évenements exceptionnels
          </p>
        </section>
      </div>
    </>
  );
}
