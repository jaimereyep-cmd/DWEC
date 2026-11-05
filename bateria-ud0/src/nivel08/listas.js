// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 8 · Listas de objetos: find, filter, map y reduce
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 8
//  Comprobar: docker compose run --rm web npm run comprobar 8
// ═══════════════════════════════════════════════════════════════════════════════════════════
// Una tienda guarda sus productos en una LISTA DE OBJETOS (como la práctica 1):
//   [ { nombre: "Teclado", precio: 25, stock: 4, categoria: "periféricos" }, { … }, … ]
//
// Cuatro herramientas que hacen el bucle por ti. Reciben una función flecha que se aplica a cada elemento (p):
//   lista.find((p) => p.nombre === "Ratón")      → el PRIMERO que cumple (o undefined)
//   lista.filter((p) => p.precio < 20)           → una lista NUEVA con todos los que cumplen
//   lista.map((p) => p.nombre)                   → una lista NUEVA con lo que devuelve la flecha para cada uno
//   lista.reduce((total, p) => total + p.precio, 0) → un solo valor: va acumulando, empezando en 0
// Las cuatro dejan la lista original como estaba. Puedes hacerlo con for…of si lo prefieres: también vale.

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // [1, 2, 3].map((n) => n * 2)
  p2: undefined, // [1, 2, 3, 4].filter((n) => n > 2)
  p3: undefined, // [5, 8, 12].find((n) => n > 6)
  p4: undefined, // [1, 2, 3].reduce((suma, n) => suma + n, 0)
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function nombres(productos) {
  return productos.map((p) => p.nombre);
}
export function agotados(productos) {
  return productos.filter((p) => p.stock === 0);
}

// 🔁 REPASO DEL NIVEL 7 ───────────────────────────────────────────────────────────────────────
// 🔁 8.r · etiqueta(producto): "Teclado · 25 €"
export function etiqueta(producto) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 8.1 · baratos(productos, maximo): los productos que cuestan maximo o menos.
export function baratos(productos, maximo) {
  throw new Error("Sin hacer");
}

// ✍️ 8.2 · buscar(productos, nombre): el producto con ese nombre, o undefined si no está.
export function buscar(productos, nombre) {
  throw new Error("Sin hacer");
}

// ✍️ 8.3 · valorDelAlmacen(productos): lo que vale todo el almacén: la suma de precio × stock de cada producto.
export function valorDelAlmacen(productos) {
  throw new Error("Sin hacer");
}

// ✍️ 8.4 · etiquetas(productos): una lista con la etiqueta de cada producto. USA tu función etiqueta.
//          → ["Teclado · 25 €", "Ratón · 12 €", …]
export function etiquetas(productos) {
  throw new Error("Sin hacer");
}

// ✍️ 8.5 · conDescuento(productos, porcentaje): una lista NUEVA con productos NUEVOS con el precio rebajado ese %,
//          redondeado a 2 decimales. Los originales no cambian.  (map + { ...p, precio: … })
export function conDescuento(productos, porcentaje) {
  throw new Error("Sin hacer");
}

// ✍️ 8.6 · contarPorCategoria(productos): un objeto con cuántos productos hay de cada categoría.
//          → { periféricos: 2, cables: 1 }     (si la categoría aún no está en el objeto, empieza en 0)
export function contarPorCategoria(productos) {
  throw new Error("Sin hacer");
}

// ✍️ 8.7 · ordenarPorPrecio(productos): una lista NUEVA ordenada de más barato a más caro. La original no cambia.
//          sort CAMBIA la lista sobre la que se usa: cópiala antes → [...productos].sort((a, b) => a.precio - b.precio)
export function ordenarPorPrecio(productos) {
  throw new Error("Sin hacer");
}
