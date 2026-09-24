# Verificação

**Data:** 2026-09-23 · **Sistema:** Windows, sem `node`, `python` ou `git` · **Navegador:** Microsoft Edge 153.0.4234.48

Registo do que foi efetivamente verificado, para que qualquer pessoa possa reproduzir.

> Esta revisão corresponde à **simplificação do sítio**: cores do clube (vermelho e branco), consolidação de 7 para 5 páginas e eliminação de tabelas repetidas.

---

## 1. Verificação estrutural

```powershell
powershell -ExecutionPolicy Bypass -File tools\check-integrity.ps1
```

| Métrica | Valor |
| --- | --- |
| Ficheiros HTML analisados | **6** |
| Ligações locais verificadas | **186** |
| Ligações externas ignoradas | **1** (zerozero — identificada como não verificada) |
| Ligações quebradas | **0** |
| Código de saída | **0** |

O verificador valida cada `href`/`src` do HTML, os caminhos referenciados em `data/*.js` (invisíveis no HTML, porque são renderizados por JavaScript) e a presença de `window.JOVALTO` em cada ficheiro de dados.

## 2. Paleta

| Verificação no `assets/css/main.css` | Resultado |
| --- | --- |
| Contém o antigo azul `#124FB3` | **não** |
| Contém o token `--jv-azul` | **não** |
| Contém o amarelo `#F2B403` | **não** |
| Contém o verde `#046739` | **não** |
| Contém o vermelho do clube `#D00A1E` | sim |
| Chavetas equilibradas | sim (109 / 109) |

As cores do emblema continuam documentadas em `docs/design-tokens.md`, mas **não** são usadas como cores de interface.

## 3. DOM renderizado (JavaScript a funcionar em `file://`)

```powershell
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
cmd /c "$edge --headless --disable-gpu --dump-dom `"file:///C:/Users/pedro/Desktop/Jovalto/index.html`" > dom.html"
```

> **Nota:** `--headless=new` falha nesta máquina com `Multiple targets are not supported in headless mode`. Usar `--headless`.

| Página | Identidade | Cronologia | Títulos | Pessoas | Emblema | Documentos | Fotografia | Marcador resolvido |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `index.html` | – | – | – | – | – | – | **1** | sim |
| `clube/` | **8** | **2** | – | **3** | **3** | – | – | sim |
| `palmares/` | – | – | **3** | – | – | – | – | sim |
| `arquivo/` | – | – | – | – | – | **2** | – | sim |
| `contactos/` | – | – | – | – | – | – | – | sim |

Valores esperados, para conferência: 2 marcos em `data/timeline.js`, 3 títulos em `data/honours.js`, 4 pessoas em `data/people.js`, 1 fotografia em `data/gallery.js`, 2 documentos em `data/documents.js`, 8 fontes em `data/sources.js`, 8 campos em `data/clube.js` e **45 nomes** em `data/jogadores.js`.

Na página `jogadores/`, a lista renderiza **45 nomes** por ordem alfabética, com **9 referências à fotografia da página inicial** e o campo de filtro presente. Nenhuma página tem `<!-- @@RODAPE@@ -->` por resolver.

### 3.1 Defeito detetado e corrigido nesta revisão

A página `jogadores/` foi inicialmente criada **sem carregar `data/jogadores.js`**, pelo que a lista não era renderizada (0 nomes). O defeito foi detetado pela própria verificação do DOM:

| Estado | Observado |
| --- | --- |
| Antes da correção | `jogadores_na_lista=0`, `avisos=0` |
| Depois da correção | `jogadores_na_lista=45`, `avisos=2`, contador `45` |

A linha do script foi acrescentada às **6 páginas** e ao modelo `tools/rodape.tpl`, para que páginas futuras já a incluam.

> Nota metodológica: a primeira tentativa de correção automática foi travada por um **falso positivo** — a página `jogadores/` contém a expressão `data/jogadores.js` numa nota de texto, o que fazia a verificação pensar que o script já estava carregado. O padrão foi tornado específico (`<script src="...data/jogadores.js"`) e a correção aplicada.

### 3.2 Defeito detetado e corrigido: mudança de formato da fotografia

A fotografia da equipa foi **substituída na pasta durante o trabalho**: a versão `.avif` (1151 × 786) deu lugar a `foto_plantel.jpg` (1241 × 848) — a mesma imagem em resolução ligeiramente maior (proporção 1,4634 contra 1,4644).

O efeito foi detetado pela verificação de integridade, que passou a **falhar (código de saída 1)**:

```
PROBLEMAS ENCONTRADOS: 3
  - Caminho inexistente referenciado em gallery.js: foto_plantel.avif
  - Caminho inexistente referenciado em gallery.js: foto_plantel.avif
  - Caminho inexistente referenciado em sources.js: foto_plantel.avif
```

Correções aplicadas:

| Onde | Correção |
| --- | --- |
| `tools/prepare-assets.ps1` | Passou a **procurar a fotografia por ordem de preferência** (`jpg`, `jpeg`, `png`, `avif`). O script deixa de depender de uma extensão fixa. |
| `data/gallery.js` | `fonte` e `original` atualizados para `foto_plantel.jpg`; dimensões para 1241 × 848. |
| `data/sources.js` | Fonte e nota atualizadas (dimensões e histórico dos dois formatos). |
| `docs/sources.md`, `docs/asset-pipeline.md`, `README.md` | Referências ao AVIF atualizadas. |

Resultado depois da correção: `prepare-assets.ps1` reporta `JPG->JPEG 1241x848` e a verificação de integridade volta a **passar (código de saída 0)**.

> Esta classe de falha é precisamente o motivo pelo qual a verificação é automática: uma substituição de ficheiro na pasta teria passado despercebida numa revisão manual.

## 4. O que esta verificação NÃO prova

- **Não houve inspeção visual** com capturas de ecrã: verifica-se estrutura, ligações, paleta e DOM — não a aparência final.
- **Sem validador de HTML/CSS** nesta máquina: a conformidade formal com as normas W3C não foi verificada automaticamente.
- **Apenas Edge.** Não foram testados Firefox, Safari nem leitores de ecrã. O código usa HTML semântico, `aria-current`, foco visível e `prefers-reduced-motion`, mas isso não substitui testes de acessibilidade reais.
- **Responsivo não medido.** O breakpoint único (760 px) foi definido mas não medido em dispositivos reais.

## 5. Reproduzir tudo

```powershell
powershell -ExecutionPolicy Bypass -File tools\prepare-assets.ps1
powershell -ExecutionPolicy Bypass -File tools\apply-footer.ps1 -Check
powershell -ExecutionPolicy Bypass -File tools\check-integrity.ps1
Start-Process msedge.exe "file:///C:/Users/pedro/Desktop/Jovalto/index.html"
```
