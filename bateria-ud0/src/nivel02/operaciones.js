// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 2 · Operaciones y textos (y tus primeras funciones)
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 2
//  Comprobar: docker compose run --rm web npm run comprobar 2      Página: docker compose up → http://localhost:5173
// ═══════════════════════════════════════════════════════════════════════════════════════════
// Desde aquí, cada ejercicio es una FUNCIÓN: una máquina que RECIBE datos (entre paréntesis) y DEVUELVE un resultado
// (con return). De momento solo tienes que escribir lo que va en el return. En el nivel 5 las verás a fondo.
//
//   export function doble(n) {      ← se llama doble y recibe un dato, al que llama n
//     return n * 2;                 ← devuelve n por 2.   doble(4) → 8   doble(10) → 20
//   }
//
// En cada ejercicio: BORRA la línea throw new Error("Sin hacer"); y escribe tu return en su lugar.

// 🔮 PREDICCIONES · ¿Qué DA cada expresión? Cambia undefined por tu respuesta (números sin comillas, textos con comillas).
export const predicciones = {
  p1: undefined, // 7 % 2
  p2: undefined, // 10 / 4
  p3: undefined, // "Hola".length
  p4: undefined, // "Hola mundo".slice(0, 4)
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function doble(n) {
  return n * 2;
}
export function saludar(nombre) {
  return "Hola, " + nombre + "!"; // saludar("Ana") → "Hola, Ana!"
}

// 🔁 REPASO DEL NIVEL 1 ───────────────────────────────────────────────────────────────────────
// 🔁 2.r · Devuelve el TIPO del dato que te pasan: tipoDe(5) → "number" · tipoDe("hola") → "string"
export function tipoDe(dato) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 2.1 · El precio con el 21 % de IVA: el precio por 1.21 (con PUNTO, no coma).  conIva(100) → 121
export function conIva(precio) {
  throw new Error("Sin hacer");
}

// ✍️ 2.2 · ¿Es par? Devuelve true o false. Un número es par si el RESTO de dividirlo entre 2 es 0 (el resto: %).
//          esPar(4) → true · esPar(7) → false          (no hace falta if: n % 2 === 0 ya es true o false)
export function esPar(n) {
  throw new Error("Sin hacer");
}

// ✍️ 2.3 · Une nombre y apellido con un espacio en medio.  nombreCompleto("Ana", "López") → "Ana López"
export function nombreCompleto(nombre, apellido) {
  throw new Error("Sin hacer");
}

// ✍️ 2.4 · Las iniciales con un punto detrás de cada una. La primera letra de un texto es texto[0].
//          iniciales("Ana", "López") → "A.L."
export function iniciales(nombre, apellido) {
  throw new Error("Sin hacer");
}

// ✍️ 2.5 · El texto en MAYÚSCULAS y con una exclamación al final. Los textos tienen .toUpperCase()
//          gritar("hola") → "HOLA!"
export function gritar(texto) {
  throw new Error("Sin hacer");
}

// ✍️ 2.6 · ¿Cuántas letras tiene el nombre completo (contando el espacio)? Usa nombreCompleto y .length
//          letrasDe("Ana", "López") → 9
export function letrasDe(nombre, apellido) {
  throw new Error("Sin hacer");
}
