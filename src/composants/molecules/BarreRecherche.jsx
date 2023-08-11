import React, { useState } from "react";
import Bouton from "../atomes/bouton";
import Saisie from "../atomes/saisie";

export const BarreRecherche = ({ surRecherche }) => {
  const [valeur, definirValeur] = useState("Maths");

  return (
    <div className="flex items-center space-x-2">
      <Saisie 
        onChange={(e) => definirValeur(e.target.value)} 
        valeur={valeur}
        placeholder="taper votre recherche"
        aria-label="Champ de recherche"
      />
      <Bouton surClic={() => surRecherche(valeur)}>Rechercher</Bouton>
    </div>
  );
};

