// Catálogo de máquinas. Cada máquina es un bloque { ... }.
// Para añadir una máquina: copia un bloque, cambia los datos y pon sus fotos en web/img/maquinas/.
// Medidas en metros, pesos en kg. Deja null lo que no se sepa: la web mostrará "por confirmar".
//
// tipo:           "nueva" | "ocasion" | "alquiler"
//                 Las nuevas y de ocasión también se alquilan (se venden o se alquilan, a elección del cliente).
//                 Pon alquiler: false en una máquina que sea solo de venta.
// disponibilidad: "disponible" | "alquilada" | "reservada"   (más adelante lo rellenará la app GPS)
// alquiladaHasta: "2026-12-15" si está alquilada
// precio:         número en € (venta) o null
// tarifa:         { dia, semana, mes } en € para alquiler, o null
// fotos:          lista de rutas, p. ej. ["img/maquinas/bobcat-e17-1.webp"]

window.MQ_MAQUINAS = [
  {
    id: "bobcat-e17",
    nombre: "Miniexcavadora Bobcat E17",
    categoria: "Miniexcavadora",
    marca: "Bobcat",
    tipo: "ocasion",
    disponibilidad: "disponible",
    anio: 2024,
    horas: 582,
    precio: null,
    tarifa: null,
    medidas: { ancho: 0.98, alto: 2.30, largo: 3.67 },
    peso: 2000,
    motor: "Yanmar 3TNV74 diesel, 11 kW a 2.400 rpm",
    extra: [
      ["Peso en vacío", "1.700 kg"],
      ["Peso operativo de fábrica", "1.711 kg (catálogo)"],
      ["Profundidad de excavación", "225 cm (catálogo)"],
      ["Alcance máximo", "387 cm (catálogo)"],
      ["Ancho con orugas extendidas", "136 cm (catálogo)"],
      ["Peso en operación", "unos 2.000 kg (con accesorios)"],
      ["Accesorios", "Cuchilla, cazo de limpieza y dos cazos para zanjas"],
      ["Orugas", "Ancho variable (ancho mínimo por confirmar)"],
      ["Manual", "PDF disponible en la web actual"]
    ],
    faq: [
      ["¿Cabe por una puerta normal?", "Por confirmar el ancho mínimo con las orugas recogidas."],
      ["¿La puedo llevar en mi remolque?", "Pesa unos 2.000 kg en operación. Hace falta un remolque que admita ese peso; consúltanos el carné necesario."],
      ["¿Cuántas horas tiene?", "582 horas reales (año 2024)."]
    ],
    // Foto real de Roberto (20/11/2026). Las de prueba se quitaron el 20/11/2026.
    fotos: ["img/maquinas/bobcat-e17-nave.webp"]
  },
  {
    id: "ausa-d201rhgs",
    nombre: "Dumper diésel AUSA D201RHGS",
    categoria: "Dumper",
    marca: "AUSA",
    tipo: "nueva",
    disponibilidad: "disponible",
    anio: null,
    horas: null,
    precio: null,
    tarifa: null,
    // Datos facilitados por Roberto (20/11/2026). Alto = con el arco abatido (para transporte).
    medidas: { ancho: 1.50, alto: 1.915, largo: 3.38 },
    peso: 1920,
    motor: "Diésel, 18,5 kW (catálogo AUSA)",
    extra: [
      ["Carga útil", "2.000 kg"],
      ["Peso en vacío", "1.920 kg"],
      ["Peso máximo cargado (PMA)", "3.920 kg"],
      ["Tolva (agua / rasa / colmada)", "705 / 945 / 1.310 litros"],
      ["Descarga", "Tolva giratoria 180°, hidráulica, con pala autocargable"],
      ["Altura con arco levantado", "258 cm (abatido: 191,5 cm)"],
      ["Altura de carga (borde de tolva)", "125 cm"],
      ["Altura máxima de descarga", "164 cm"],
      ["Distancia entre ejes", "168 cm"],
      ["Altura libre al suelo", "26 cm"],
      ["Radio de giro exterior", "330 cm"],
      ["Transmisión", "Hidrostática 4x4 (catálogo AUSA)"],
      ["Velocidad máxima", "20 km/h"]
    ],
    faq: [
      ["¿Cabe por una puerta?", "Necesita un hueco de al menos 150 cm de ancho y 192 cm de alto con el arco abatido."],
      ["¿La puedo llevar en mi remolque?", "Pesa 1.920 kg en vacío. Hace falta un remolque que admita ese peso; consúltanos el carné necesario."],
      ["¿Cuánto carga?", "2.000 kg, con una tolva de 945 litros rasa y 1.310 colmada."]
    ],
    // Foto de la nave sacada de la web antigua (pequeña). Repuesta el 20/11/2026: Roberto quiere que ninguna ficha quede sin foto.
    fotos: ["img/maquinas/ausa-d201-maquiduero.webp"]
  },
  {
    // Fotos reales de Roberto (20/11/2026). Modelo leído en el rótulo. Faltan los datos técnicos.
    id: "ausa-d150rm-plus",
    nombre: "Dumper AUSA D150RM plus",
    categoria: "Dumper",
    marca: "AUSA",
    tipo: "nueva",
    disponibilidad: "disponible",
    resumen: "Dumper AUSA nuevo, con arco de seguridad con techo, rotativo y matrícula.",
    aclaracion: "Datos del catálogo AUSA (versión 4x2). Medidas exactas por confirmar.",
    anio: null, horas: null, precio: null, tarifa: null,
    medidas: { ancho: null, alto: null, largo: null },
    peso: 950,
    motor: "Hatz 1D90Z diésel, 11,3 kW",
    extra: [
      ["Modelo", "D150RM plus"],
      ["Carga útil", "1.500 kg"],
      ["Peso en vacío", "950 kg"],
      ["Tolva (agua / rasa / colmada)", "608 / 868 / 1.047 litros"],
      ["Descarga", "Frontal, a baja altura"],
      ["Tracción", "4x2, cambio mecánico de 4 marchas"],
      ["Velocidad máxima", "21 km/h"],
      ["Pendiente máxima", "30 %"],
      ["Radio de giro exterior", "347 cm"],
      ["Neumáticos", "7.50-16 delante, 145/80 R13 detrás"]
    ],
    faq: [
      ["¿La puedo llevar en mi remolque?", "Pesa 950 kg en vacío: cabe en un remolque que admita ese peso."],
      ["¿Cuánto carga?", "1.500 kg, con una tolva de 868 litros rasa y 1.047 colmada."]
    ],
    fotos: ["img/maquinas/ausa-d150rm-plus-1.webp", "img/maquinas/ausa-d150rm-plus-2.webp", "img/maquinas/ausa-d150rm-plus-3.webp"]
  },
  {
    // Foto real de Roberto (20/11/2026), en la nave con el logo de Maquiduero. Modelo leído en el rótulo. Faltan datos de la unidad.
    id: "kobelco-sk85msr",
    nombre: "Excavadora Kobelco SK85MSR",
    categoria: "Excavadora",
    marca: "Kobelco",
    tipo: "alquiler",
    disponibilidad: "disponible",
    resumen: "Excavadora de unas 8,8 t de radio corto: la parte de atrás casi no sobresale al girar, así que trabaja junto a muros y en calles estrechas. Cabina cerrada y orugas de goma.",
    aclaracion: "Se vende y se alquila (Roberto, 20/11/2026). Datos del catálogo Kobelco. Año, horas y precio por confirmar.",
    anio: null, horas: null, precio: null, tarifa: null,
    // Datos del catálogo Kobelco Europe (SK85MSR-7, 2024), con balancín estándar de 1,87 m.
    medidas: { ancho: 2.30, alto: 2.57, largo: 6.73 },
    peso: 8840,
    motor: "Yanmar 4TNV98CT diésel, 52,3 kW",
    extra: [
      ["Peso según orugas", "8.480–9.310 kg (8.840 kg con tejas de goma)"],
      ["Profundidad de excavación", "418 cm (444 cm con balancín largo)"],
      ["Alcance a ras de suelo", "707 cm"],
      ["Altura de descarga", "498 cm"],
      ["Radio de giro trasero", "165 cm (radio corto)"],
      ["Orugas", "45 cm de ancho"],
      ["Velocidad", "2,7 / 5,0 km/h"],
      ["Cazo", "0,11–0,35 m³ según cazo"],
      ["Cabina", "Cerrada, con rotativo"],
      ["Cazos y enganche", null]
    ],
    faq: [
      ["¿Cómo se transporta?", "Pesa unos 8.800 kg: necesita camión o góndola, no vale un remolque de turismo. Te la llevamos nosotros."],
      ["¿Cabe por un hueco estrecho?", "Necesita al menos 230 cm de ancho y 257 cm de alto."]
    ],
    fotos: ["img/maquinas/kobelco-sk85msr.webp"]
  },
  {
    // Foto real de Roberto (20/11/2026), en la nave. Modelo leído en el rótulo. Faltan datos de la unidad.
    id: "bobcat-e26",
    nombre: "Miniexcavadora Bobcat E26",
    categoria: "Miniexcavadora",
    marca: "Bobcat",
    tipo: "alquiler",
    venta: false, // máquina de la flota de alquiler; confirmar si también se vende
    disponibilidad: "disponible",
    resumen: "Miniexcavadora de unas 2,5 t con giro de voladizo reducido: trabaja pegada a muros y en sitios estrechos. Con techo abierto, cuchilla y varios cazos.",
    aclaracion: "Datos de catálogo de la versión actual (Stage V); varían poco con la anterior. Año, horas y versión exacta por confirmar.",
    anio: null, horas: null, precio: null, tarifa: null,
    // Medidas de transporte (catálogo): ancho con la cuchilla, alto hasta el techo, largo plegada.
    medidas: { ancho: 1.50, alto: 2.41, largo: 4.17 },
    peso: 2490,
    motor: "Diésel 3 cilindros, unos 15 kW (20 CV)",
    extra: [
      ["Peso con cabina cerrada", "2.608 kg (esta unidad lleva techo abierto: aprox. 2.490 kg)"],
      ["Profundidad de excavación", "257 cm"],
      ["Alcance a ras de suelo", "Aprox. 455 cm"],
      ["Altura de descarga", "Aprox. 285–306 cm"],
      ["Giro", "Voladizo reducido; pluma gira 60° a cada lado"],
      ["Orugas", "De goma, 25–30 cm de ancho"],
      ["Línea auxiliar", "Sí, para martillo o ahoyador (48–54 l/min)"],
      ["Velocidad", "2,4 / 4,5 km/h"],
      ["Puesto", "Techo abierto (sin cabina cerrada)"],
      ["Cazos y enganche", null]
    ],
    faq: [
      ["¿La puedo llevar en mi remolque?", "Sí, en un remolque de 3.500 kg de MMA (contando lo que pesa el propio remolque)."],
      ["¿Cabe por una puerta?", "Necesita un hueco de al menos 150 cm de ancho y 241 cm de alto."]
    ],
    fotos: ["img/maquinas/bobcat-e26.webp"]
  },
  {
    // Foto real de Roberto (20/11/2026). Dumper usado de la flota; el modelo no se lee en la foto.
    id: "ausa-dumper-alquiler",
    nombre: "Dumper AUSA de alquiler",
    categoria: "Dumper",
    marca: "AUSA",
    tipo: "alquiler",
    venta: false, // máquina de la flota de alquiler; confirmar si también se vende
    disponibilidad: "disponible",
    resumen: "Dumper AUSA 4x4 de descarga frontal, con arco de seguridad con techo.",
    aclaracion: "Modelo, carga, peso y medidas por confirmar con la chapa.",
    anio: null, horas: null, precio: null, tarifa: null,
    medidas: { ancho: null, alto: null, largo: null },
    peso: null,
    motor: null,
    extra: [
      ["Modelo", null],
      ["Tracción", "4x4"],
      ["Descarga", "Frontal"],
      ["Carga útil", null]
    ],
    faq: [],
    fotos: ["img/maquinas/ausa-dumper-alquiler.webp"]
  },
  {
    // Foto real de Roberto (20/11/2026). Identificada por la foto; confirmar qué es y para qué máquinas sirve.
    id: "placa-enganche-minicargadora",
    nombre: "Placa de enganche rápido para minicargadora",
    categoria: "Implemento",
    marca: null,
    tipo: "alquiler",
    venta: false, // implemento de alquiler
    disponibilidad: "disponible",
    resumen: "Placa de enganche rápido universal para montar implementos en la minicargadora.",
    aclaracion: "Peso y compatibilidad por confirmar.",
    anio: null, horas: null, precio: null, tarifa: null,
    medidas: { ancho: null, alto: null, largo: null },
    peso: null,
    motor: null,
    extra: [
      ["Enganche", "Acople rápido universal de minicargadora (tipo Bob-Tach)"],
      ["Compatibilidad", null]
    ],
    faq: [],
    fotos: ["img/maquinas/placa-enganche-minicargadora.webp"]
  },
  {
    // Datos de referencia de Roberto (20/11/2026): valores típicos de la gama, no de la unidad.
    id: "ahoyador-minicargadora",
    nombre: "Ahoyador hidráulico para minicargadora",
    categoria: "Implemento",
    marca: null,
    tipo: "alquiler",
    venta: false, // implemento de alquiler
    disponibilidad: "disponible",
    resumen: "Barrena hidráulica para hacer hoyos de postes, vallas y plantaciones con una minicargadora.",
    aclaracion: "Datos orientativos de esta gama. Marca, modelo, peso y broca por confirmar con la chapa.",
    anio: null, horas: null, precio: null, tarifa: null,
    medidas: { ancho: null, alto: null, largo: null },
    peso: null,
    motor: "Hidráulico (circuito auxiliar de la minicargadora)",
    extra: [
      ["Enganche", "Acople rápido universal de minicargadora"],
      ["Diámetro de broca", null],
      ["Caudal", "35–75 l/min"],
      ["Presión", "200–240 bar"],
      ["Par", "2.000–3.000 Nm"],
      ["Giro", "40–75 rpm"],
      ["Profundidad", "1,20–1,50 m sin alargadera"],
      ["Conexión", "2 latiguillos con enchufes rápidos de cara plana"]
    ],
    faq: [],
    // Recorte provisional de la foto de la estantería (20/11/2026). Cambiar por una foto propia del ahoyador.
    fotos: ["img/maquinas/ahoyador-minicargadora.webp"]
  },
  {
    // Datos de Roberto (20/11/2026) a partir de la foto. Medir el tambor y leer la chapa.
    id: "rodillo-minicargadora",
    nombre: "Rodillo vibratorio para minicargadora",
    categoria: "Implemento",
    marca: null,
    tipo: "alquiler",
    venta: false, // implemento de alquiler
    disponibilidad: "disponible",
    resumen: "Rodillo de tambor liso que se engancha delante de la minicargadora. La vibración es hidráulica; el peso y el avance los pone la máquina.",
    aclaracion: "Ancho del tambor, peso y caudal por confirmar con la chapa.",
    anio: null, horas: null, precio: null, tarifa: null,
    medidas: { ancho: null, alto: null, largo: null },
    peso: null,
    motor: "Vibración hidráulica (circuito auxiliar de la minicargadora)",
    extra: [
      ["Tambor", "Liso, de acero"],
      ["Ancho del tambor", "Aprox. 180–210 cm (por confirmar)"],
      ["Caudal", null],
      ["Enganche", "Acople rápido universal tipo Bob-Tach"],
      ["Amortiguación", "Tacos de goma antivibración (silentblocks)"],
      ["Usos", "Zahorras, caminos, zanjas anchas, aparcamientos, aceras, naves y parcheo de asfalto"]
    ],
    faq: [],
    // Foto original de Roberto (20/11/2026): es el equipo negro del centro. Pequeña (512 px).
    fotos: ["img/maquinas/rodillo-minicargadora.webp"]
  },
  {
    // Datos de referencia de Roberto (20/11/2026): hay tres anchos (54", 60" y 72"). Medir el cepillo.
    id: "bobcat-barredora",
    nombre: "Barredora recogedora Bobcat para minicargadora",
    categoria: "Implemento",
    marca: "Bobcat",
    tipo: "alquiler",
    venta: false, // implemento de alquiler
    disponibilidad: "disponible",
    resumen: "Barredora original Bobcat con cajón recogedor y cepillo lateral cunetero para bordillos y esquinas. Barre hacia delante y hacia atrás.",
    aclaracion: "Hay tres anchos de fábrica; el de esta unidad está por confirmar midiendo el cepillo.",
    anio: null, horas: null, precio: null, tarifa: null,
    medidas: { ancho: null, alto: null, largo: null },
    peso: null,
    motor: "Hidráulico (circuito auxiliar estándar de la minicargadora)",
    extra: [
      ["Ancho de barrido", "137, 152 o 183 cm según modelo (por confirmar)"],
      ["Ancho total", "148, 168 o 199 cm según modelo"],
      ["Peso", "349, 448 o 501 kg según modelo"],
      ["Cajón", "230, 340 o 410 litros según modelo"],
      ["Cepillo", "54,4 cm de diámetro, 145–215 rpm"],
      ["Cepillo lateral", "Sí, cunetero (bordillos y esquinas)"],
      ["Caudal hidráulico", "35–65 l/min (el más ancho, 45–75 l/min)"],
      ["Compatible con", "Minicargadoras con hidráulico auxiliar estándar (Bobcat S130 a S530)"],
      ["Enganche", "Bob-Tach, enchufes rápidos de cara plana"]
    ],
    faq: [],
    // Foto original de Roberto (20/11/2026). Es pequeña (512 px): si hay otra mejor, cambiarla.
    fotos: ["img/maquinas/barredora-bobcat.webp"]
  },
  {
    id: "ausa-electrico",
    nombre: "Dumper eléctrico AUSA D151AEG",
    categoria: "Dumper",
    marca: "AUSA",
    tipo: "nueva",
    disponibilidad: "disponible",
    resumen: "Dumper 100 % eléctrico, sin humos ni ruido: sirve para interiores, sótanos y obras en casco urbano. Tolva giratoria y tracción 4x4.",
    aclaracion: "Datos del catálogo AUSA del D151AEG (el eléctrico más grande de AUSA). Confirmar el modelo con la chapa. Foto de catálogo del fabricante.",
    anio: null, horas: null, precio: null, tarifa: null,
    medidas: { ancho: null, alto: null, largo: null },
    // Corregido el 20/11/2026: antes tenía por error los datos del D201RHGS diésel (1.920 kg, 2 t).
    peso: 1530,
    motor: "Eléctrico, 19,6 kW máx. (7,6 kW nominal)",
    extra: [
      ["Carga útil", "1.500 kg"],
      ["Peso en vacío", "1.530 kg"],
      ["Tolva (agua / rasa / colmada)", "520 / 626 / 900 litros"],
      ["Descarga", "Tolva giratoria"],
      ["Batería", "Litio, 9,3 kWh (51,2 V)"],
      ["Autonomía", "Una jornada de trabajo intensa"],
      ["Carga de batería", "20–80 % en 2 h a 230 V (1 h con cargador rápido de 400 V)"],
      ["Tracción", "4x4, chasis articulado"],
      ["Velocidad máxima", "14 km/h"],
      ["Pendiente máxima", "35 %"],
      ["Radio de giro exterior", "339 cm"],
      ["Neumáticos", "10.0/75-15.3"]
    ],
    faq: [
      ["¿La puedo llevar en mi remolque?", "Pesa 1.530 kg en vacío. Hace falta un remolque que admita ese peso; consúltanos el carné necesario."],
      ["¿Cuánto carga?", "1.500 kg, con una tolva de 626 litros rasa y 900 colmada."],
      ["¿Dónde se carga?", "En un enchufe normal de 230 V: del 20 al 80 % en unas 2 horas."]
    ],
    fotos: ["img/maquinas/ausa-d151aeg.webp"]
  },
  {
    id: "ausa-gran-tonelaje",
    nombre: "Dumper AUSA DR 1001 AHG (10 t)",
    categoria: "Dumper",
    marca: "AUSA",
    tipo: "nueva",
    disponibilidad: "disponible",
    anio: null, horas: null, precio: null, tarifa: null,
    // Medidas de transporte: alto = arco abatido / cabina (3,38 m). Datos facilitados por Roberto el 19/11/2026.
    medidas: { ancho: 2.41, alto: 3.38, largo: 5.02 },
    peso: 5050,
    motor: "Deutz TCD 3.6 L4, 55,4 kW a 2.200 rpm (catálogo)",
    extra: [
      ["Carga útil", "10.000 kg (10 t)"],
      ["Peso en vacío", "5.050 kg (con cabina cerrada)"],
      ["Peso máximo cargado (PMA)", "15.050 kg"],
      ["Tolva colmada", "3.900 l (3,9 m³)"],
      ["Tolva rasa", "3.300 l (3,3 m³)"],
      ["Tolva con agua", "1.850 l"],
      ["Tipo", "Reversible, articulado; asiento giratorio 180°"],
      ["Tolva", "Giratoria 180° con descarga en altura"],
      ["Transmisión", "Hidrostática 4x4 permanente"],
      ["Cabina", "Cerrada"],
      ["Longitud total", "5,02 m (tolva en posición estándar)"],
      ["Anchura total", "2,41 m (neumáticos 500/60-22.5)"],
      ["Altura con arco ROPS desplegado", "3,64 m"],
      ["Altura con arco abatido / cabina", "3,38 m (para transporte o pasos bajos)"],
      ["Altura máxima con tolva elevada", "5,14 m (descarga frontal máxima)"],
      ["Altura de carga (borde de tolva)", "1,82 m"],
      ["Distancia entre ejes", "2,69 m (chasis articulado y oscilante)"],
      ["Ancho de vía", "1,92 m"],
      ["Altura libre al suelo", "0,41 m"],
      ["Radio de giro exterior", "6,29 m"]
    ],
    faq: [
      ["¿Cabe por una puerta o paso bajo?", "Necesita un hueco de al menos 2,41 m de ancho y 3,38 m de alto con el arco abatido."],
      ["¿La puedo llevar en mi remolque?", "Pesa 5.050 kg en vacío. Hace falta un remolque o góndola que admita ese peso y 2,41 m de ancho; consúltanos el transporte."],
      ["¿Cuánto carga?", "10 t de carga útil, con una tolva de 3,3 m³ rasa y 3,9 m³ colmada."]
    ],
    // Foto de catálogo del fabricante (pequeña). Cambiar por una real cuando la haya.
    fotos: ["img/maquinas/ausa-gran-tonelaje.webp"]
  }
];
