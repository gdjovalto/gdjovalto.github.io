# Publicação no GitHub Pages

## Endereço pretendido

Para publicar em **https://gdjovalto.github.io/**, o GitHub exige:

1. uma conta ou organização com o nome `gdjovalto`;
2. um repositório público pertencente a essa conta, chamado `gdjovalto.github.io`;
3. GitHub Pages configurado com a origem **GitHub Actions**.

O repositório `pedrosampaiolourenco-cmyk/Jovalto` pode ser usado para desenvolvimento,
mas o seu endereço padrão de Pages será
`https://pedrosampaiolourenco-cmyk.github.io/Jovalto/`, não o domínio pretendido.

## Publicação automática

O workflow `.github/workflows/pages.yml`:

- publica o conteúdo de `website/` sempre que há alterações no ramo `main`;
- inclui `AFL_documento_campeoes.pdf` no site publicado;
- desativa o processamento Jekyll;
- permite uma publicação manual no separador **Actions**.

## Pesquisa e substituição do Wix

Depois de o novo endereço estar publicado e verificado:

1. adicionar `https://gdjovalto.github.io/sitemap.xml` ao Google Search Console e ao Bing Webmaster Tools;
2. pedir a indexação da página inicial e das páginas principais;
3. manter o site Wix online durante a transição;
4. configurar no Wix redirecionamentos permanentes (HTTP 301) para as páginas equivalentes, se o plano e a configuração o permitirem;
5. atualizar perfis, diretórios e ligações externas para o novo endereço;
6. só retirar o Wix depois de os motores de pesquisa reconhecerem o novo site.

Não é possível eliminar diretamente resultados pertencentes ao Wix através do GitHub. A
substituição é feita por redirecionamentos, atualização das ligações e reindexação. Se não
for possível redirecionar, deve pedir-se a remoção do endereço antigo nas ferramentas dos
motores de pesquisa depois de o Wix deixar de servir o conteúdo.
