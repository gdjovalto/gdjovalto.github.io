<!-- ==========================================================================
     Rodapé comum das páginas interiores do sítio do GD Jovalto.

     {{P}} é substituído pelo prefixo relativo à raiz:
       - páginas na raiz  -> ""
       - páginas em subpasta -> "../"

     Este ficheiro é usado por tools/apply-footer.ps1. Não é servido ao
     navegador: serve apenas para manter o rodapé das páginas sincronizado.
     A página inicial (index.html) tem o rodapé já escrito no próprio ficheiro.
     ========================================================================== -->
<footer class="site-footer">
  <div class="wrap site-footer__grid">
    <div>
      <h2>Grupo Desportivo Jovalto</h2>
      <p>Clube de futebol de veteranos, fundado em 1965. Três títulos da Associação de Futebol de Lisboa: 1988/89, 1989/90 e 1991/92.</p>
      <p>Sítio estático, sem dependências externas nem rastreio.</p>
    </div>
    <div>
      <h2>Navegação</h2>
      <ul>
        <li><a href="{{P}}index.html">Início</a></li>
        <li><a href="{{P}}clube/index.html">Clube</a></li>
        <li><a href="{{P}}jogadores/index.html">Jogadores</a></li>
        <li><a href="{{P}}palmares/index.html">Palmarés</a></li>
        <li><a href="{{P}}arquivo/index.html">Arquivo</a></li>
        <li><a href="{{P}}contactos/index.html">Contactos</a></li>
      </ul>
    </div>
    <div>
      <h2>Fontes</h2>
      <p>Os factos históricos são acompanhados pela respetiva fonte. Informação ainda não confirmada é claramente assinalada.</p>
      <p><a href="{{P}}arquivo/index.html">Consultar documentos e fontes</a></p>
    </div>
  </div>
  <div class="wrap site-footer__nota">
    <p>O conteúdo histórico é publicado com indicação da fonte. Onde não existe confirmação suficiente, a informação é marcada como <strong>por confirmar</strong>.</p>
    <p>© 1965–<span id="ano-atual">2026</span> Grupo Desportivo Jovalto.</p>
  </div>
</footer>

<script src="{{P}}data/clube.js"></script>
<script src="{{P}}data/jogadores.js"></script>
<script src="{{P}}data/sources.js"></script>
<script src="{{P}}data/honours.js"></script>
<script src="{{P}}data/timeline.js"></script>
<script src="{{P}}data/people.js"></script>
<script src="{{P}}data/gallery.js"></script>
<script src="{{P}}data/documents.js"></script>
<script src="{{P}}assets/js/main.js"></script>
</body>
</html>
