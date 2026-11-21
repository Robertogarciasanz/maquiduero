// Desplegables para textos largos en el móvil.
// En una pantalla estrecha cada apartado (y sus subapartados) se pliega y solo se abre si se pulsa.
// En ordenador la página se ve entera, como antes.
// Para usarlo: el <main> de la página lleva la clase "desplegable".
(function () {
  var main = document.querySelector("main.desplegable");
  if (!main) return;
  var MOVIL = window.matchMedia("(max-width: 820px)");

  // Mete cada encabezado de nivel "nivel" y todo lo que sigue hasta el siguiente encabezado en un <details>.
  // El encabezado pasa al <summary>, así conserva su id (para los enlaces #privacidad, etc.).
  function agrupar(selector, cortar) {
    main.querySelectorAll(selector).forEach(function (h) {
      var detalle = document.createElement("details");
      detalle.className = "bloque-desplegable";
      var resumen = document.createElement("summary");
      h.parentNode.insertBefore(detalle, h);
      resumen.appendChild(h);
      detalle.appendChild(resumen);
      var n = detalle.nextSibling;
      while (n && !(n.nodeType === 1 && cortar.test(n.tagName))) {
        var siguiente = n.nextSibling;
        detalle.appendChild(n);
        n = siguiente;
      }
    });
  }

  // Abre los desplegables que contienen el apartado al que apunta la dirección (#id).
  function abrirDestino() {
    var id = location.hash.slice(1);
    var el = id && document.getElementById(id);
    if (!el) return;
    for (var d = el.closest("details"); d; d = d.parentElement && d.parentElement.closest("details")) d.open = true;
  }

  var agrupado = false;
  function ajustar() {
    if (!agrupado && MOVIL.matches) {
      agrupar("h3", /^H[123]$/);   // subapartados primero
      agrupar("h2", /^H[12]$/);    // luego los apartados, que incluyen a los anteriores
      agrupado = true;
      abrirDestino();
    }
    if (agrupado && !MOVIL.matches) {
      document.querySelectorAll(".bloque-desplegable").forEach(function (d) { d.open = true; });
    }
  }

  ajustar();
  window.addEventListener("hashchange", function () { if (agrupado) abrirDestino(); });
  MOVIL.addEventListener("change", ajustar);
})();
