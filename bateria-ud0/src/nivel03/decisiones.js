// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 3 · Decisiones: if, else if, else
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 3
//  Comprobar: docker compose run --rm web npm run comprobar 3
// ═══════════════════════════════════════════════════════════════════════════════════════════
// Comparar:   ===  igual     !==  distinto     >  mayor     <  menor     >=  mayor o igual     <=  menor o igual
// Combinar:   &&  «y» (las dos)      ||  «o» (al menos una)      !  «no» (le da la vuelta)
//
//   if (condición) {        ← si la condición es true, se hace esto
//     …
//   } else if (otra) {      ← si no, y esta otra es true, esto
//     …
//   } else {                ← si no se ha cumplido ninguna, esto
//     …
//   }

// 🔮 PREDICCIONES · ¿Qué DA cada expresión? (true, false, un número o un texto)
export const predicciones = {
  p1: undefined, // 5 > 3
  p2: undefined, // 5 === "5"
  p3: undefined, // 7 > 3 && 2 > 4
  p4: undefined, // 7 > 3 || 2 > 4
  p5: undefined, // let n = 6; let r; if (n > 8) { r = "A"; } else if (n > 5) { r = "B"; } else { r = "C"; } r
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function esMayorDeEdad(edad) {
  if (edad >= 18) {
    return true;
  } else {
    return false;
  }
}
// En cuanto se hace un return, la función TERMINA: lo que haya debajo ya no se ejecuta.

// 🔁 REPASO DEL NIVEL 2 ───────────────────────────────────────────────────────────────────────
// 🔁 3.r · La mitad de un número.  mitad(10) → 5 · mitad(7) → 3.5
export function mitad(n) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 3.1 · El mayor de dos números (si son iguales, cualquiera de los dos).  mayor(3, 8) → 8
export function mayor(a, b) {
  throw new Error("Sin hacer");
}

// ✍️ 3.2 · "positivo", "negativo" o "cero".  signo(5) → "positivo" · signo(-2) → "negativo" · signo(0) → "cero"
export function signo(n) {
  throw new Error("Sin hacer");
}

// ✍️ 3.3 · La calificación de una nota de 0 a 10:
//          menos de 5 → "suspenso" · de 5 a menos de 7 → "aprobado" · de 7 a menos de 9 → "notable" · 9 o más → "sobresaliente"
//          Ojo con los bordes: el 5 ya es "aprobado", el 7 ya es "notable" y el 9 ya es "sobresaliente".
export function calificacion(nota) {
  throw new Error("Sin hacer");
}

// ✍️ 3.4 · ¿Puede entrar al concierto? Tiene que tener 18 o más Y tener entrada (conEntrada es true o false).
//          puedeEntrar(20, true) → true · puedeEntrar(20, false) → false · puedeEntrar(16, true) → false
export function puedeEntrar(edad, conEntrada) {
  throw new Error("Sin hacer");
}

// ✍️ 3.5 · El precio de la entrada del cine: menores de 12 → 5 € · 65 o más → 6 € · el resto → 9 €
export function precioEntrada(edad) {
  throw new Error("Sin hacer");
}

// ✍️ 3.6 · ¿Es fin de semana? dia es un texto: "lunes", "martes"… Es fin de semana si es "sábado" O "domingo".
export function esFinde(dia) {
  throw new Error("Sin hacer");
}
