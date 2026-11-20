(function () {
  var C = window.MQ_CONFIG;
  var M = window.MQ_MAQUINAS;

  // ---------- utilidades ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var PC = '<span class="pc">por confirmar</span>';
  // 2000 -> "2.000", 0.85 -> "0,85"
  function num(n) {
    var p = String(n).split(".");
    return p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (p[1] ? "," + p[1] : "");
  }
  function metros(v) { return v == null ? PC : num(v) + " m"; }
  function kg(v) { return v == null ? PC : num(v) + " kg"; }
  function val(v) { return v == null || v === "" ? PC : esc(v); }
  function fecha(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "long" });
  }
  var NOMBRE_TIPO = { nueva: "Nueva", ocasion: "Ocasión", alquiler: "Alquiler" };
  // Todas las máquinas se venden y se alquilan, salvo que lleven alquiler: false o venta: false.
  function modo(m) {
    if (m.alquiler === false) return "Solo venta";
    if (m.venta === false) return "Solo alquiler";
    return "Venta y alquiler";
  }
  // La pestaña no oculta máquinas: todas aparecen en todas. Solo pone primero las que encajan.
  function encaja(m, tipo) {
    if (tipo === "todas") return true;
    if (tipo === "alquiler") return m.venta !== false || m.tipo === "alquiler";
    return m.tipo === tipo;
  }

  function estadoTexto(m) {
    if (m.disponibilidad === "alquilada") return m.alquiladaHasta ? "Alquilada hasta el " + fecha(m.alquiladaHasta) : "Alquilada";
    if (m.disponibilidad === "reservada") return "Reservada";
    return "Disponible";
  }
  function enlaceWhatsApp(texto) {
    if (!C.whatsapp) return null;
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(texto);
  }

  // ---------- datos de contacto ----------
  document.querySelectorAll("[data-tel]").forEach(function (a) {
    a.href = "tel:" + C.telefonoLink;
    if (!a.textContent.trim()) a.textContent = C.telefono;
  });
  document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + C.email; a.textContent = C.email; });
  document.querySelectorAll("[data-direccion]").forEach(function (e) { e.textContent = C.direccion; });
  document.querySelectorAll("[data-horario]").forEach(function (e) { e.textContent = C.horario; });
  document.querySelectorAll("[data-empresa]").forEach(function (e) { e.textContent = C.empresa; });
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    var url = enlaceWhatsApp("Hola, os escribo desde la web.");
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  });
  var tira = document.getElementById("marcas-tira");
  if (tira) tira.innerHTML = C.marcas.map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");

  // ---------- catálogo ----------
  var filtro = { tipo: "todas", marca: null, ancho: null, peso: null, disponible: false };
  var rejilla = document.getElementById("rejilla");

  // Imagen ligera: el navegador elige la copia de 400 u 800 px según la pantalla (como mucho 800 px: la foto nunca se ve más grande).
  // Cada foto X.webp tiene sus copias X-400.webp y X-800.webp. Si faltan, se usa X.webp.
  function imgLigera(f, alt, tam) {
    var base = String(f).replace(/\.webp$/, "");
    var juego = base !== f ? ' srcset="' + esc(base) + '-400.webp 400w, ' + esc(base) + '-800.webp 800w" sizes="' + tam + '"' : "";
    return '<img src="' + esc(f) + '"' + juego + ' alt="' + esc(alt) + '" loading="lazy" decoding="async" onerror="if(this.srcset){this.removeAttribute(\'srcset\');this.src=this.getAttribute(\'src\')}">';
  }

  function foto(m) {
    var img = m.fotos && m.fotos[0]
      ? imgLigera(m.fotos[0], m.nombre, "(max-width: 600px) 92vw, 320px")
      : "Foto real de la unidad";
    return '<div class="foto" data-ficha="' + esc(m.id) + '" style="cursor:pointer" title="Ver características">' + img +
      '<span class="estado ' + m.disponibilidad + '">' + esc(estadoTexto(m)) + "</span>" +
      (m.ejemplo ? '<span class="ejemplo">Ejemplo</span>' : "") +
      caracteristicasLaterales(m) + "</div>";
  }

  // Panel lateral con las características, visible al pasar sobre la foto.
  function caracteristicasLaterales(m) {
    var filas = [];
    if (m.motor) filas.push(["Motor", m.motor]);
    if (m.peso != null) filas.push(["Peso", kg(m.peso)]);
    if (m.medidas && (m.medidas.ancho != null || m.medidas.alto != null || m.medidas.largo != null)) {
      filas.push(["Medidas", [m.medidas.ancho, m.medidas.alto, m.medidas.largo].map(function (x) { return x == null ? "—" : num(x); }).join(" × ") + " m"]);
    }
    if (m.horas != null) filas.push(["Horas", num(m.horas) + " h"]);
    if (m.anio) filas.push(["Año", String(m.anio)]);
    (m.extra || []).forEach(function (p) { if (p[1] != null) filas.push([p[0], p[1]]); });
    if (!filas.length) return "";
    return '<div class="caracteristicas" aria-hidden="true"><strong>Características</strong><dl>' +
      filas.map(function (f) { return "<dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd>"; }).join("") +
      "</dl></div>";
  }

  // Solo muestra las medidas que se conocen; si no hay ninguna, no pone filas vacías.
  // En la tarjeta solo lo esencial (2 datos: peso y ancho, o los 2 primeros datos técnicos).
  // Todas las características salen al pinchar en la foto o en «Ver ficha».
  function datosTarjeta(m) {
    var filas = [];
    if (m.peso != null) filas.push(["Peso", kg(m.peso)]);
    if (m.medidas.ancho != null) filas.push(["Ancho", metros(m.medidas.ancho)]);
    (m.extra || []).forEach(function (p) {
      if (p[1] == null || filas.length >= 2) return;
      if (/^Modelo$/i.test(p[0]) || (m.peso != null && /^Peso/i.test(p[0]))) return;
      filas.push([esc(p[0]), esc(p[1])]);
    });
    if (!filas.length) return "";
    return '<dl class="datos">' + filas.map(function (f) { return "<dt>" + f[0] + "</dt><dd>" + f[1] + "</dd>"; }).join("") + "</dl>";
  }

  function tarjeta(m) {
    var etiqueta = [m.tipo === "alquiler" ? null : NOMBRE_TIPO[m.tipo], modo(m), m.marca, m.anio, m.horas != null ? num(m.horas) + " h" : null]
      .filter(Boolean).map(esc).join(" · ");
    return '<article class="tarjeta">' + foto(m) +
      '<div class="cuerpo">' +
      '<span class="etiqueta">' + etiqueta + "</span>" +
      "<h3>" + esc(m.nombre) + "</h3>" +
      datosTarjeta(m) +
      '<div class="botones">' +
      '<button class="btn btn-secundario" data-ficha="' + esc(m.id) + '">Ver ficha</button>' +
      '<button class="btn btn-primario" data-preguntar="' + esc(m.id) + '">Preguntar</button>' +
      "</div></div></article>";
  }

  function pasa(m) {
    if (filtro.marca && m.marca !== filtro.marca) return false;
    if (filtro.disponible && m.disponibilidad !== "disponible") return false;
    // Si falta el dato no se puede asegurar que cumpla el filtro: se oculta.
    if (filtro.ancho != null && (m.medidas.ancho == null || m.medidas.ancho > filtro.ancho)) return false;
    if (filtro.peso != null && (m.peso == null || m.peso > filtro.peso)) return false;
    return true;
  }

  function pintar() {
    var lista = M.filter(pasa);
    lista = lista.filter(function (m) { return encaja(m, filtro.tipo); })
      .concat(lista.filter(function (m) { return !encaja(m, filtro.tipo); }));
    rejilla.innerHTML = lista.map(tarjeta).join("");
    document.getElementById("resultado").textContent = lista.length
      ? lista.length + (lista.length === 1 ? " máquina" : " máquinas") + (filtro.marca ? " de " + filtro.marca : "")
      : "Ninguna máquina cumple estos filtros (las que no tienen la medida confirmada no aparecen al filtrar por medida).";
  }

  function ponerTipo(tipo) {
    filtro.tipo = tipo;
    document.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("activo", c.dataset.tipo === tipo); });
  }
  document.querySelector(".chips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    ponerTipo(b.dataset.tipo);
    filtro.marca = null;
    pintar();
  });

  // ---------- menú: Productos / Ocasión / Alquiler filtran el catálogo ----------
  var TIPO_POR_ANCLA = { productos: "todas", ocasion: "ocasion", alquiler: "alquiler" };
  function segunAncla() {
    var a = location.hash.slice(1);
    if (!(a in TIPO_POR_ANCLA)) return;
    ponerTipo(TIPO_POR_ANCLA[a]);
    filtro.marca = null;
    pintar();
  }
  window.addEventListener("hashchange", segunAncla);

  // ---------- marcas ----------
  document.getElementById("rejilla-marcas").innerHTML = C.marcas.map(function (m) {
    return '<button type="button" class="marca" data-marca="' + esc(m) + '">' + esc(m) + "</button>";
  }).join("");
  document.getElementById("rejilla-marcas").addEventListener("click", function (e) {
    var b = e.target.closest("[data-marca]");
    if (!b) return;
    ponerTipo("todas");
    filtro.marca = b.dataset.marca;
    pintar();
    window.location.href = "productos.html";
  });

  // ---------- menú en el móvil ----------
  var botonMenu = document.querySelector(".boton-menu");
  var menu = document.getElementById("menu");
  botonMenu.addEventListener("click", function () {
    var abierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) { menu.classList.remove("abierto"); botonMenu.setAttribute("aria-expanded", "false"); }
  });
  document.getElementById("f-disponible").addEventListener("change", function (e) { filtro.disponible = e.target.checked; pintar(); });

  // ---------- ficha ----------
  var dialogo = document.getElementById("ficha");
  var contenido = document.getElementById("ficha-contenido");
  dialogo.querySelector(".cerrar").addEventListener("click", function () { dialogo.close(); });
  dialogo.addEventListener("click", function (e) { if (e.target === dialogo) dialogo.close(); });

  // Norma de Maquiduero (Roberto, 20/11/2026): sin conductor solo hasta 2.500 kg; los implementos se alquilan solos.
  function conductor(m) {
    if (m.categoria === "Implemento") return "No hace falta: el implemento se alquila solo";
    if (m.peso == null) return "Con o sin conductor hasta 2.500 kg; más pesada, con conductor";
    return m.peso <= 2500 ? "Con o sin conductor" : "Solo con conductor (más de 2.500 kg)";
  }

  function fila(k, v) { return "<tr><th>" + esc(k) + "</th><td>" + v + "</td></tr>"; }

  function abrirFicha(m) {
    var filas = [
      fila("Estado", esc(estadoTexto(m))),
      fila("Venta / alquiler", esc(modo(m))),
      fila("Alquiler con conductor", esc(conductor(m))),
      fila("Precio", '<a href="alquiler.html#tarifas-alquiler">Ver listado de precios</a>'),
      fila("Peso", kg(m.peso)),
      fila("Ancho", metros(m.medidas.ancho)),
      fila("Alto", metros(m.medidas.alto)),
      fila("Largo", metros(m.medidas.largo)),
      fila("Motor", val(m.motor))
    ];
    if (m.anio) filas.push(fila("Año", esc(m.anio)));
    if (m.horas != null) filas.push(fila("Horas", num(m.horas) + " h"));
    (m.extra || []).forEach(function (p) { filas.push(fila(p[0], val(p[1]))); });

    var galeria = m.fotos && m.fotos.length
      ? m.fotos.map(function (f) { return imgLigera(f, m.nombre, "160px"); }).join("")
      : '<div class="foto">Fotos reales: frente, lado, cabina, horómetro, orugas, cazo</div>';

    var faq = (m.faq || []).map(function (q) {
      return "<details><summary>" + esc(q[0]) + "</summary><p>" + esc(q[1]) + "</p></details>";
    }).join("");

    contenido.innerHTML =
      '<span class="etiqueta">' + esc(m.tipo === "alquiler" ? modo(m) : NOMBRE_TIPO[m.tipo] + " · " + modo(m)) + " · " + esc(m.categoria) + "</span>" +
      '<h2 id="ficha-titulo">' + esc(m.nombre) + "</h2>" +
      (m.resumen ? "<p>" + esc(m.resumen) + "</p>" : "") +
      (m.aclaracion ? '<p class="nota">' + esc(m.aclaracion) + "</p>" : "") +
      '<div class="galeria">' + galeria + "</div>" +
      "<table>" + filas.join("") + "</table>" +
      (faq ? "<h3>Preguntas frecuentes</h3>" + faq : "") +
      '<p class="botones" style="margin-top:16px"><button class="btn btn-primario" data-preguntar="' + esc(m.id) + '">Preguntar por esta máquina</button>' +
      '<a class="btn btn-secundario" href="tel:' + C.telefonoLink + '">Llamar</a></p>';
    dialogo.showModal();
  }

  function preguntar(m) {
    var texto = "Hola, quiero información sobre: " + m.nombre + " (ref. " + m.id + ").";
    var url = enlaceWhatsApp(texto);
    if (url) { window.open(url, "_blank", "noopener"); return; }
    if (dialogo.open) dialogo.close();
    document.getElementById("campo-maquina").value = m.nombre + " (ref. " + m.id + ")";
    document.getElementById("presupuesto").scrollIntoView();
  }

  document.addEventListener("click", function (e) {
    var f = e.target.closest("[data-ficha]");
    var p = e.target.closest("[data-preguntar]");
    var id = f ? f.dataset.ficha : p ? p.dataset.preguntar : null;
    if (!id) return;
    var m = M.find(function (x) { return x.id === id; });
    if (!m) return;
    if (f) abrirFicha(m); else preguntar(m);
  });

  // ---------- formulario de presupuesto (sin servidor: abre WhatsApp o el email) ----------
  var form = document.getElementById("form-presupuesto");

  var via = "whatsapp";
  form.querySelectorAll("button[data-via]").forEach(function (b) {
    b.addEventListener("click", function () { via = b.dataset.via; });
  });
  // Calendarios: no se eligen días pasados, "hasta" no puede ser antes de "desde",
  // y pinchar en cualquier parte del campo abre el calendario.
  var desde = form.querySelector('[name="desde"]'), hasta = form.querySelector('[name="hasta"]');
  function iso(f) { return f.getFullYear() + "-" + String(f.getMonth() + 1).padStart(2, "0") + "-" + String(f.getDate()).padStart(2, "0"); }
  function abrir(c) { if (c.showPicker) { try { c.showPicker(); } catch (er) {} } }
  if (desde && hasta) {
    desde.min = hasta.min = iso(new Date());
    [desde, hasta].forEach(function (c) { c.addEventListener("click", function () { abrir(c); }); });
    desde.addEventListener("change", function () {
      hasta.min = desde.value || desde.min;
      if (hasta.value && hasta.value < desde.value) hasta.value = "";
      if (desde.value && !hasta.value) { hasta.focus(); abrir(hasta); }
    });
  }
  function bonita(v) { if (!v) return "-"; var p = String(v).split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var texto = "Consulta de disponibilidad\n" +
      "Máquina: " + (d.get("maquina") || "-") + "\n" +
      "Fechas: del " + bonita(d.get("desde")) + " al " + bonita(d.get("hasta")) + "\n" +
      "Lugar de la obra: " + (d.get("lugar") || "-");
    var wa = enlaceWhatsApp(texto);
    if (via === "whatsapp" && wa) window.open(wa, "_blank", "noopener");
    else window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Presupuesto desde la web") + "&body=" + encodeURIComponent(texto);
  });


  // Secciones por tipo (Excavadoras, Implementos…): pintan las fichas de maquinas.js que se indiquen en data-ids.
  document.querySelectorAll("[data-ids]").forEach(function (el) {
    el.insertAdjacentHTML("beforeend", el.getAttribute("data-ids").split(",").map(function (id) {
      var m = M.filter(function (x) { return x.id === id.trim(); })[0];
      return m ? tarjeta(m) : "";
    }).join(""));
  });

  pintar();
  segunAncla();
})();
