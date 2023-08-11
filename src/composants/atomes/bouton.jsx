import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'



const Bouton = ({ surClic, enfants }) => (
  <button
    onClick={surClic}
    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
  >
    {enfants}
    <FontAwesomeIcon icon={faCoffee} />
  </button>
);

export default Bouton;
