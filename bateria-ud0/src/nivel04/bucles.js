// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 4 · Bucles: repetir sin copiar y pegar
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 4
//  Comprobar: docker compose run --rm web npm run comprobar 4
// ═══════════════════════════════════════════════════════════════════════════════════════════
//   for (let i = 1; i <= 5; i++) {     ← empieza en 1 · sigue mientras i <= 5 · en cada vuelta, i sube 1 (i++)
//     …                                 ← esto se repite 5 veces: con i = 1, 2, 3, 4 y 5
//   }
//
//   while (condición) {                ← se repite MIENTRAS la condición sea true
//     …                                 ← ¡algo de aquí dentro tiene que acabar haciéndola false! (si no, no para nunca)
//   }
//
// El truco del ACUMULADOR: una variable que empieza en 0 (o en "") y en cada vuelta se le añade algo.

// 🔮 PREDICCIONES · ¿Qué DA cada trozo de código?
export const predicciones = {
  p1: 3, // let n = 0; for (let i = 0; i < 3; i++) { n = n + 1; } n
  p2: 6, // let s = 0; for (let i = 1; i <= 3; i++) { s = s + i; } s
  p3: "123", // let t = ""; for (let i = 1; i <= 3; i++) { t = t + i; } t
  p4: 16, // let x = 1; while (x < 10) { x = x * 2; } x
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
// Suma 1 + 2 + … + n.   sumaHasta(4) → 1 + 2 + 3 + 4 = 10
export function sumaHasta(n) {
  let suma = 0; // el acumulador empieza en 0
  for (let i = 1; i <= n; i++) {
    suma = suma + i; // en cada vuelta le añadimos i
  }
  return suma; // el return va FUERA del bucle: cuando ya ha terminado
}

// 🔁 REPASO DEL NIVEL 3 ───────────────────────────────────────────────────────────────────────
// 🔁 4.r · El valor absoluto: el número sin signo.  valorAbsoluto(-7) → 7 · valorAbsoluto(3) → 3   (con un if)
export function valorAbsoluto(n) { 
  if (n < 0) {
  return n * -1
} else {
  return n
}
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 4.1 · Multiplica 1 · 2 · 3 · … · n (el factorial).  factorial(4) → 24 · factorial(1) → 1
//          Ojo: un acumulador que MULTIPLICA no puede empezar en 0.
export function factorial(n) { 
  let fact =  1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
} return fact;
  throw new Error("Sin hacer");
}

// ✍️ 4.2 · Una cuenta atrás en un texto.  cuentaAtras(3) → "3 2 1 ¡Ya!"   (acumulador de texto; el bucle va hacia ATRÁS: i--)
export function cuentaAtras(n) { 
let resultado = "";
  for (let i = n; i >= 1; i--) {
    resultado += i + " ";
  }
  return resultado + "¡Ya!";
  throw new Error("Sin hacer");
}

// ✍️ 4.3 · ¿Cuántos números pares hay del 1 al n?  contarPares(10) → 5 · contarPares(7) → 3   (un if dentro del for)
export function contarPares(n) { 
let resultado = "";
let numero = 0;
  for (let i = 1; i <= n; i++) { 
  if (i % 2 === 0) {
    resultado += i;
    numero++;
  }
} return numero;
  throw new Error("Sin hacer");
}

// ✍️ 4.4 · ¿Cuántas vocales tiene un texto? (a, e, i, o, u, en minúscula). Un for que va de 0 a texto.length - 1
//          y mira cada letra: texto[i].   "aeiou".includes(letra) dice si letra es una vocal.
//          contarVocales("murcielago") → 5
export function contarVocales(texto) {
  throw new Error("Sin hacer");
}

// ✍️ 4.5 · La tabla de multiplicar de n, del 1 al 10, una línea por resultado («\n» es un salto de línea):
//          tablaDel(2) → "2 x 1 = 2\n2 x 2 = 4\n … \n2 x 10 = 20"    (sin \n después de la última línea)
export function tablaDel(n) {
  throw new Error("Sin hacer");
}

// ✍️ 4.6 · ¿Cuántas veces hay que duplicar una cantidad para llegar (o pasar) a una meta? Con while.
//          vecesParaLlegar(1, 10) → 4   (1 → 2 → 4 → 8 → 16: 4 veces)      vecesParaLlegar(5, 5) → 0
export function vecesParaLlegar(cantidad, meta) {
  throw new Error("Sin hacer");
}
