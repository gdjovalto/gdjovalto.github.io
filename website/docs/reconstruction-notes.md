# Notas de reconstrução

## 1. Correções aplicadas nesta revisão

| # | Antes | Agora | Motivo |
| --- | --- | --- | --- |
| 1 | Azul do emblema como cor principal | **Vermelho e branco** | As cores do clube são vermelho e branco. O azul pertence ao emblema, não ao clube. |
| 2 | 7 páginas | **5 páginas** | Pouca informação espalhada por muitas páginas. |
| 3 | Palmarés repetido em 3 páginas | Tabela **só** em Palmarés | Eliminar duplicação. |
| 4 | Cronologia repetida em 2 páginas | **Só** no Clube | Eliminar duplicação. |
| 5 | Pessoas repetidas em 2 páginas | **Só** no Clube | Eliminar duplicação. |
| 6 | Página `futebol/` própria | Integrada no **Clube** | O conteúdo era quase todo duplicado. |
| 7 | Página `galeria/` própria | Fotografia no **Início** | Uma única fotografia não justifica página própria. |
| 8 | Emblemas apresentados duas vezes | **Só** no Clube | Eliminar duplicação. |
| 9 | Caixas de aviso em quase todas as secções | 1 a 2 por página, só onde é essencial | O sítio parecia um documento de advertências. |
| 10 | Sombras, gradientes, 3 breakpoints, CSS 14,0 KB | Sem sombras, 1 breakpoint, CSS 9,9 KB | Simplicidade. |

## 2. O que este sítio é — e o que não é

- **É** um sítio novo, estático, escrito de raiz, alimentado por registos com proveniência (`data/`).
- **Não é** uma cópia do site em Wix. A auditoria ao site anterior foi **abandonada** (não é acessível publicamente) e não existe exportação dele nesta pasta.
- **Consequência formal:** não havendo base de comparação, as correções ao conteúdo anterior ficam registadas como **declaração do clube / decisão de projeto** (classe **C**), exceto onde existe documento (classe **A**).

## 3. Guardrails aplicados

| Tema | O que se publica | O que se evita | Classe |
| --- | --- | --- | --- |
| Fundação | **1965** | apresentar 1987 como fundação | C |
| Constituição legal | **1987**, marco distinto | fundir 1965 e 1987 | C |
| Cores | **vermelho e branco** | usar azul/verde/amarelo do emblema como cores do clube | C |
| Modalidade | **só futebol de veteranos** | criar secções de atletismo, ciclismo ou formação sem fonte | C |
| Palmarés | **3 títulos da AFL**: 1988/89, 1989/90, 1991/92 | listar títulos não documentados | **A** + C |
| Pessoas | **Joaquim Lourenço** é pai de **Joaquim Álvaro Sampaio Lourenço**; **Joaquim Jorge Sampaio Jacinto** é outro membro da família | confundir membros da família | C |
| Identidade | **um emblema**, três representações | declarar vários emblemas "oficiais" | **A** |
| Fotografia | legenda «Equipa Vencedora do Bi-Campeonato» | nomear atletas sem fonte | B |

## 4. Exclusões deliberadas

| Excluído | Motivo |
| --- | --- |
| Página de equipas com plantel e nomes de jogadores | Era **conteúdo-modelo** com nomes fictícios; não foi transportado. |
| Secções de atletismo e ciclismo | Sem qualquer fonte (guardrail: só veteranos). |
| Morada, telefone e email | Só existe referência num diretório de terceiros (classe **D**), não confirmada. |
| Títulos na cronologia | Passaram a existir apenas em `honours.js`, para não duplicar. |
| Fonte de títulos do site anterior (Anton) | Dependência de CDN; incompatível com o funcionamento offline. |

## 5. Decisões técnicas

| Decisão | Motivo |
| --- | --- |
| Dados em `data/*.js` como **scripts clássicos** (`window.JOVALTO`) | Em `file://` o navegador bloqueia `fetch()` local **e** módulos ES. |
| `timeline.js` reduzido a **2 marcos** (1965, 1987) | Os títulos vivem em `honours.js`; a cronologia não os repete. |
| `documents.js` só com **documentos** | As três representações do emblema passaram para a página do Clube. |
| Ligações a `pasta/index.html` (nunca a `pasta/`) | Em `file://` um diretório mostra a listagem de ficheiros. |
| Caminhos sempre relativos (`../assets/...`) | Em `file://` caminhos absolutos resolvem para a raiz do disco. |
| Sem CSS/JS de terceiros | Nenhuma dependência, nenhum CDN, nenhuma chamada de rede. |
| Favicon em PNG | O Windows não expõe codificador ICO no WPF. |
| Página `jogadores/` | Acrescentada a pedido do clube. A ordem original da lista está preservada em `data/jogadores.js`; no sítio é apresentada por ordem alfabética — mudança de **apresentação**, não de conteúdo. |

## 6. Pendências (bloqueios atuais)

1. **GitHub ainda não ligado** → a publicação por GitHub Actions está preparada, mas falta confirmar a organização `gdjovalto`, ligar a conta e publicar o ramo `main`.
2. **Vetorização do emblema (SVG/PDF)** — exigida pelo caderno de critérios; não automatizável nesta máquina.
3. **Página exata do PDF da AFL** — o texto não é legível por máquina.
4. **Contactos oficiais** — a aguardar confirmação do clube.
5. **Datação da fotografia** e identificação das seis pessoas ainda assinaladas como «Não identificado».
6. **Fontes primárias adicionais** (atas, boletins) para elevar registos de classe C a classe A.
