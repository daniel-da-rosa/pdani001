/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Comando({ sequencia, atributos = [] }) {
  console.log("sequencia:", sequencia); // Adicione este console.log para depurar
  const FiltroRegex = /Atrib/;

  const selecaoConvertida = sequencia.map((opcao) => {
    if (FiltroRegex.test(opcao)) {
      const atributoEcontrado = atributos.find(atributo => atributo.abreviacao === opcao);
      return atributoEcontrado ? { atributo: atributoEcontrado.atributo, separador: atributoEcontrado.separador } : '';
    } else {
      switch (opcao) {
        case 'Grupo':
          return "v_grupo||' '||";
        case 'SubGrupo':
          return "v_subgrupo||' '||";
        case 'Classe':
          return "v_classe||' '||";
        case 'Familia':
          return "v_familia||' '||";
        case 'Descrição':
          return "v_descricao||' '||";
        case 'Versão':
          return "v_detalhes||' '||";
        case 'Referência':
          return "v_referencia||' '||";
        default:
          return '';
      }
    }
  });

  console.log("Seleção Convertida:", selecaoConvertida); // Adicione este console.log para depurar

  const colunas = selecaoConvertida.map((opcao) => {
    if (typeof opcao === 'string') {
      return opcao;
    } else if (typeof opcao === 'object' && opcao !== null) {
      const { atributo, separador } = opcao;
      const buscaValorFicha = `nvl((select f_busca_valor_ficha(v_empresa,
                                                        v_item,
                                                        v_versao,
                                                        null,
                                                        ${atributo})||
                                                        '${separador}' 
                                                        from dual),'')||''||`;
      console.log("Busca Valor Ficha:", buscaValorFicha); // Adicione este console.log para depurar
      return buscaValorFicha;
    } else {
      return ''; // Ou qualquer valor padrão que você queira usar para objetos inválidos
    }
  }).join("");

  // Remover os dois últimos pipes || no final da string
  const colunasFiltradas = colunas.replace(/\|\|' '\|\|$/, '').replace(/\|\|$/, '').replace(/xx/gi, '');


  console.log("Colunas Filtradas:", colunasFiltradas); // Adicione este console.log para depurar

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
  v_referencia varchar2(200);

  begin

    if v_versao is not null then

      select regexp_replace(estgrupo.descricao, '^1 PA - ', ''),
             estclasse.descricao,
             estsubgrupo.descricao,
             estfamilia.descricao,
             estitem.descricao,
             pcpversao.detalhes,
             estitem.referencia
        into v_grupo,
             v_classe,
             v_subgrupo,
             v_familia,
             v_descricao,
             v_detalhes,
             v_referencia
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
         and estitem.empresa = estfamilia.empresa(+)
         and estitem.familia = estfamilia.codigo(+)
         and pcpversao.empresa = v_empresa
         and pcpversao.produto  = v_item
         and pcpversao.versao = v_versao;

    else

      select regexp_replace(estgrupo.descricao, '^1 PA - ', ''),
             estclasse.descricao,
             estsubgrupo.descricao,
             estfamilia.descricao,
             estitem.descricao,
             estitem.referencia
        into v_grupo,
             v_classe,
             v_subgrupo,
             v_familia,
             v_descricao,
             v_referencia
        from estitem,
             estsubgrupo,
             estclasse,
             estgrupo,
             estfamilia
       where estitem.empresa  = estsubgrupo.empresa
         and estitem.grupo    = estsubgrupo.grupo
         and estitem.subgrupo = estsubgrupo.codigo
         and estitem.empresa  = estclasse.empresa(+)
         and estitem.classe_produto = estclasse.codigo(+)   
         and estgrupo.empresa = estitem.empresa
         and estgrupo.codigo  = estitem.grupo       
         and estitem.empresa  = estfamilia.empresa(+)
         and estitem.familia  = estfamilia.codigo(+)
         and estitem.empresa  = v_empresa
         and estitem.codigo   = v_item;

    end if;

    select ${colunasFiltradas}
      into v_retorno
      from dual;

    :p_4 := v_retorno;
    --dbms_output.put_line(v_retorno);

  end;
  `;

  return comando;
}
