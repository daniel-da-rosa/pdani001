/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Comando from './Comando'; // Importe o componente Comando
import TextArea from './TextArea';
import Erro from './Erro';
import BuscaValorFicha from './BuscaValorFicha';

export default function SelectOpcao() {
  const opcoes = ['Grupo', 'SubGrupo', 'Classe', 'Familia', 'Descrição', 'Versão'];
  const [selecionado, setSelecionado] = useState('');
  const [sequencia, setSequencia] = useState([]);
  const [comandoSql, setComandoSQL] = useState('');
  const [mostrarErro, setMostrarErro] = useState(false); // Adicione o estado para mostrar o erro
  const [atributos,setAtributos] = useState([]); //guarda o estado de atributos, funçao de callback

  const handleSelectChange = (event) => {
    setSelecionado(event.target.value);
  };

  const handleAtributoChange = (newAtributo) => {
    // Atualiza o estado de atributos
    setAtributos((prevAtributos) => [...prevAtributos, newAtributo]);

    // Adiciona apenas o valor do novo atributo à sequência
    const novaSequencia = [...sequencia, newAtributo.abreviacao];
    setSequencia(novaSequencia);
    console.log("Sequencia:", novaSequencia); // Adiciona este console.log para depurar
}

  const adicionarOpcao = () => {
    if (selecionado && !sequencia.includes(selecionado)) {
      const novaSequencia = [...sequencia, selecionado];
      setSequencia(novaSequencia);
      setSelecionado('');
    }
  };

  const getDisponiveis = () => {
    return opcoes.filter(opcao => !sequencia.includes(opcao));
  };

  const handleGerarComando = () => {
    if (sequencia.length === 0) {
      setMostrarErro(true);
    } else {
      setMostrarErro(false);
      console.log("Atributos antes de gerar comando:", atributos);
      const comandoGerado = Comando({ sequencia, atributos });
      setComandoSQL(comandoGerado);
    }
  };
  

  return (
    <>
    {mostrarErro && <Erro></Erro>} {/* Renderiza o componente Erro se mostrarErro for true */}
    <form className="flex flex-col  
                     items-center 
                     justify-center
                    ">

      <div className="flex items-center 
                      justify-center 
                      w-1/2 
                      shadow-sm 
                      rounded 
                      m-5 
                      p-5 
                      bg-gray-300 
                      rounded-b-lg
                    ">

        <select
          className="bg-gray-50 
                       border 
                       border-gray-300 
                       text-gray-900 
                       text-sm 
                       rounded-lg 
                       focus:ring-blue-500 
                       focus:border-blue-500 
                       block 
                       w-2/3 
                       p-2.5
                      "
          value={selecionado}
          onChange={handleSelectChange}
        >
          <option value="">Selecione</option>
          {getDisponiveis().map(opcao => (
            <option key={opcao} 
                  value={opcao}>{opcao}
            </option>
          ))}
        </select>
        
        <button 
          type="button"
          className="ml-2 
                   bg-blue-950 
                   text-white 
                   p-2 rounded 
                   hover:bg-blue-900"
          onClick={adicionarOpcao}
        >
          Adicionar
        </button>
      </div>
      <BuscaValorFicha onAtributosChange={handleAtributoChange}/>
      <input
        type="text"
        className="mt-4 
                   p-2 border 
                   border-gray-300 
                   rounded-lg 
                   bg-gray-100 
                   w-1/2"
        value={sequencia.join('  ')}
        readOnly
      />
      <button 
        type="button"
        className="w-1/3 
                bg-blue-950 
                text-white p-3 
                rounded-lg 
                hover:bg-blue-900 
                mt-4"
        onClick={handleGerarComando}
      >
        Gerar comando
      </button>
    </form>
    <TextArea comandoSQL={comandoSql}></TextArea>
    </>
  );
}
