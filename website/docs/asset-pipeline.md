# Pipeline de ativos e medições

Todo o pipeline usa **apenas PowerShell e as bibliotecas de imagem do Windows (WIC/WPF)**. Não requer `node`, `python`, `git`, ImageMagick nem qualquer instalação.

Verificações de ambiente feitas nesta máquina (2026-09-23):

| Requisito | Estado |
| --- | --- |
| `node`, `npm`, `git`, `php` | **não instalados** |
| `python` | **apenas o atalho da Microsoft Store** (não funcional) |
| Descodificação AVIF/WebP/HEIF | disponível (`Microsoft.AV1VideoExtension 2.0.30.0`, `Microsoft.WebpImageExtension`, `Microsoft.HEIFImageExtension`) |
| Navegador para pré-visualização | Microsoft Edge `153.0.4234.48` |

---

## 1. Preparar os ativos

```powershell
powershell -ExecutionPolicy Bypass -File tools\prepare-assets.ps1
```

O que faz:

| Origem | Destino | Operação |
| --- | --- | --- |
| `Logos/logo_actual.png` | `assets/img/emblema-oficial.png` | cópia (mantém alfa) |
| `Logos/logo_digitalizado.png` | `assets/img/emblema-digitalizado.png` | cópia |
| `Logos/logo_original.jpg` | `assets/img/emblema-original.jpg` | cópia |
| `Logos/Criterios_reconstrucao.png` | `assets/img/criterios-reconstrucao.png` | cópia |
| `foto_plantel.jpg` (ou `.avif`/`.png`) | `assets/img/foto-equipa-bicampeonato.jpg` | conversão para JPEG (qualidade 88) |
| `Logos/logo_actual.png` | `assets/img/favicon.png` | redimensionamento para 64 px de largura |

Os originais em `Logos/` e a raiz **nunca são alterados**.

## 2. Verificar a integridade

```powershell
powershell -ExecutionPolicy Bypass -File tools\check-integrity.ps1
```

Percorre todos os `*.html`, extrai cada `href` e `src`, ignora ligações externas (`http`, `mailto`, `tel`, `#`, `data:`) e falha se algum destino local não existir. Confirma também que cada ficheiro de `data/` é carregado e declara `window.JOVALTO`. Devolve código de saída **1** se houver problemas.

## 3. Medições efetuadas (evidência)

### 3.1 Dimensões e canais

| Ficheiro | Dimensões | Formato |
| --- | --- | --- |
| `Logos/logo_actual.png` | 1128 × 1394 | Bgra32 (alfa — 48,4 % transparente) |
| `Logos/logo_digitalizado.png` | 306 × 378 | Bgra32 (alfa) |
| `Logos/logo_original.jpg` | 1536 × 2040 | Bgr32 |
| `Logos/Criterios_reconstrucao.png` | 1230 × 1278 | Bgr32 |
| `foto_plantel.jpg` | 1241 × 848 | Bgr32 (proporção 1,4634 — igual ao original de 2912 × 1988) |

### 3.2 Amostragem de cor

Amostragem de `Logos/logo_actual.png` com passo de 3 px em cada eixo, apenas em pixéis opacos (canal alfa ≥ 250), classificados por família e somados:

| Família | Hex | Pixéis |
| --- | --- | --- |
| vermelho | `#D00A1E` | 18 704 |
| azul | `#124FB3` | 22 882 |
| verde | `#046739` | 16 402 |
| amarelo | `#F2B403` | 20 177 |
| preto | `#090908` (média) | 41 682 |
| branco | `#FDFDFD` (média) | 78 898 |

Resultados aplicados em `docs/design-tokens.md`, onde estão separados em duas categorias: **cores do clube** (vermelho e branco — as que o sítio usa) e **cores do emblema** (azul, amarelo e verde, medidos aqui e deliberadamente **não** usados na interface).

### 3.3 Nota sobre o PDF da AFL

`AFL_documento_campeoes.pdf` (8 páginas) foi aberto e as suas correntes de texto descomprimidas. O texto **não é legível**: as fontes usam codificação de subconjunto, pelo que a extração devolve índices de glifos (`\u0001 \u0002 \u0003 …`) em vez de caracteres. **Não existe ferramenta de PDF nesta máquina** (`python`/`node` ausentes), logo:

- o documento é citado **sem número de página confirmado**;
- **nunca** se reproduz como citação literal texto dele derivado automaticamente.

Para corrigir isto é necessário ler o PDF manualmente e transcrever os elementos relevantes (competição, época, página).

## 4. Pré-visualização

```powershell
Start-Process msedge.exe "file:///C:/Users/pedro/Desktop/Jovalto/index.html"
```

Não é necessário servidor. Nota técnica: por `file://` estão bloqueados `fetch()` de ficheiros locais e a importação de módulos ES — motivo pelo qual os dados são scripts clássicos.

---

## 5. Ferramentas de autor

| Script | Para que serve |
| --- | --- |
| `tools/prepare-assets.ps1` | Copia as peças do emblema para `assets/img`, converte a fotografia da equipa em JPEG (qualidade 88) e gera o `favicon.png` a 64 px. Procura a fotografia por ordem de preferência (`jpg`, `jpeg`, `png`, `avif`), para que a substituição do ficheiro de origem não quebre o pipeline. |
| `tools/apply-footer.ps1` | Injeta o rodapé comum (`tools/rodape.tpl`) nas páginas que contenham o marcador `<!-- @@RODAPE@@ -->`. Com `-Check` apenas reporta marcadores por resolver (código de saída 1 se existirem). **Ferramenta de autor** — não é necessária para publicar. |
| `tools/check-integrity.ps1` | Valida todas as ligações e imagens do HTML, os caminhos referenciados em `data/*.js` e a presença de `window.JOVALTO` nos ficheiros de dados. |

## 6. Inspecionar o DOM renderizado

Como as listas são injetadas por JavaScript, a verificação da camada de dados exige olhar para o DOM **depois** da execução dos scripts:

```powershell
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
cmd /c "$edge --headless --disable-gpu --dump-dom `"file:///C:/Users/pedro/Desktop/Jovalto/index.html`" > dom.html"
```

> **Nota:** `--headless=new` falha nesta máquina com `Multiple targets are not supported in headless mode`. Usar `--headless`.

Os resultados desta inspeção estão registados em `docs/verification.md`.
