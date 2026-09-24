# Grupo Desportivo Jovalto — arquivo histórico digital

Sítio estático oficial do **Grupo Desportivo Jovalto**, fundado em **01/01/1965**, com sede histórica na Rua Freitas Gazul, 17-B, Campo de Ourique, Lisboa. A constituição legal de **29/06/1987** é um marco distinto da fundação.

## Princípios

- A exatidão histórica é mais importante do que a aparência de completude.
- Factos, memória de arquivo, fontes secundárias e investigação em curso permanecem distinguíveis.
- Informação desconhecida é apresentada como por determinar, por confirmar ou em investigação.
- A interface pública traduz proveniência para `Fonte`, `Tipo` e `Estado`; as classes internas A–D não são exibidas.
- Não existem frameworks, processo de compilação, analytics ou rastreadores.

## Arquitetura histórica

| Ficheiro | Responsabilidade |
| --- | --- |
| `data/clube.js` | identidade, datas, localização e sede histórica |
| `data/timeline.js` | cronologia desde 1965 |
| `data/people.js` | pessoas distintas e cautelas de identidade |
| `data/jogadores.js` | 45 registos individuais, épocas e estado da investigação |
| `data/seasons.js` | épocas 1987/88–1991/92, sem preencher campos desconhecidos |
| `data/venues.js` | distinção Tapadinha/Jamor |
| `data/honours.js` | três títulos oficiais da AFL |
| `data/gallery.js` | fotografia, equipamento e identificações do arquivo |
| `data/documents.js` | documentos oficiais e de trabalho |
| `data/sources.js` | catálogo de fontes públicas com metadados internos |

## Distinções históricas essenciais

- **1965** é a fundação; **1987** é a constituição jurídica publicada no Diário da República.
- A atividade futebolística organizada documentada é **Futebol de Veteranos**. Terminologia variável em bases externas não cria uma equipa sénior separada.
- A **Tapadinha** foi um recinto frequentemente utilizado; não era estádio próprio do Jovalto.
- Os jogos interempresas de 1965–1986 realizaram-se nos **campos de treino** do complexo do Estádio Nacional, no Jamor, não no campo principal.
- Atletismo e ciclismo correspondem a participações individuais com o emblema; não estão documentados como secções oficiais.
- As três imagens do emblema são representações do mesmo emblema histórico, não uma evolução de logótipos.

## Páginas e scripts

Cada página carrega apenas os dados necessários. `assets/js/main.js` mantém renderização comum, navegação móvel, filtro de jogadores e visualizador acessível da fotografia.

## Verificação

```powershell
powershell -ExecutionPolicy Bypass -File tools\check-integrity.ps1
powershell -ExecutionPolicy Bypass -File tools\apply-footer.ps1 -Check
```

O sítio funciona diretamente por `file://` e é publicado por GitHub Actions a partir de `website/`.

## Contribuições históricas

Novos dados devem indicar fonte, tipo de fonte, estado e, internamente, classe de evidência quando útil. Nunca preencher resultados, classificações, épocas, identidades ou relações por inferência silenciosa.
