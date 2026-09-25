# Mural público

1. Criar um projeto em Supabase.
2. Executar `migrations/001_guestbook.sql` no SQL Editor.
3. Publicar a função: `supabase functions deploy guestbook --no-verify-jwt`.
4. Preencher `website/config/guestbook.js` com o URL do projeto e a chave `anon`.

A escrita só é feita pela função com a service role; o navegador nunca recebe essa chave. A função valida nome, mensagem, linguagem, frequência, tipo e tamanho do anexo.
