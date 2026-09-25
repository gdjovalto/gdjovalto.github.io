create table if not exists public.guestbook_messages (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) between 2 and 80),
  mensagem text not null check (char_length(mensagem) between 3 and 2000),
  anexo_url text,
  ip_hash text not null,
  criado_em timestamptz not null default now(),
  visivel boolean not null default true
);

alter table public.guestbook_messages enable row level security;
create policy "Leitura pública de mensagens visíveis" on public.guestbook_messages for select using (visivel = true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('guestbook', 'guestbook', true, 10485760, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do nothing;
