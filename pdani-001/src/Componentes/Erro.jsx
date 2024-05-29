import React from 'react'

export default function Erro() {
  return (
    <div role="alert" className="flex flex-col items-center">
        <div className="w-1/4 bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Atenção!
        </div>
        <div className="w-1/4 border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Você precisa selecionar pelos menos uma opção de descrição!</p>
  </div>
</div>
  )
}
