# Tokens de design

## 1. Cores do clube — o que o sítio usa

**Vermelho e branco**, por declaração do clube (classe **C**, registada em `data/clube.js`).

| Token | Valor | Uso |
| --- | --- | --- |
| `--jv-vermelho` | `#D00A1E` | cor principal: faixa de abertura, cabeçalho de tabelas, botões, legendas de ano, ligações |
| `--jv-vermelho-escuro` | `#A50715` | estados *hover* |
| `--jv-branco` | `#FFFFFF` | fundos e texto sobre vermelho |

O vermelho `#D00A1E` foi **medido** por amostragem de pixéis em `Logos/logo_actual.png` (metade direita do escudo) — coincide com o vermelho da identidade do clube.

## 2. Cores do emblema — deliberadamente **não** usadas no sítio

O emblema histórico contém outras cores (medidas no mesmo ficheiro). Ficam documentadas por rigor, mas **não** são usadas como cores de interface:

| Família | Hex | Onde, no emblema |
| --- | --- | --- |
| azul | `#124FB3` | roda dentada |
| amarelo | `#F2B403` | letras G/D/J e orla do escudo |
| verde | `#046739` | metade esquerda do escudo |
| vermelho | `#D00A1E` | metade direita do escudo |
| preto | `#000000` | contornos, símbolo central e inscrição |
| branco | `#FFFFFF` | interior do escudo |

> **Correção registada:** uma primeira versão deste sítio usava o **azul** do emblema como cor principal. Isso estava errado — o azul pertence ao emblema, não ao clube. O sítio é vermelho e branco.

## 3. Neutros (decisão de design)

| Token | Valor | Uso |
| --- | --- | --- |
| `--jv-texto` | `#1A1A1A` | texto principal |
| `--jv-texto-suave` | `#5F5F5F` | legendas, textos secundários |
| `--jv-linha` | `#E3E3E3` | contornos e separadores |
| `--jv-fundo` | `#FFFFFF` | fundo base |
| `--jv-fundo-alt` | `#F7F7F7` | faixas alternadas, cartões de aviso |
| `--jv-escuro` | `#141414` | rodapé |

## 4. Contraste (WCAG 2.1)

| Fundo | Texto | Rácio | Nível |
| --- | --- | --- | --- |
| `#D00A1E` vermelho | `#FFFFFF` branco | 5,61:1 | AA |
| `#A50715` vermelho escuro | `#FFFFFF` branco | 7,95:1 | AAA |
| `#FFFFFF` branco | `#1A1A1A` quase-preto | 17,4:1 | AAA |
| `#FFFFFF` branco | `#D00A1E` vermelho (ligações) | 5,61:1 | AA |
| `#141414` rodapé | `#D8D8D8` cinza claro | 11,6:1 | AAA |

Todas as combinações usadas cumprem, no mínimo, **AA**.

## 5. Tipografia

Pilhas de fontes do sistema — funcionamento **offline**, sem CDN:

```
--jv-fonte-base: "Segoe UI", system-ui, -apple-system, Arial, sans-serif
--jv-fonte-mono: Consolas, "Courier New", monospace
```

| Token | Valor | Uso |
| --- | --- | --- |
| `--jv-t1` | `clamp(1.6rem, 1.2rem + 1.6vw, 2.2rem)` | título principal |
| `--jv-t2` | `clamp(1.25rem, 1.1rem + .8vw, 1.6rem)` | secções |
| `--jv-peq` | `0.875rem` | legendas e botões |
| `--jv-mini` | `0.78rem` | proveniência e rodapé |

Altura de linha `1.6`; medida de leitura máxima `65ch`.

## 6. Medidas

| Token | Valor |
| --- | --- |
| `--jv-largura` | `940px` |
| `--jv-raio` | `6px` |
| espaçamento de secção | `2.2rem` |
| breakpoint | **um só**: `760px` |

## 7. Simplicidade deliberada

- **Sem sombras, sem gradientes, sem animações** — hierarquia feita com cor, orlas de 1px e espaço.
- **Uma única folha de estilos**, `assets/css/main.css`, com **9,9 KB** (era 14,0 KB antes da simplificação, −29 %).
- **Sem bibliotecas** e sem chamadas de rede.
- **Etiquetas de evidência neutras** (cinza); apenas a classe **A** (documento oficial) se distingue, com contorno e texto vermelhos. Não se introduzem cores estranhas ao clube para codificar níveis.

## 8. Acessibilidade

- Foco visível: contorno escuro sobre fundo claro e **branco** sobre cabeçalho/rodapé.
- Página atual da navegação marcada com `aria-current="page"` **e** uma barra vermelha inferior (não depende só da cor).
- Etiquetas de evidência incluem sempre texto (A–D).
- Emblema do cabeçalho com `alt=""` (decorativo — o nome do clube está em texto ao lado); o emblema da faixa de abertura tem descrição.
- `prefers-reduced-motion` respeitado.
