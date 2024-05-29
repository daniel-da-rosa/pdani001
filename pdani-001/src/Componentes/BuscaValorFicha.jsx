import React from 'react'

export default function BuscaValorFicha({atributo,separador}) {
    const separadorCompleto = separador ? `||'${separador}'||` : '';
  return (
    
    `f_busca_valor_ficha(v_empresa,v_item,v_versao,null,${atributo})${separadorCompleto}`
  )
}
