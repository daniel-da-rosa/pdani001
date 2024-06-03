/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function BuscaValorFicha({ onAtributosChange }) {
  const [atributo, setAtributo] = useState('');
  const [separador, setSeparador] = useState('');
  const [atributos, setAtributos] = useState([]);

  function addAtributo() {
    const abreviacao = `Atrib${atributo}${separador}`;
    const novoAtributo = { atributo, separador, abreviacao };
    setAtributos([...atributos, novoAtributo]);
    onAtributosChange(novoAtributo);
    setAtributo('');
    setSeparador('');
  }

  return (
    <div className="flex items-center justify-center w-1/2 shadow-sm rounded m-5 p-5 bg-gray-300 rounded-b-lg">
      <input
        type="text" // Alterado para input de texto
        value={atributo}
        onChange={(e) => setAtributo(e.target.value)}
        placeholder="Atributo"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5" // Ajustado o tamanho
      />
      <input // Novo input para o separador
        type="text"
        value={separador}
        onChange={(e) => setSeparador(e.target.value)}
        placeholder="Separador"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 ml-2 p-2.5" // Ajustado o tamanho
      />
      <button
        type="button"
        onClick={addAtributo}
        className="ml-2 bg-blue-950 text-white p-2 rounded hover:bg-blue-900"
      >
        Atributo
      </button>
    </div>
  );
}
