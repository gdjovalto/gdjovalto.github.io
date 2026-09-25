# Publicação no GitHub Pages

## Regra de deployment

O deployment deve partir sempre do repositório local e ser registado no Git:

1. fazer as alterações dentro do repositório local `C:\Users\pedro\Desktop\Jovalto`;
2. testar localmente e executar `website/tools/check-integrity.ps1`;
3. confirmar os ficheiros alterados com `git status` e `git diff`;
4. criar um commit no ramo `main`;
5. enviar o commit com `git push origin main`;
6. confirmar que o workflow **Publicar site no GitHub Pages** terminou com sucesso;
7. verificar o conteúdo publicado em `https://gdjovalto.github.io/`.

Alterar apenas ficheiros locais não atualiza o site. Da mesma forma, o deployment não deve
ser feito a partir de ficheiros avulsos fora do repositório. O GitHub Pages publica a versão
de `website/` existente no último commit enviado para `origin/main`.

## Endereço pretendido

Para publicar em **https://gdjovalto.github.io/**, o GitHub exige:

1. uma conta ou organização com o nome `gdjovalto`;
2. um repositório público pertencente a essa conta, chamado `gdjovalto.github.io`;
3. GitHub Pages configurado com a origem **GitHub Actions**.

O repositório `pedrosampaiolourenco-cmyk/Jovalto` pode ser usado para desenvolvimento,
mas o seu endereço padrão de Pages será
`https://pedrosampaiolourenco-cmyk.github.io/Jovalto/`, não o domínio pretendido.

## Estado e publicação automática

O repositório público é `gdjovalto/gdjovalto.github.io` e o sítio está publicado em
`https://gdjovalto.github.io/`.

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
