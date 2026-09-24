# Registo de fontes

Documento de controlo de evidência do sítio. Cada afirmação publicada nas páginas tem de apontar para uma destas fontes, com a classe correspondente (A–D, definidas no `README.md`).

---

## 1. Fontes locais

### `Logos/logo_original.jpg` — classe **A**

- **Tipo:** fotografia do emblema físico (peça original do clube).
- **Dimensões:** 1536 × 2040 px (fundo opaco).
- **Evidencia:** a representação física e histórica do emblema — anel dentado, inscrição JOVALTO, metade verde à esquerda, metade vermelha à direita, letras G/D/J em torno.
- **Limitações:** digitalização sem data nem contexto de origem; reflete o estado de conservação da peça, não um desenho normalizado.

### `Logos/logo_digitalizado.png` — classe **B**

- **Tipo:** digitalização intermédia do emblema (contornos em azul-escuro, aspeto de bordado).
- **Dimensões:** 306 × 378 px (canal alfa presente).
- **Evidencia:** etapa intermédia de digitalização, útil para comparar proporções e detalhes.
- **Limitações:** resolução baixa; **não** é o entregável oficial e não deve ser usada como referência de cor.

### `Logos/logo_actual.png` — classe **A** (identidade oficial declarada)

- **Tipo:** reconstrução digital oficial do emblema (cores planas).
- **Dimensões:** 1128 × 1394 px, canal alfa, **48,4 % da área transparente** (cumpre o requisito de fundo transparente do caderno de critérios).
- **Evidencia:** fonte principal da identidade visual e da paleta do sítio. Cores medidas por amostragem de pixéis (ver `docs/design-tokens.md`).
- **Limitações:** **não** é vetorial; contém ruído de posterização (variações mínimas entre pixéis vizinhos, ex. `#D00A1E`/`#D00A1D`), pelo que os valores de cor foram calculados por média robusta e não copiados de um único pixel.

### `Logos/Criterios_reconstrucao.png` — classe **A**

- **Tipo:** caderno de critérios para a reconstrução do emblema.
- **Dimensões:** 1230 × 1278 px.
- **Evidencia:** regras de fidelidade ao original; **cores planas**; roda dentada azul; letras **G**, **D** e **J** em volta (G inclinado à esquerda, D vertical, J inclinado à direita); entregável final em **PNG de alta resolução com fundo transparente** e **versão vetorial (SVG/PDF)**.
- **Limitações:** **não** define o modelo de evidência A–D deste repositório (o modelo foi adotado por decisão de projeto); não fixa valores de cor em hexadecimal.

### `foto_plantel.jpg` — classe **B**

- **Tipo:** fotografia da equipa.
- **Dimensões:** 1241 × 848 px (proporção 1,4634 — a mesma do original de 2912 × 1988 px).
- **Evidencia:** legenda de origem «**Equipa Vencedora do Bi-Campeonato**»; única fotografia histórica disponível.
- **Identificação (classe C):** o clube forneceu em 2026 a identificação nominal e a posição na fotografia, da esquerda para a direita, em duas filas. A legenda do sítio preserva como «Não identificado» cada lugar para o qual foi indicado `?`.
- **Limitações:** sem data legível; permanecem por identificar duas pessoas no topo e quatro pessoas em baixo; a fotografia é convertida para JPEG no pipeline de ativos por compatibilidade.
- **Nota de ficheiro:** o clube forneceu esta fotografia primeiro em `.avif` (1151 × 786) e depois em `.jpg` (1241 × 848) — a **mesma imagem** em duas resoluções. A versão em uso é a `.jpg`, de maior resolução. O pipeline procura a fotografia por ordem de preferência (`jpg`, `jpeg`, `png`, `avif`), para que a substituição do ficheiro não quebre o sítio.

### `AFL_documento_campeoes.pdf` — classe **A**

- **Tipo:** documento oficial da Associação de Futebol de Lisboa relativo a campeões.
- **Tamanho:** 100 586 bytes, 8 páginas.
- **Evidencia:** suporte documental dos títulos de veteranos (1988/89, 1989/90 e 1991/92).
- **Limitações:** **texto não extraível por máquina** — as fontes do PDF usam codificação de subconjunto (a extração devolve índices de glifos, não caracteres). Consequências obrigatórias: citar o documento **sem número de página confirmado** enquanto não houver verificação manual, e **nunca** apresentar como citação literal qualquer texto dele derivado automaticamente.

---

## 2. Declarações do clube — classe **C**

Factos fornecidos pelo clube, sem documento anexo nesta pasta. Registados em `data/clube.js` e apresentados no sítio com esta classificação.

| Facto | Valor |
| --- | --- |
| Fundação | **1965** |
| Constituição legal | **1987** (marco distinto da fundação) |
| **Cores do clube** | **vermelho e branco** |
| Modalidade | futebol de veteranos |
| Competição | Associação de Futebol de Lisboa (AFL) |
| Família | **Joaquim Lourenço** é pai de **Joaquim Álvaro Sampaio Lourenço**; **Joaquim Jorge Sampaio Jacinto** é outro membro da família |
| Jogadores | **Lista nominal de 45 jogadores** que passaram pelo clube (`data/jogadores.js`) — sem épocas, posições, jogos ou golos |

**Notas de rigor:**

- As **cores do clube** são vermelho e branco. O emblema histórico contém também azul, verde e amarelo — essas são **cores do emblema**, não do clube, e não são usadas na interface do sítio (ver `docs/design-tokens.md`).
- A modalidade de **veteranos** é corroborada externamente por imprensa (secção seguinte). As restantes declarações só podem subir de classe **C** para **A** com documento.

## 3. Fontes externas (verificadas nesta sessão)

### Alberto Helder, «FUTEBOL – UM EMOTIVO REENCONTRO APÓS 48 ANOS…», 24/01/2024 — classe **C**

- **Localização:** `albertohelder.blogspot.com/2024/01/futebol-um-emotivo-reencontro-apos-48.html`
- **Evidencia:** nomeia «**o Jovalto (Veteranos)**» e indica que o jogador **José António Almeida Cruz**, também conhecido como **José Cruz**, foi campeão em campeonatos populares promovidos pela **AFL** (pelo União, pelo 1.º de Junho-Imparcial e pelo Jovalto).
- **Utilidade:** **corrobora externamente** dois guardrails deste projeto: futebol **de veteranos** e títulos em **provas organizadas pela AFL**.
- **Limitações:** fonte terciária/jornalística, sem documento anexo reproduzido; não é usada para fixar datas concretas.

### Listagem de diretório (Unilocal) — classe **D**

- **Localização:** `unilocal.net/portugal/lisbon/grupo-desportivo-jovalto`
- **Conteúdo:** «Grupo Desportivo Jovalto», R. Freitas Gazul, 17-B, 1350-148 Lisboa (Campo de Ourique); sem telefone; sem sítio indicado.
- **Limitações:** diretório de terceiros com dados não confirmados pelo clube. **Não é apresentada no sítio como facto** — serve apenas como pista para verificação futura.

---

## 4. Fontes procuradas e não encontradas

Foi tentada, sem sucesso, a localização do sítio original e de fontes primárias adicionais:

- O site em Wix **não está publicamente indexado** nem acessível (o clube decidiu abandonar a auditoria).
- `jovalto.pt`, `www.jovalto.pt`, `gdjovalto.pt`, `grupodesportivojovalto.pt` e `jovalto.com`: **não existem** (DNS sem registo).
- `jovalto.wixsite.com/*`: devolve **404** (o DNS de `*.wixsite.com` é um coringa da Wix, pelo que a resolução não prova a existência de site).
- Não existe qualquer exportação HTML do site anterior nesta pasta.

### Bases de dados desportivas de terceiros (zerozero) — classe **D**, **não lidas**

O clube indicou o **zerozero** como fonte de mais informação sobre os jogadores (pesquisa por «jovalto», páginas 1 a 3). **Este projeto não conseguiu ler esse conteúdo:** o acesso automatizado devolveu **HTTP 403 Forbidden** em `zerozero.pt`, em `zerozero.co.ao` e em `ogol.com.br` (sites irmãos, com a mesma base de dados).

Consequências registadas:

- **Nada** do zerozero é reproduzido no sítio, nem sequer em resumo.
- Uma pesquisa pública indexada sugere a existência de uma página de equipa (`zerozero.pt/equipa/gd-jovalto/332291`) e de fichas individuais com épocas associadas. É um **indício não verificado** (classe **D**): não sustenta nenhuma afirmação do sítio.
- Para usar estes dados é necessária **leitura manual e confirmação**. Se forem transcritos, entram como classe **D** — ou classe **C** se o clube os validar.

A página `jogadores/` inclui apenas a lista fornecida pelo clube e um link externo claramente identificado como não verificado.

**Consequência registada:** não existindo base de comparação, as correções ao conteúdo anterior ficam classificadas como **declaração do clube** (classe C) e estão inventariadas em `docs/reconstruction-notes.md`.
