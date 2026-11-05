// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 14 · Guardar datos: JSON y localStorage
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 14
//  Comprobar: docker compose run --rm web npm run comprobar 14
// ═══════════════════════════════════════════════════════════════════════════════════════════
// localStorage guarda datos en el navegador, y siguen ahí aunque cierres la página. Pero solo guarda TEXTOS:
//   localStorage.setItem("clave", "texto")      ← guardar
//   localStorage.getItem("clave")               ← leer (null si no existe)
//   localStorage.removeItem("clave")            ← borrar
// Para guardar listas u objetos, se convierten en texto con JSON, y de vuelta:
//   JSON.stringify([1, 2])  → "[1,2]"           ← objeto o lista → texto
//   JSON.parse("[1,2]")     → [1, 2]            ← texto → objeto o lista (si el texto está roto, LANZA un error)

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // JSON.stringify({ a: 1 })
  p2: undefined, // JSON.parse("[1, 2]").length
  p3: undefined, // localStorage.setItem("n", 5); typeof localStorage.getItem("n")
  p4: undefined, // localStorage.getItem("no-existe")
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function guardarNombre(nombre) {
  localStorage.setItem("nombre", nombre);
}
export function leerNombre() {
  return localStorage.getItem("nombre") ?? "desconocido"; // ?? → si es null (no hay nada guardado), "desconocido"
}

// 🔁 REPASO DEL NIVEL 13 ──────────────────────────────────────────────────────────────────────
// 🔁 14.r · leerNumero(input): el valor del campo como número; si está vacío o no es un número, null.
export function leerNumero(input) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 14.1 · guardar(clave, valor): guarda cualquier valor (número, lista, objeto…) convertido con JSON.stringify.
export function guardar(clave, valor) {
  throw new Error("Sin hacer");
}

// ✍️ 14.2 · cargar(clave, porDefecto): lo guardado, de vuelta a su forma original (JSON.parse).
//           Si no hay nada guardado con esa clave, devuelve porDefecto.
export function cargar(clave, porDefecto) {
  throw new Error("Sin hacer");
}

// ✍️ 14.3 · Y si lo guardado está ROTO (no es JSON válido, por ejemplo "{roto"), cargar también devuelve porDefecto
//           en vez de dar un error (try/catch alrededor de JSON.parse). Es el mismo cargar de arriba: complétalo.

// ✍️ 14.4 · contarVisita(): suma 1 a las visitas guardadas (clave "visitas"; si no hay, empieza en 0) y devuelve el total.
//           USA tus funciones cargar y guardar.  1.ª llamada → 1 · 2.ª → 2 …
export function contarVisita() {
  throw new Error("Sin hacer");
}

// ✍️ 14.5 · ListaGuardada: una lista que se guarda sola en localStorage con la clave que le pases.
//           new ListaGuardada("compra"): carga lo que hubiera guardado con esa clave (o una lista vacía).
//           agregar(cosa): la añade y GUARDA.   elementos(): una COPIA de la lista.   vaciar(): la deja vacía y guarda.
//           Si haces otra new ListaGuardada("compra"), tiene que tener lo mismo (lo ha leído de localStorage).
export class ListaGuardada {
  constructor(clave) {
    throw new Error("Sin hacer");
  }
  agregar(cosa) {
    throw new Error("Sin hacer");
  }
  elementos() {
    throw new Error("Sin hacer");
  }
  vaciar() {
    throw new Error("Sin hacer");
  }
}
