import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "apikey, content-type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" };
const proibidas = ["puta", "caralho", "merda", "foda", "cabrao", "cabrão"];
const resposta = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const normalizar = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  if (req.method === "GET") {
    const { data, error } = await supabase.from("guestbook_messages").select("id,nome,mensagem,anexo_url,criado_em").eq("visivel", true).order("criado_em", { ascending: false }).limit(100);
    return error ? resposta({ error: "Não foi possível carregar o mural." }, 500) : resposta(data);
  }
  if (req.method !== "POST") return resposta({ error: "Método inválido." }, 405);
  const form = await req.formData();
  if (String(form.get("website") || "")) return resposta({ error: "Publicação recusada." }, 400);
  const nome = String(form.get("nome") || "").trim();
  const mensagem = String(form.get("mensagem") || "").trim();
  if (nome.length < 2 || nome.length > 80 || mensagem.length < 3 || mensagem.length > 2000) return resposta({ error: "Verifique o nome e a mensagem." }, 400);
  const texto = normalizar(nome + " " + mensagem);
  if (proibidas.some((p) => new RegExp("(^|\\W)" + normalizar(p) + "(\\W|$)", "i").test(texto))) return resposta({ error: "A mensagem contém linguagem não permitida." }, 400);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "desconhecido";
  const hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip)))).map((b) => b.toString(16).padStart(2, "0")).join("");
  const desde = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { count } = await supabase.from("guestbook_messages").select("id", { count: "exact", head: true }).eq("ip_hash", hash).gte("criado_em", desde);
  if ((count || 0) >= 3) return resposta({ error: "Limite temporário de publicações atingido." }, 429);

  let anexo_url: string | null = null;
  const anexo = form.get("anexo");
  if (anexo instanceof File && anexo.size) {
    const permitidos = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!permitidos.includes(anexo.type) || anexo.size > 10485760) return resposta({ error: "Tipo ou tamanho de anexo inválido." }, 400);
    const ext = anexo.name.split(".").pop()?.toLowerCase() || "bin";
    const caminho = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("guestbook").upload(caminho, anexo, { contentType: anexo.type, upsert: false });
    if (error) return resposta({ error: "Não foi possível guardar o anexo." }, 500);
    anexo_url = supabase.storage.from("guestbook").getPublicUrl(caminho).data.publicUrl;
  }
  const { error } = await supabase.from("guestbook_messages").insert({ nome, mensagem, anexo_url, ip_hash: hash });
  return error ? resposta({ error: "Não foi possível publicar." }, 500) : resposta({ ok: true }, 201);
});
