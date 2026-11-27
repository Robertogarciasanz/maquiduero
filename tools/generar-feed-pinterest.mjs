// Genera el feed de catálogo para Pinterest (feed-pinterest.tsv) a partir de js/maquinas.js.
// Uso: node tools/generar-feed-pinterest.mjs
//
// Pinterest pide URL pública del feed: una vez publicada la web, el archivo queda en
// https://mqduero.es/feed-pinterest.tsv  (dar esa URL en Pinterest: Catálogo > Añadir fuente de datos > Programado).
//
// Solo entran las máquinas en venta (tipo "nueva" u "ocasion") con precio numérico, foto y marca.
// Lo que se queda fuera se lista al ejecutar el script, con el motivo. No se inventa ningún precio:
// si una máquina no tiene precio en js/maquinas.js, no sale en el feed.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://mqduero.es";
const SALIDA = join(RAIZ, "feed-pinterest.tsv");

// Cargar el catálogo sin tocar el código de la web.
const ventana = {};
vm.runInNewContext(readFileSync(join(RAIZ, "js/maquinas.js"), "utf8"), { window: ventana });
const maquinas = ventana.MQ_MAQUINAS || [];

const CABECERA = [
  "id", "title", "description", "link", "image_link", "availability",
  "price", "brand", "condition", "product_type",
];

// Pinterest: título máx. 500 caracteres aquí lo acotamos a 100 por seguridad; descripción máx. 500.
const limpiar = (texto) => String(texto ?? "").replace(/[\t\r\n]+/g, " ").replace(/\s+/g, " ").trim();
const recortar = (texto, max) => (texto.length > max ? texto.slice(0, max - 1).trimEnd() + "…" : texto);

const incluidas = [];
const excluidas = [];

for (const m of maquinas) {
  const motivos = [];
  if (m.tipo !== "nueva" && m.tipo !== "ocasion") motivos.push("solo alquiler");
  if (typeof m.precio !== "number" || !(m.precio > 0)) motivos.push("sin precio de venta");
  if (!m.marca) motivos.push("sin marca");
  if (!Array.isArray(m.fotos) || !m.fotos.length) motivos.push("sin foto");

  if (motivos.length) {
    excluidas.push(`${m.id}: ${motivos.join(", ")}`);
    continue;
  }

  incluidas.push([
    m.id,
    recortar(limpiar(m.nombre), 100),
    recortar(limpiar(m.resumen || m.nombre), 500),
    `${BASE}/productos.html#catalogo`,
    `${BASE}/${m.fotos[0]}`,
    m.disponibilidad === "disponible" ? "in stock" : "out of stock",
    `${m.precio.toFixed(2)} EUR`,
    limpiar(m.marca),
    m.tipo === "nueva" ? "new" : "used",
    limpiar(m.categoria || ""),
  ].map(limpiar));
}

const lineas = [CABECERA, ...incluidas].map((fila) => fila.join("\t"));
writeFileSync(SALIDA, lineas.join("\n") + "\n", "utf8");

console.log(`Feed escrito en ${SALIDA}`);
console.log(`Productos incluidos: ${incluidas.length} de ${maquinas.length}`);
if (excluidas.length) {
  console.log("Excluidos:");
  for (const e of excluidas) console.log(`  - ${e}`);
}
