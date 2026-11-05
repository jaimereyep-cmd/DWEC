// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 6 · Arrays: listas de datos
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 6
//  Comprobar: docker compose run --rm web npm run comprobar 6
// ═══════════════════════════════════════════════════════════════════════════════════════════
//   const notas = [7, 4, 9];      ← una lista (array) con 3 elementos
//   notas[0]                      ← el PRIMERO (las posiciones empiezan en 0) → 7
//   notas.length                  ← cuántos hay → 3        notas[notas.length - 1] → el último → 9
//   notas.push(6)                 ← añade un 6 al final
//   for (const nota of notas) { … }   ← recorre la lista: en cada vuelta, nota es un elemento
//
// Regla de este nivel: NO cambies nunca la lista que te pasan (el comprobador te la da congelada).
// Si tienes que devolver una lista, crea una NUEVA (const resultado = [];) y llénala con push.

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // [10, 20, 30][0]
  p2: undefined, // [10, 20, 30].length
  p3: undefined, // [10, 20, 30][3]        ← (si crees que no hay nada, escribe "nada")
  p4: undefined, // const a = [1]; a.push(5); a.length
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function primero(lista) {
  return lista[0];
}
export function ultimo(lista) {
  return lista[lista.length - 1];
}
export function contarAprobados(notas) {
  let cuantos = 0;
  for (const nota of notas) {
    if (nota >= 5) {
      cuantos++;
    }
  }
  return cuantos;
}

// 🔁 REPASO DEL NIVEL 5 ───────────────────────────────────────────────────────────────────────
// 🔁 6.r · Escribe entera la función flecha triple(n), que devuelve n por 3.  triple(4) → 12

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 6.1 · sumar(lista): la suma de todos los números.  sumar([4, 1, 5]) → 10 · sumar([]) → 0
export function sumar(lista) {
  throw new Error("Sin hacer");
}

// ✍️ 6.2 · media(lista): la media (la suma entre cuántos hay). USA tu función sumar. Si la lista está vacía, 0.
//          media([4, 6, 8]) → 6
export function media(lista) {
  throw new Error("Sin hacer");
}

// ✍️ 6.3 · maximo(lista): el número más grande.  maximo([3, 9, 2]) → 9 · maximo([-5, -2]) → -2
//          Truco: empieza suponiendo que el mayor es el PRIMERO, y recorre la lista buscando uno más grande.
export function maximo(lista) {
  throw new Error("Sin hacer");
}

// ✍️ 6.4 · contiene(lista, valor): true si el valor está en la lista; false si no.  contiene([1, 2, 3], 2) → true
export function contiene(lista, valor) {
  throw new Error("Sin hacer");
}

// ✍️ 6.5 · soloAprobados(notas): una lista NUEVA solo con las notas de 5 o más, en el mismo orden.
//          soloAprobados([7, 3, 5, 4]) → [7, 5]
export function soloAprobados(notas) {
  throw new Error("Sin hacer");
}

// ✍️ 6.6 · alReves(lista): una lista NUEVA con los mismos elementos en orden contrario, sin cambiar la original.
//          alReves([1, 2, 3]) → [3, 2, 1]      (pista: un for que vaya desde el último hasta el 0)
export function alReves(lista) {
  throw new Error("Sin hacer");
}
