import React, { useState, useEffect } from "react";

import { BarreRecherche } from "./composants/molecules/BarreRecherche";
import { CarteProjet } from "./composants/molecules/CarteProjet";

// Templates & Pages
const PageProjetJPO = () => {
  const [donnees, definirDonnees] = useState([]);
  const [filtre, definirFiltre] = useState("");
  const [enChargement, definirEnChargement] = useState(true);
  const [erreur, definirErreur] = useState(null);
  
  
  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/10M2wjchky-Vq7Ivl70dbODdfavX97q5ukuk65-UnvFM/gviz/tq?tqx=out:json&sheet=0"
    )
      .then((reponse) => reponse.text())
      .then((donnees) => {
        const json = JSON.parse(donnees.substr(47).slice(0, -2));
        const data = json.table.rows.map((ligne) => {
          const enregistrement = {};
          ligne.c.forEach((cellule, i) => {
            enregistrement[json.table.cols[i].label] = cellule
              ? cellule.v
              : null;
          });
          return enregistrement;
        });
        definirDonnees(data);
        definirEnChargement(false);
      })
      .catch((erreur) => {
        console.error("Erreur:", erreur);
        definirErreur(erreur);
        definirEnChargement(false);
      });
  }, []);

  const projetsFiltres = donnees.filter((enregistrement) =>
    enregistrement.Nom.toLowerCase().includes(filtre.toLowerCase())
  );

  if (enChargement)
    return <div className="text-white">Chargement en cours...</div>;
  if (erreur)
    return (
      <div className="text-red-500">Erreur lors du chargement des données</div>
    );

  return (
    // j’aimerais une recherche par mots clés sur les projets en dynamique


    <div className="bg-gradient-to-r from-black to-gray-900 p-10 min-h-screen">
      <BarreRecherche surRecherche={(valeur) => definirFiltre(valeur)} />
      {projetsFiltres.map((enregistrement, index) => (
        <CarteProjet
          key={index}
          image={enregistrement["Image 1"]}
          nom={enregistrement.Nom}
          description={enregistrement.Description}
          ressources={enregistrement.Ressources}
        />
      ))}
    </div>
  );
};

export default PageProjetJPO;
