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
      el("span", { texto: "Fonte: " + (item.fonte || "Informação por confirmar") }),
      el("span", { texto: "Tipo: " + (item.tipoFonte || "Informação por confirmar") }),
      el("span", { texto: "Estado: " + (item.estado || "Por confirmar") })
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
            item.destaque ? el("p", { classe: "estado", texto: item.destaque }) : null,
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
            title: "Abrir fotografia em tamanho completo",
            "aria-label": "Abrir " + (item.titulo || "fotografia") + " em tamanho completo"
          }
        }, [img]);
        var fechar = el("button", {
          classe: "galeria__fechar",
          texto: "Fechar",
          attrs: { type: "button", "aria-label": "Fechar fotografia ampliada" }
        });
        var dialogo = el("dialog", {
          classe: "galeria__dialogo",
          attrs: { "aria-label": (item.titulo || "Fotografia") + " ampliada" }
        }, [
          fechar,
          el("img", {
            attrs: {
              src: caminho(item.ficheiro),
              alt: "Fotografia ampliada: " + (item.titulo || "equipa"),
              width: String(item.largura || ""),
              height: String(item.altura || "")
            }
          })
        ]);
        ampliacao.addEventListener("click", function (evento) {
          if (typeof dialogo.showModal === "function") {
            evento.preventDefault();
            dialogo.showModal();
          }
        });
        fechar.addEventListener("click", function () { dialogo.close(); });
        dialogo.addEventListener("click", function (evento) {
          if (evento.target === dialogo) { dialogo.close(); }
        });
        dialogo.addEventListener("close", function () { ampliacao.focus(); });
        var conteudoLegenda = [
          el("strong", { texto: item.titulo }),
          el("span", { texto: item.valor }),
          el("span", { classe: "galeria__instrucao", texto: "Clique na fotografia para ampliar." })
        ];
        if (item.contexto) { conteudoLegenda.push(el("p", { texto: item.contexto })); }
        if (item.equipamento) { conteudoLegenda.push(el("p", { texto: item.equipamento })); }
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
            texto: "Identificação fornecida pelo arquivo do GD Jovalto. Os lugares assinalados não foram identificados."
          }));
        }
        conteudoLegenda.push(linhaMeta(item));
        var legenda = el("figcaption", {}, conteudoLegenda);
        alvo.appendChild(el("figure", {}, [ampliacao, legenda, dialogo]));
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
        var detalhado = Boolean(item.transcricao && item.imagem !== false);
        var conteudo = [
          el("p", { classe: "categoria", texto: item.categoria }),
          el("h3", { texto: item.titulo }),
          el("p", { texto: item.valor })
        ];

        if (detalhado) {
          conteudo.push(el("dl", { classe: "documento-detalhes" }, [
            el("dt", { texto: "Autor" }), el("dd", { texto: item.autor }),
            el("dt", { texto: "Data" }), el("dd", { texto: item.data }),
            el("dt", { texto: "Tipo de fonte" }), el("dd", { texto: item.fonte + " — " + item.tipoFonte })
          ]));

          var ligacaoDocumento = el("a", {
            texto: "Abrir imagem do documento original →",
            attrs: {
              href: caminho(item.ficheiro),
              "aria-label": "Abrir a imagem do manuscrito original em tamanho completo"
            }
          });
          var fecharDocumento = el("button", {
            classe: "galeria__fechar",
            texto: "Fechar",
            attrs: { type: "button", "aria-label": "Fechar imagem do documento" }
          });
          var dialogoDocumento = el("dialog", {
            classe: "galeria__dialogo",
            attrs: { "aria-label": item.titulo + " ampliado" }
          }, [
            fecharDocumento,
            el("img", { attrs: {
              src: caminho(item.ficheiro),
              alt: item.alt,
              width: String(item.largura || ""),
              height: String(item.altura || "")
            }})
          ]);
          ligacaoDocumento.addEventListener("click", function (evento) {
            if (typeof dialogoDocumento.showModal === "function") {
              evento.preventDefault();
              dialogoDocumento.showModal();
            }
          });
          fecharDocumento.addEventListener("click", function () { dialogoDocumento.close(); });
          dialogoDocumento.addEventListener("click", function (evento) {
            if (evento.target === dialogoDocumento) { dialogoDocumento.close(); }
          });
          dialogoDocumento.addEventListener("close", function () { ligacaoDocumento.focus(); });
          conteudo.push(el("p", {}, [ligacaoDocumento]));
          conteudo.push(dialogoDocumento);

          conteudo.push(el("section", { classe: "transcricao", attrs: { "aria-label": "Transcrição" } }, [
            el("h4", { texto: "Transcrição" }),
            el("p", { classe: "transcricao__nota", texto: item.notaTranscricao }),
            el("div", {}, item.transcricao.map(function (paragrafo) {
              return el("p", { classe: "transcricao__texto", texto: paragrafo });
            }))
          ]));
        } else {
          conteudo.push(el("p", {}, [el("a", {
            texto: "Abrir " + (item.tipo || "ficheiro"),
            attrs: item.ficheiro.indexOf("http") === 0 ?
              { href: caminho(item.ficheiro), target: "_blank", rel: "noopener noreferrer" } :
              { href: caminho(item.ficheiro) }
          })]));
        }

        conteudo.push(linhaMeta(item));
        if (item.nota) { conteudo.push(el("p", { classe: "origem", texto: item.nota })); }
        alvo.appendChild(el("article", {
          classe: "cartao cartao--ident" + (detalhado ? " documento-detalhado" : ""),
          attrs: { id: item.id }
        }, conteudo));
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
          item.nota ? el("p", { classe: "origem", texto: item.nota }) : null
        ]));
      });
    });
  }

  /* --- Fontes públicas: cartões sem expor o modelo A–D ------------------- */

  function renderFontes() {
    preencher("tabela-fontes", function (alvo) {
      var itens = JV.sources || [];
      if (!itens.length) {
        alvo.appendChild(el("p", { texto: "Sem fontes registadas." }));
        return;
      }
      itens.forEach(function (item) {
        alvo.appendChild(el("article", { classe: "cartao cartao--fonte" }, [
          el("p", { classe: "categoria", texto: item.categoria }),
          el("h3", { texto: item.fonte }),
          el("p", { texto: item.valor }),
          el("dl", { classe: "fonte-detalhes" }, [
            el("dt", { texto: "Tipo" }), el("dd", { texto: item.tipoFonte }),
            el("dt", { texto: "Referência" }), el("dd", { texto: item.referencia }),
            el("dt", { texto: "Estado" }), el("dd", { texto: item.estado })
          ])
        ]));
      });
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
        ["Nomes comuns", (c.nomesComuns || [c.sigla]).join(", ")],
        ["Fundação", c.fundacao],
        ["Constituição legal", c.constituicaoLegal],
        ["Modalidade", c.modalidade],
        ["Competição", c.competicao],
        ["Cores do clube", (c.cores || []).join(" e ")],
        ["Localidade", c.localidade],
        ["Sede histórica", c.sedeHistorica]
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
      if (!dados || !dados.jogadores || !dados.jogadores.length) {
        alvo.appendChild(el("p", { texto: "Sem lista de jogadores." }));
        return;
      }

      var jogadores = dados.jogadores.slice().sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt");
      });

      var contador = document.getElementById("jogadores-total");
      if (contador) { contador.textContent = String(jogadores.length); }

      alvo.appendChild(el("div", { classe: "jogadores" }, jogadores.map(function (jogador) {
        var epocas = (jogador.epocas || []).map(function (epoca) {
          return el("li", {}, [
            el("strong", { texto: epoca.epoca + " — " }),
            el("span", { texto: epoca.designacaoFonte }),
            el("small", { texto: epoca.fonte + " · " + epoca.tipoFonte })
          ]);
        });
        var item = el("article", { classe: "jogador" }, [
          el("h2", { texto: jogador.nome }),
          jogador.nascimento ? el("p", { texto: "Nascimento: " + jogador.nascimento }) : null,
          epocas.length ? el("ul", { classe: "jogador__epocas" }, epocas) : el("p", { texto: "Época(s): em investigação" }),
          el("p", { classe: "estado", texto: jogador.estado })
        ]);
        if (jogador.fotografia) {
          item.appendChild(el("a", {
            classe: "aviso-nome",
            texto: "Na fotografia da página inicial: " + jogador.fotografia,
            attrs: { href: "../index.html#fotografia-equipa" }
          }));
        }
        return item;
      })));

      var campo = document.getElementById("filtro-jogadores");
      if (campo) {
        campo.addEventListener("input", function () {
          var termo = campo.value.trim().toLowerCase();
          var itens = alvo.querySelectorAll(".jogador");
          Array.prototype.forEach.call(itens, function (cartao) {
            var corresponde = termo === "" || cartao.textContent.toLowerCase().indexOf(termo) !== -1;
            cartao.style.display = corresponde ? "" : "none";
          });
        });
      }
    });
  }

  function renderRecintos() {
    preencher("lista-recintos", function (alvo) {
      (JV.venues || []).forEach(function (item) {
        alvo.appendChild(el("article", { classe: "cartao" }, [el("h3", { texto: item.nome }), el("p", { texto: item.uso }), el("p", { classe: "origem", texto: item.ressalva }), linhaMeta(item)]));
      });
    });
  }

  function renderEpocas() {
    preencher("lista-epocas", function (alvo) {
      (JV.seasons || []).forEach(function (item) {
        alvo.appendChild(el("article", { classe: "cartao epoca" }, [
          el("h3", { texto: item.season + (item.title !== "—" ? " — " + item.title : "") }),
          el("p", { texto: item.competition }),
          el("p", { texto: item.players.length ? "Jogadores com época identificada: " + item.players.join(", ") : "Plantel: informação em recuperação" }),
          el("p", { texto: "Classificação: " + item.classification }),
          el("p", { classe: "estado", texto: item.researchStatus })
        ]));
      });
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
    renderRecintos();
    renderEpocas();
    iniciarNavegacao();
    escreverAno();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
