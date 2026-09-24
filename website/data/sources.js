/* ==========================================================================
   Fontes do projeto.
   Classes de evidência:
     A = documento oficial primário (clube ou AFL)
     B = registo contemporâneo datável (fotografia, imprensa da época)
     C = testemunho identificado e datado
     D = fonte secundária ou inferência (exige confirmação)
   ========================================================================== */
window.JOVALTO = window.JOVALTO || {};

window.JOVALTO.sources = [
  {
    id: "src-emblema-oficial",
    valor: "Reconstrução digital oficial do emblema (cores planas, fundo transparente)",
    classe: "A",
    fonte: "Logos/logo_actual.png",
    nota: "1128x1394 px; 48,4% da área transparente. Não é vetorial e contém ruído de posterização, pelo que as cores foram medidas por média de família e não copiadas de um pixel.",
    estado: "confirmado"
  },
  {
    id: "src-emblema-original",
    valor: "Fotografia do emblema físico original",
    classe: "A",
    fonte: "Logos/logo_original.jpg",
    nota: "1536x2040 px. Representação física e histórica do emblema. Digitalização sem data nem contexto de origem.",
    estado: "confirmado"
  },
  {
    id: "src-emblema-digitalizado",
    valor: "Digitalização intermédia do emblema",
    classe: "B",
    fonte: "Logos/logo_digitalizado.png",
    nota: "306x378 px. Etapa intermédia (contornos azul-escuros, aspeto de bordado). Não é o entregável oficial e não serve de referência de cor.",
    estado: "confirmado"
  },
  {
    id: "src-criterios",
    valor: "Caderno de critérios de reconstrução do emblema",
    classe: "A",
    fonte: "Logos/Criterios_reconstrucao.png",
    nota: "1230x1278 px. Define fidelidade ao original, cores planas, roda dentada azul, letras G/D/J e entregável em PNG de alta resolução com fundo transparente e versão vetorial.",
    estado: "confirmado"
  },
  {
    id: "src-foto-equipa",
    valor: "Fotografia da equipa com legenda «Equipa Vencedora do Bi-Campeonato»",
    classe: "B",
    fonte: "foto_plantel.jpg",
    nota: "1241x848 px (proporção 1,4634 — a mesma do original de 2912x1988). O clube já forneceu este ficheiro em dois formatos (.avif e .jpg); a versão em uso é a .jpg. Sem data legível.",
    estado: "confirmado"
  },
  {
    id: "src-afl-campeoes",
    valor: "Documento oficial da Associação de Futebol de Lisboa relativo a campeões",
    classe: "A",
    fonte: "AFL_documento_campeoes.pdf",
    nota: "8 páginas. Suporta os títulos de veteranos. O texto NÃO é extraível por máquina (fontes com codificação de subconjunto), pelo que a página exata fica por confirmar.",
    estado: "confirmado"
  },
  {
    id: "src-blog-alberto-helder",
    valor: "Artigo «FUTEBOL - UM EMOTIVO REENCONTRO APÓS 48 ANOS…», 24/01/2024, Alberto Helder",
    classe: "C",
    fonte: "albertohelder.blogspot.com/2024/01/futebol-um-emotivo-reencontro-apos-48.html",
    nota: "Nomeia «o Jovalto (Veteranos)» e indica que José Cruz foi campeão em campeonatos promovidos pela AFL. Corrobora externamente o futebol de veteranos e os títulos em provas da AFL. Não usado para fixar datas.",
    estado: "confirmado"
  },
  {
    id: "src-diretorio-unilocal",
    valor: "Referência de diretório de terceiros (morada proposta)",
    classe: "D",
    fonte: "unilocal.net/portugal/lisbon/grupo-desportivo-jovalto",
    nota: "Indica «R. Freitas Gazul, 17-B, 1350-148 Lisboa». NÃO confirmado pelo clube, pelo que não é publicado no sítio como facto.",
    estado: "por confirmar"
  }
];
