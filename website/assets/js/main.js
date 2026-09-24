/* ==========================================================================
   GD Jovalto — comportamento e renderização a partir de data/*.js

   Script CLÁSSICO (sem módulos ES) para funcionar em file:// sem servidor.
   Todos os textos são inseridos com textContent — nunca com innerHTML.
   ========================================================================== */
(function () {
  "use strict";

  var JV = window.JOVALTO || {};
  var raiz = "";
  if (document.body && document.body.getAttribute("data-raiz") !== null) {
    raiz = document.body.getAttribute("data-raiz");
  }

  /* --- Utilitários ------------------------------------------------------- */

  function el(tag, opcoes, filhos) {
    var no = document.createElement(tag);
    opcoes = opcoes || {};
    if (opcoes.texto !== undefined) { no.textContent = opcoes.texto; }
    if (opcoes.classe) { no.className = opcoes.classe; }
    if (opcoes.attrs) {
      Object.keys(opcoes.attrs).forEach(function (chave) {
        no.setAttribute(chave, opcoes.attrs[chave]);
      });
    }
    (filhos || []).forEach(function (filho) { if (filho) { no.appendChild(filho); } });
    return no;
  }

  function linhaMeta(item) {
    return el("p", { classe: "meta" }, [
      el("span", { texto: "Fonte:" }),
      el("code", { texto: item.fonte || "sem fonte" }),
      el("span", { texto: "Estado: " + (item.estado || "por confirmar") })
    ]);
  }

  function caminho(relativo) {
    if (!relativo) { return ""; }
    if (/^[a-z][a-z0-9+.-]*:/i.test(relativo)) { return relativo; }
    return raiz + relativo;
  }

  function preencher(id, construir) {
    var alvo = document.getElementById(id);
    if (!alvo) { return; }
    alvo.textContent = "";
    construir(alvo);
  }

  function porId(lista, id) {
    var encontrado = null;
    (lista || []).forEach(function (item) { if (item.id === id) { encontrado = item; } });
    return encontrado;
  }

  /* --- Palmarés: tabela a partir de honours.js --------------------------- */

  function renderPalmares() {
    preencher("lista-palmares", function (alvo) {
      var itens = JV.honours || [];
      if (!itens.length) {
        alvo.appendChild(el("p", { texto: "Sem registos de palmarés." }));
        return;
      }
      var corpo = el("tbody", {}, itens.map(function (item) {
        return el("tr", {}, [
          el("td", { classe: "tabela__epoca", texto: item.epoca || "por datar" }),
          el("td", {}, [
            el("span", { texto: item.valor }),
            linhaMeta(item)
          ])
        ]);
      }));

      var tabela = el("table", { classe: "tabela" }, [
        el("caption", { texto: "Títulos documentados e respetivas fontes." }),
        el("thead", {}, [
          el("tr", {}, [
            el("th", { attrs: { scope: "col" }, texto: "Época" }),
            el("th", { attrs: { scope: "col" }, texto: "Título e proveniência" })
          ])
        ]),
        corpo
      ]);

      alvo.appendChild(el("div", { classe: "rolagem" }, [tabela]));
    });
  }

  /* --- Galeria: figures a partir de gallery.js --------------------------- */

  function renderGaleria() {
    preencher("lista-galeria", function (alvo) {
      var itens = JV.gallery || [];
      if (!itens.length) {
        alvo.appendChild(el("p", { texto: "Sem fotografias com fonte." }));
        return;
      }
      itens.forEach(function (item) {
        var img = el("img", {
          attrs: {
            src: caminho(item.ficheiro),
            alt: "Fotografia: " + (item.titulo || "equipa"),
            width: String(item.largura || ""),
            height: String(item.altura || ""),
            loading: "lazy",
            decoding: "async"
          }
        });
        var ampliacao = el("a", {
          classe: "galeria__ampliar",
          attrs: {
            href: caminho(item.ficheiro),
            target: "_blank",
            rel: "noopener",
            title: "Abrir fotografia em tamanho completo",
            "aria-label": "Abrir " + (item.titulo || "fotografia") + " em tamanho completo"
          }
        }, [img]);
        var conteudoLegenda = [
          el("strong", { texto: item.titulo }),
          el("span", { texto: item.valor }),
          el("span", { classe: "galeria__instrucao", texto: "Clique na fotografia para ampliar." })
        ];
        if (item.identificacao) {
          conteudoLegenda.push(el("div", { classe: "foto-identificacao" }, [
            el("div", {}, [
              el("h3", { texto: "Topo — da esquerda para a direita" }),
              el("ol", {}, (item.identificacao.topo || []).map(function (nome) {
                return el("li", { texto: nome });
              }))
            ]),
            el("div", {}, [
              el("h3", { texto: "Em baixo — da esquerda para a direita" }),
              el("ol", {}, (item.identificacao.baixo || []).map(function (nome) {
                return el("li", { texto: nome });
              }))
            ])
          ]));
          conteudoLegenda.push(el("p", {
            classe: "foto-identificacao__fonte",
            texto: "Identificação fornecida pelo clube. Os lugares assinalados não foram identificados."
          }));
        }
        conteudoLegenda.push(linhaMeta(item));
        var legenda = el("figcaption", {}, conteudoLegenda);
        alvo.appendChild(el("figure", {}, [ampliacao, legenda]));
      });
    });
  }

  /* --- Documentos: cartões a partir de documents.js ---------------------- */

  function renderDocumentos() {
    preencher("lista-documentos", function (alvo) {
      var itens = JV.documents || [];
      if (!itens.length) {
        alvo.appendChild(el("p", { texto: "Sem documentos disponíveis." }));
        return;
      }
      itens.forEach(function (item) {
        alvo.appendChild(el("article", { classe: "cartao cartao--ident" }, [
          el("h3", { texto: item.titulo }),
          el("p", { texto: item.valor }),
          el("p", {}, [
            el("a", {
              texto: "Abrir " + (item.tipo || "ficheiro"),
              attrs: { href: caminho(item.ficheiro) }
            })
          ]),
          linhaMeta(item),
          el("p", { classe: "origem", texto: item.nota })
        ]));
      });
    });
  }

  /* --- Cronologia: lista a partir de timeline.js ------------------------- */

  function renderCronologia() {
    preencher("cronologia", function (alvo) {
      var itens = JV.timeline || [];
      if (!itens.length) {
        alvo.appendChild(el("li", { texto: "Sem marcos registados." }));
        return;
      }
      itens.forEach(function (item) {
        alvo.appendChild(el("li", {}, [
          el("span", { classe: "cronologia__ano", texto: item.ano || "por datar" }),
          el("h3", { texto: item.titulo }),
          el("p", { texto: item.texto }),
          linhaMeta(item)
        ]));
      });
    });
  }

  /* --- Pessoas: cartões a partir de people.js ---------------------------- */

  function renderPessoas() {
    preencher("lista-pessoas", function (alvo) {
      var itens = JV.people || [];
      if (!itens.length) {
        alvo.appendChild(el("p", { texto: "Sem nomes documentados." }));
        return;
      }
      itens.forEach(function (item) {
        alvo.appendChild(el("article", { classe: "cartao" }, [
          el("h3", { texto: item.nome }),
          el("p", { texto: item.valor }),
          linhaMeta(item),
          el("p", { classe: "origem", texto: item.nota })
        ]));
      });
    });
  }

  /* --- Fontes: tabela a partir de sources.js ----------------------------- */

  function renderFontes() {
    preencher("tabela-fontes", function (alvo) {
      var itens = JV.sources || [];
      if (!itens.length) {
        alvo.appendChild(el("p", { texto: "Sem fontes registadas." }));
        return;
      }
      var corpo = el("tbody", {}, itens.map(function (item) {
        return el("tr", {}, [
          el("td", {}, [
            el("span", { texto: item.valor }),
            el("p", { classe: "origem", texto: item.nota })
          ]),
          el("td", {}, [el("code", { texto: item.fonte })])
        ]);
      }));

      var tabela = el("table", { classe: "tabela" }, [
        el("caption", { texto: "Fontes consultadas e respetivas limitações." }),
        el("thead", {}, [
          el("tr", {}, [
            el("th", { attrs: { scope: "col" }, texto: "Fonte" }),
            el("th", { attrs: { scope: "col" }, texto: "Referência" })
          ])
        ]),
        corpo
      ]);

      alvo.appendChild(el("div", { classe: "rolagem" }, [tabela]));
    });
  }

  /* --- Identidade: tabela a partir de clube.js --------------------------- */

  function renderIdentidade() {
    preencher("lista-identidade", function (alvo) {
      var c = JV.clube;
      if (!c) {
        alvo.appendChild(el("p", { texto: "Sem dados de identidade." }));
        return;
      }
      var linhas = [
        ["Nome", c.nome],
        ["Sigla", c.sigla],
        ["Fundação", c.fundacao],
        ["Constituição legal", c.constituicaoLegal],
        ["Modalidade", c.modalidade],
        ["Competição", c.competicao],
        ["Cores do clube", (c.cores || []).join(" e ")],
        ["Localidade", c.localidade]
      ];

      var corpo = el("tbody", {}, linhas.map(function (par) {
        return el("tr", {}, [
          el("th", { attrs: { scope: "row" }, texto: par[0] }),
          el("td", { texto: par[1] })
        ]);
      }));

      var tabela = el("table", { classe: "tabela" }, [
        el("caption", { texto: "Elementos de identidade fornecidos pelo clube." }),
        corpo
      ]);

      alvo.appendChild(el("div", { classe: "rolagem" }, [tabela]));
    });
  }

  /* --- Jogadores: lista a partir de jogadores.js ------------------------- */

  function renderJogadores() {
    preencher("lista-jogadores", function (alvo) {
      var dados = JV.jogadores;
      if (!dados || !dados.nomes || !dados.nomes.length) {
        alvo.appendChild(el("p", { texto: "Sem lista de jogadores." }));
        return;
      }

      var fotografia = dados.fotografia || {};

      var nomes = dados.nomes.slice().sort(function (a, b) {
        return a.localeCompare(b, "pt");
      });

      var contador = document.getElementById("jogadores-total");
      if (contador) { contador.textContent = String(nomes.length); }

      alvo.appendChild(el("ul", { classe: "jogadores" }, nomes.map(function (nome) {
        var item = el("li", {}, [el("span", { texto: nome })]);
        if (fotografia[nome]) {
          item.appendChild(el("a", {
            classe: "aviso-nome",
            texto: "Na fotografia da página inicial: " + fotografia[nome],
            attrs: { href: "../index.html#fotografia-equipa" }
          }));
        }
        return item;
      })));

      var campo = document.getElementById("filtro-jogadores");
      if (campo) {
        campo.addEventListener("input", function () {
          var termo = campo.value.trim().toLowerCase();
          var itens = alvo.querySelectorAll("li");
          Array.prototype.forEach.call(itens, function (li) {
            var corresponde = termo === "" || li.textContent.toLowerCase().indexOf(termo) !== -1;
            li.style.display = corresponde ? "" : "none";
          });
        });
      }
    });
  }

  /* --- Navegação, contadores e arranque --------------------------------- */

  function iniciarNavegacao() {
    var botao = document.querySelector(".nav-toggle");
    var menu = document.getElementById("menu-principal");
    if (!botao || !menu) { return; }
    botao.addEventListener("click", function () {
      var aberto = menu.classList.toggle("is-open");
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
  }

  function escreverAno() {
    var alvo = document.getElementById("ano-atual");
    if (alvo) { alvo.textContent = String(new Date().getFullYear()); }
  }

  function iniciar() {
    renderIdentidade();
    renderJogadores();
    renderPalmares();
    renderGaleria();
    renderDocumentos();
    renderCronologia();
    renderPessoas();
    renderFontes();
    iniciarNavegacao();
    escreverAno();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
