import React, { useState, useEffect } from "react";

// ... (Composants Atomes, Molécules et Organismes restent les mêmes)
// Atomes
const Bouton = ({ surClic, enfants }) => (
  <button
    onClick={surClic}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
  >
    {enfants}
  </button>
);

const Saisie = ({ surChangement, valeur }) => (
  <input
    onChange={surChangement}
    value={valeur}
    className="border p-2 rounded"
  />
);

// Molécules
const BarreRecherche = ({ surRecherche }) => {
  const [valeur, definirValeur] = useState("");

  return (
    <div className="flex items-center space-x-2">
      <Saisie onChange={(e) => definirValeur(e.target.value)} valeur={valeur} />
      <Bouton surClic={() => surRecherche(valeur)}>Rechercher</Bouton>
    </div>
  );
};

// Organismes
const CarteProjet = ({ image, nom, description, ressources }) => (
  <div className="bg-gray-800 p-6 m-4 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
    <img
      src={image}
      alt={nom}
      className="w-full h-64 object-cover rounded-t-xl"
    />
    <h2 className="text-2xl text-red-500 mt-4">{nom}</h2>
    <p className="text-gray-300 mt-2">{description}</p>
    <Bouton surClic={() => window.open(ressources)}>Plus d'infos</Bouton>
  </div>
);

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
