# Grupo Desportivo Jovalto — sítio estático

Reconstrução do sítio do **Grupo Desportivo Jovalto** como sítio estático (HTML + CSS + JavaScript), a viver nesta pasta local. A publicação está preparada para **GitHub Pages**. Não há dependências externas, `node`, `python` nem etapa de compilação: o sítio abre diretamente no navegador.

> **Nota de contexto:** a auditoria ao site original em Wix foi abandonada por decisão do clube (o site não é acessível publicamente). Este sítio **não é uma reprodução do Wix**: é uma construção nova, assente apenas nas fontes documentais em `Logos/` e nos factos confirmados, com correção dos erros conhecidos.

---

## Estado

| Fase | Descrição | Estado |
| --- | --- | --- |
| 1 | Esqueleto do repositório e documentação | concluída |
| 2 | Ativos (emblema e fotografia) | concluída |
| 3 | Camada de dados com proveniência | concluída |
| 4 | Páginas do sítio (6 páginas) | concluída |

### Páginas

| Página | Conteúdo |
| --- | --- |
| `index.html` | abertura, títulos, fotografia e legenda nominal do plantel, identidade |
| `clube/` | identidade, história, emblema em 3 representações, pessoas |
| `jogadores/` | lista dos 45 jogadores, com filtro de procura |
| `palmares/` | os 3 títulos da AFL, com proveniência |
| `arquivo/` | documentos e registo completo de fontes |
| `contactos/` | contactos (por confirmar) |
| 5 | Controlo de qualidade (ligações e ativos) | concluída |
| — | Publicação em GitHub Pages | **preparada** — falta ligar o GitHub e criar/confirmar a organização `gdjovalto` |

---

## Princípios

1. **Nada sem fonte.** Cada afirmação histórica apresentada no sítio provém de um registo em `data/`, com classe de evidência e referência à fonte.
2. **Corrigir, não copiar.** O sítio anterior continha erros. Aqui não se reproduz conteúdo não verificado.
3. **Sem invenções.** Onde não existe fonte, a página di-lo explicitamente: *por confirmar*.
4. **Sem maquilhagem de dados.** Nenhum nome de atleta, plantel, morada ou contacto é inventado para preencher espaços.

### Classes de evidência (A–D)

| Classe | Definição |
| --- | --- |
| **A** | Documento oficial primário (clube ou AFL: boletins, classificações, atas, comunicados) |
| **B** | Registo contemporâneo datável (fotografia, imprensa da época, programa de jogo) |
| **C** | Testemunho identificado e datado (dirigente, jogador, historiador nomeado) |
| **D** | Fonte secundária ou inferência (diretórios, blogues, deduções) — exige confirmação |

### Guardrails históricos (invioláveis)

- Fundação em **1965**; constituição legal em **1987**.
- **Cores do clube: vermelho e branco.** O emblema contém também azul, verde e amarelo, mas essas são cores **do emblema** — não são cores do clube e não são usadas no sítio.
- **Apenas futebol de veteranos** está documentado. **Não existem** secções de atletismo, ciclismo ou outras modalidades.
- **Três títulos da AFL (veteranos)**: **1988/89, 1989/90 e 1991/92**.
- **Joaquim Lourenço** e **Joaquim Álvaro Sampaio Lourenço** são **pessoas distintas** e nunca podem ser fundidas num único registo.
- **Um único emblema histórico**, em **três representações**: original físico, digitalização intermédia e reconstrução digital oficial.

---

## Estrutura

```
Jovalto/
├─ index.html              página inicial
├─ clube/                  identidade, história, emblema e pessoas
├─ jogadores/              lista de jogadores do clube
├─ palmares/               títulos (3 títulos da AFL)
├─ arquivo/                documentos e registo de fontes
├─ contactos/              contactos (por confirmar)
├─ assets/
│  ├─ css/main.css         folha de estilos única
│  ├─ js/main.js           navegação e renderização a partir dos dados
│  └─ img/                 emblema, fotografia e favicon
├─ data/                   registos com proveniência (scripts clássicos)
├─ docs/                   fontes, notas de reconstrução, tokens de design,
│                          pipeline de ativos e registo de verificação
├─ tools/                  preparação de ativos, rodapé comum e verificação
│                          de integridade (PowerShell, sem instalações)
└─ Logos/                  fontes originais (não editar)
```

### Porque é que os dados são `.js` e não `.json`

Os dados vivem em `data/*.js` como **scripts clássicos** que atribuem valores a `window.JOVALTO`. Motivo: abrindo o sítio por `file://`, o navegador **bloqueia** tanto `fetch()` de ficheiros locais como módulos ES (política de origem). Com scripts clássicos o sítio funciona sem servidor e sem instalar nada.

---

## Pré-visualizar

```powershell
Start-Process msedge.exe "file:///C:/Users/pedro/Desktop/Jovalto/website/index.html"
```

Não é necessário servidor. Se um dia instalar Python ou Node, um servidor local também funciona, mas não é requisito.

---

## Ferramentas

```powershell
# 1) Preparar ativos: copia o emblema, converte a fotografia da equipa para JPEG e cria o favicon
powershell -ExecutionPolicy Bypass -File tools\prepare-assets.ps1

# 2) Verificar integridade: ligações, imagens e caminhos referenciados nos dados
powershell -ExecutionPolicy Bypass -File tools\check-integrity.ps1

# 3) Manutenção do rodapé comum (autor: injeta tools\rodape.tpl nas páginas)
powershell -ExecutionPolicy Bypass -File tools\apply-footer.ps1
powershell -ExecutionPolicy Bypass -File tools\apply-footer.ps1 -Check
```

Ambas usam apenas PowerShell e as bibliotecas de imagem do Windows — nenhuma instalação.

---

## Acrescentar um registo com fonte

1. Abrir o ficheiro adequado em `data/` (`honours.js`, `timeline.js`, `people.js`, `gallery.js`, `documents.js` ou `sources.js`).
2. Acrescentar um objeto com os campos obrigatórios:

```js
{
  id: "t1971-exemplo",
  valor: "Descrição do facto",
  classe: "A",            // A | B | C | D
  fonte: "Logos/AFL_documento_campeoes.pdf, p. ??",
  nota: "Observações, dúvidas ou correções aplicadas",
  estado: "por confirmar" // confirmado | por confirmar | corrigido
}
```

3. Registar a fonte em `docs/sources.md` se ainda não existir.
4. Correr `tools\check-integrity.ps1`.

**Regra:** se não houver fonte, não entra no sítio.

---

## Verificação

Estado verificado em **2026-09-23** (detalhe e limites em `docs/verification.md`):

| Verificação | Resultado |
| --- | --- |
| `tools\check-integrity.ps1` | 6 páginas, 186 ligações locais — **0 quebradas** (1 ligação externa ignorada) |
| `tools\apply-footer.ps1 -Check` | 0 marcadores de rodapé por resolver |
| DOM renderizado (Edge em modo headless) | 8 linhas de identidade, **45 jogadores**, 2 marcos de cronologia, 3 títulos, 3 pessoas, 3 representações do emblema, 2 documentos e 1 fotografia |
| Lista de jogadores (`jogadores/`) | 45 nomes por ordem alfabética, 2 avisos de homónimos e filtro a funcionar |
| Tabela de fontes (`arquivo/`) | 8 linhas e 3 cabeçalhos de coluna renderizados |
| Paleta | Sem azul, verde ou amarelo no CSS — apenas o vermelho do clube, branco e neutros |
| `assets/css/main.css` | Chavetas equilibradas (109 / 109) |

**O que não foi verificado:** não houve inspeção visual com capturas de ecrã, não há validador W3C nesta máquina, e não foram testados outros navegadores nem leitores de ecrã.

## Publicar no GitHub Pages

O workflow `../.github/workflows/pages.yml` publica automaticamente `website/` e o PDF do
arquivo quando há alterações no ramo `main`. O endereço canónico e o sitemap estão
configurados para `https://gdjovalto.github.io/`.

Para usar esse endereço é obrigatório que o proprietário seja uma conta ou organização
chamada `gdjovalto` e que o repositório se chame `gdjovalto.github.io`. Ver
`../PUBLICACAO-GITHUB.md` para a configuração e o plano de substituição do Wix.

## Limitações conhecidas

- **GitHub ainda não ligado nesta máquina** — o site está preparado, mas falta criar o commit e publicar no repositório remoto.
- **PDF da AFL não é legível por máquina.** O texto do PDF usa fontes com codificação de subconjunto, pelo que não é extraível automaticamente. As referências indicam o documento e a página fica **por confirmar**; nunca se cita texto "extraído" dele.
- **Emblema sem versão vetorial.** O caderno de critérios pede um entregável vetorial (SVG/PDF). Não é possível vetorizar automaticamente sem ferramentas de desenho, pelo que essa peça fica pendente.
- **Contactos por confirmar.** A única morada encontrada é de um diretório de terceiros (classe D) e não é apresentada como facto.
- **Lista de jogadores sem estatísticas.** A lista existe (45 nomes, fornecida pelo clube), mas sem épocas, posições, número de jogos ou golos — e o sítio não os inventa. A fotografia do plantel tem uma identificação própria, também fornecida pelo clube, com seis lugares ainda marcados como «Não identificado».
- **Zerozero inacessível.** As fichas de jogadores indicadas pelo clube estão em bases de dados que bloqueiam o acesso automatizado (**HTTP 403**); nada daí foi lido nem reproduzido. Para incluir esses dados é preciso transcrevê-los manualmente.
