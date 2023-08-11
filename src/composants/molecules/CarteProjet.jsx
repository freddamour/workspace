import React from "react";
import Bouton from "../atomes/bouton";

// Organismes
export const CarteProjet = ({ image, nom, description, ressources }) => (
  <div className="bg-gray-800 p-6 m-4 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
    <img
      src={image}
      alt={nom}
      className="w-full h-64 object-cover rounded-t-xl" />
    <h2 className="text-2xl text-red-500 mt-4">{nom}</h2>
    <p className="text-gray-300 mt-2">{description}</p>
    <Bouton surClic={() => window.open(ressources)}>Plus d'infos</Bouton>
  </div>
);
