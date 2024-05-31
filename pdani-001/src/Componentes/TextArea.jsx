/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';
import ClipboardJS from 'clipboard';

export default function TextArea({ comandoSQL }) {
  console.log('*',comandoSQL);
  const textAreaRef = useRef(null);
  const clipboard = useRef(null);
  const comandoGeradoNotNull = comandoSQL.trim() !== '';

  useEffect(() => {
    clipboard.current = new ClipboardJS('.copy-button', {
      text: () => document.getElementById('comando').innerText
    });

    clipboard.current.on('success', () => {
      console.log('Copiado com sucesso!');
    });

    return () => {
      if (clipboard.current) {
        clipboard.current.destroy();
      }
    };
  }, []);

  // Use o estado comandoSQL para exibir o comando SQL dentro do elemento <code>
  return (
    <div className="flex flex-col items-center justify-center h-[400px]">
      <pre className="mt-4 p-2 bg-gray-200 rounded-md overflow-auto">
        <code id="comando">{comandoSQL}</code>
      </pre>
      {comandoGeradoNotNull &&(
        <button
          className="hover:bg-blue-800 bg-blue-950 text-white font-bold py-2 px-4 rounded mt-4 copy-button"
        >
          Copiar SQL
        </button>
      
      )}
     
    </div>
  );
}