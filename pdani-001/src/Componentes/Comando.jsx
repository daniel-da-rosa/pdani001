/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Comando(selecionado) {


  const selecaoConvertida = selecionado.map((opcao) => {
    switch (opcao) {
      case 'Grupo':
        return 'v_grupo';
      case 'SubGrupo':
        return 'v_subgrupo';
      case 'Classe':
        return 'v_classe';
      case 'Familia':
        return 'v_familia';
      case 'Descrição':
        return 'v_descricao';
      case 'Versão':
        return 'v_detalhes';
      default:
        return '';
    }
  });


  const colunas = selecaoConvertida.filter(opcao => opcao !== '').join("||' '||");

  const comando = `

  declare

  v_empresa   number       := :p_1;
  v_item      varchar2(20) := :p_2;
  v_versao    varchar2(10) := :p_3;
  v_retorno   varchar2(2000);
  v_descricao varchar2(200);
  v_grupo     varchar2(200);
  v_subgrupo  varchar2(200);
  v_classe    varchar2(200);
  v_familia   varchar2(200);
  v_detalhes  varchar2(200);
  
begin
 
  if v_versao is not null then
  
      select 
	         regexp_replace(estgrupo.descricao, '^1 PA - ', ''),
             estclasse.descricao,
             estsubgrupo.descricao,
             estfamilia.descricao,
             estitem.descricao
        into v_grupo,
             v_classe,
             v_subgrupo,
             v_familia,
             v_descricao
        from estitem,
             estsubgrupo,
             estclasse,
             pcpversao, 
             estgrupo,
             estfamilia
       where estitem.empresa = estsubgrupo.empresa
         and estitem.grupo   = estsubgrupo.grupo
         and estitem.subgrupo = estsubgrupo.codigo
         and estitem.empresa  = estclasse.empresa(+)
         and estitem.classe_produto = estclasse.codigo(+)
         and estitem.empresa = pcpversao.empresa
         and estitem.codigo  = pcpversao.produto
         and estgrupo.empresa = estitem.empresa
  	     and estgrupo.codigo = estitem.grupo
         and estgrupo.codigo = estsubgrupo.grupo
         and estitem.empresa = estfamilia.empresa
         and estitem.familia = estfamilia.codigo
         and pcpversao.empresa = v_empresa
         and pcpversao.produto  = v_item
         and pcpversao.versao = v_versao;
		 
  else
  
      select regexp_replace(estgrupo.descricao, '^1 PA - ', ''),
             estclasse.descricao,
             estsubgrupo.descricao,
             estfamilia.descricao,
             estitem.descricao,
             pcpversao.detalhes
        into v_grupo,
             v_classe,
             v_subgrupo,
             v_familia,
             v_descricao,
             v_detalhes
        from estitem,
             estsubgrupo,
             estclasse,
             estgrupo,
             estfamilia,
             pcpversao
       where estitem.empresa  = estsubgrupo.empresa
         and estitem.grupo    = estsubgrupo.grupo
         and estitem.subgrupo = estsubgrupo.codigo
         and estitem.empresa  = estclasse.empresa(+)
         and estitem.classe_produto = estclasse.codigo(+)   
         and estgrupo.empresa = estitem.empresa
  	     and estgrupo.codigo  = estitem.grupo       
         and estitem.empresa  = estfamilia.empresa
         and estitem.familia  = estfamilia.codigo
         and estitem.empresa  = v_empresa
         and estitem.empresa   = pcpversao.empresa
         and estitem.codigo   = pcpversao.produto
         and estitem.codigo   = v_item;
		 
  end if;
  
  v_retorno := ${colunas};
  --dbms_output.put_line(v_retorno);
  
  :p_4 := v_retorno;

  
end;

  `;

  return comando;
}
