// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 7 · Objetos: una ficha con datos que van juntos
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 7
//  Comprobar: docker compose run --rm web npm run comprobar 7
// ═══════════════════════════════════════════════════════════════════════════════════════════
//   const persona = { nombre: "Ana", edad: 20 };    ← un objeto: pares  propiedad: valor
//   persona.nombre          → "Ana"                 ← leer con punto
//   persona["edad"]         → 20                    ← leer con corchetes (útil si el nombre está en una variable)
//   persona.ciudad          → undefined             ← lo que no existe
//   { ...persona, edad: 21 } → un objeto NUEVO, copia de persona pero con edad 21 (el original no cambia)
//   for (const clave in persona) { … persona[clave] … }   ← recorre las propiedades
//
// Regla de este nivel: NO cambies el objeto que te pasan (te lo dan congelado). Devuelve uno nuevo.

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // const p = { nombre: "Ana", edad: 20 }; p.edad
  p2: undefined, // const p = { nombre: "Ana", edad: 20 }; p["nombre"]
  p3: undefined, // const p = { nombre: "Ana", edad: 20 }; p.ciudad      ← (si crees que nada, escribe "nada")
  p4: undefined, // const p = { a: 1, b: 2 }; let n = 0; for (const k in p) { n++; } n
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function crearPersona(nombre, edad) {
  return { nombre: nombre, edad: edad }; // también se puede escribir en corto: { nombre, edad }
}
export function esMayor(persona) {
  return persona.edad >= 18;
}

// 🔁 REPASO DEL NIVEL 6 ───────────────────────────────────────────────────────────────────────
// 🔁 7.r · ¿Cuántos números de la lista son mayores que n?  contarMayoresQue([3, 8, 10, 1], 5) → 2
export function contarMayoresQue(lista, n) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 7.1 · crearProducto(nombre, precio): un objeto con nombre, precio y disponible: true.
//          crearProducto("Teclado", 25) → { nombre: "Teclado", precio: 25, disponible: true }
export function crearProducto(nombre, precio) {
  throw new Error("Sin hacer");
}

// ✍️ 7.2 · presentar(persona): "Me llamo Ana y tengo 20 años"
export function presentar(persona) {
  throw new Error("Sin hacer");
}

// ✍️ 7.3 · leerCampo(objeto, campo): el valor de la propiedad cuyo NOMBRE está en la variable campo.
//          leerCampo({ nombre: "Ana", edad: 20 }, "edad") → 20       (ojo: objeto.campo busca una propiedad llamada «campo»)
export function leerCampo(objeto, campo) {
  throw new Error("Sin hacer");
}

// ✍️ 7.4 · cumplirAnios(persona): una persona NUEVA igual, pero con un año más. La original no cambia.
//          cumplirAnios({ nombre: "Ana", edad: 20 }) → { nombre: "Ana", edad: 21 }
export function cumplirAnios(persona) {
  throw new Error("Sin hacer");
}

// ✍️ 7.5 · rebajar(producto, euros): un producto NUEVO con el precio rebajado esos euros, pero nunca por debajo de 0.
//          rebajar({ nombre: "Ratón", precio: 15 }, 5) → { nombre: "Ratón", precio: 10 } · con 20 euros → precio 0
export function rebajar(producto, euros) {
  throw new Error("Sin hacer");
}

// ✍️ 7.6 · describir(objeto): todas sus propiedades en una línea, «clave: valor» separadas por coma y espacio.
//          describir({ nombre: "Ana", edad: 20 }) → "nombre: Ana, edad: 20"      (con for…in y un acumulador)
export function describir(objeto) {
  throw new Error("Sin hacer");
}
