// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 11 · Errores: avisar cuando algo va mal (throw) y recuperarse (try/catch)
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 11
//  Comprobar: docker compose run --rm web npm run comprobar 11
// ═══════════════════════════════════════════════════════════════════════════════════════════
//   throw new Error("El precio no puede ser negativo");   ← LANZA un error: la función se para ahí mismo
//
//   try {
//     algoQuePuedeFallar();          ← se intenta
//   } catch (error) {                ← si ha lanzado un error, se salta aquí
//     error.message                  ← el texto del error
//   }
//
// Tus propios tipos de error: class ErrorDeStock extends Error { … }   (y luego: error instanceof ErrorDeStock)

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // let m; try { throw new Error("ups"); } catch (e) { m = e.message; } m
  p2: undefined, // let r = "a"; try { null.x; r = r + "b"; } catch (e) { r = r + "c"; } r
  p3: undefined, // let r = "a"; try { r = r + "b"; } catch (e) { r = r + "c"; } r
  p4: undefined, // class MiError extends Error {} new MiError("x") instanceof Error
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function dividir(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir entre 0");
  }
  return a / b;
}
export function dividirOCero(a, b) {
  try {
    return dividir(a, b);
  } catch (error) {
    return 0;
  }
}

// 🔁 REPASO DEL NIVEL 10 ──────────────────────────────────────────────────────────────────────
// 🔁 11.r · Cuadrado hereda de Figura (ya hecha). new Cuadrado(3): lado 3; area() → 9; nombre() → "cuadrado"
export class Figura {
  area() {
    return 0;
  }
  nombre() {
    return "figura";
  }
}
export class Cuadrado extends Figura {
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 11.1 · raizCuadrada(n): si n es negativo, lanza un Error con el mensaje "No hay raíz de un negativo".
//           Si no, devuelve Math.sqrt(n).
export function raizCuadrada(n) {
  throw new Error("Sin hacer");
}

// ✍️ 11.2 · raizOMensaje(n): usa raizCuadrada con try/catch. Si va bien, devuelve el número; si falla, el MENSAJE del error.
//           raizOMensaje(9) → 3 · raizOMensaje(-1) → "No hay raíz de un negativo"
export function raizOMensaje(n) {
  throw new Error("Sin hacer");
}

// ✍️ 11.3 · crearUsuario(nombre, edad): devuelve { nombre, edad }, pero ANTES valida:
//           - si nombre no es un texto o está vacío (solo espacios cuenta como vacío) → Error "Falta el nombre"
//           - si edad no es un número o es negativa → Error "Edad no válida"
export function crearUsuario(nombre, edad) {
  throw new Error("Sin hacer");
}

// ✍️ 11.4 · ErrorDeStock: tu propio tipo de error, hijo de Error. Su name tiene que ser "ErrorDeStock".
//           new ErrorDeStock("Sin stock").message → "Sin stock" · .name → "ErrorDeStock"
export class ErrorDeStock extends Error {
}

// ✍️ 11.5 · vender(producto, cantidad): si no hay stock suficiente, lanza un ErrorDeStock con el mensaje
//           "Solo quedan 2" (con el stock que haya). Si hay, devuelve un producto NUEVO con el stock rebajado.
//           vender({ nombre: "Ratón", stock: 5 }, 2) → { nombre: "Ratón", stock: 3 }
export function vender(producto, cantidad) {
  throw new Error("Sin hacer");
}

// ✍️ 11.6 · intentarVender(producto, cantidad): llama a vender. Devuelve "Vendido" si va bien, o el mensaje si es un
//           ErrorDeStock. Cualquier OTRO error no es cosa tuya: vuelve a lanzarlo (throw error;).
export function intentarVender(producto, cantidad) {
  throw new Error("Sin hacer");
}
