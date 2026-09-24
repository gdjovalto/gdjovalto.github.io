/* ==========================================================================
   Galeria.
   Existe UMA única fotografia histórica com fonte. Não se inventam mais.
   Os caminhos são relativos à raiz do projeto; o main.js acrescenta o prefixo
   definido em <body data-raiz="...">.
   ========================================================================== */
window.JOVALTO = window.JOVALTO || {};

window.JOVALTO.gallery = [
  {
    id: "g-equipa-bicampeonato",
    titulo: "Equipa Vencedora do Bi-Campeonato",
    ficheiro: "assets/img/foto-equipa-bicampeonato.jpg",
    original: "foto_plantel.jpg",
    largura: 1241,
    altura: 848,
    valor: "Fotografia da equipa de veteranos campeã, com a designação «Bi-Campeonato».",
    identificacao: {
      topo: [
        "Alberto Jorge Antunes (guarda-redes)",
        "José Maria Seixo",
        "Joaquim Álvaro Sampaio Lourenço",
        "Jorge Luís Costa Silva",
        "Mário da Costa Ventura",
        "Não identificado",
        "Não identificado",
        "Rogério Fernando Silva Faroia",
        "José António Almeida Cruz, também conhecido como José Cruz (guarda-redes)",
        "Rogério, alcunha «Castanheira» (roupeiro)"
      ],
      baixo: [
        "José Manuel Fernandes Gonçalves",
        "Não identificado",
        "Vasco Manuel Peça Leitão",
        "Não identificado",
        "Não identificado",
        "Não identificado",
        "Álvaro Amaral Antunes",
        "Não identificado"
      ]
    },
    classe: "B",
    fonte: "foto_plantel.jpg",
    nota: "Única fotografia histórica disponível. Não tem data legível. A identificação das pessoas e respetivas posições na fotografia foi fornecida pelo clube em 2026; duas pessoas no topo e quatro em baixo continuam por identificar. A designação «Bi-Campeonato» sugere os títulos consecutivos de 1988/89 e 1989/90 (inferência, classe D, por confirmar).",
    estado: "confirmado"
  }
];
