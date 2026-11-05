// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 1 · Variables y tipos de datos
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 1
//  Ejecutar:  docker compose run --rm web npm run ejecutar 1
//  Comprobar: docker compose run --rm web npm run comprobar 1
// ═══════════════════════════════════════════════════════════════════════════════════════════
// Una VARIABLE es una caja con nombre donde guardas un dato para usarlo después.
//   const → la caja no se puede cambiar        let → la caja SÍ se puede cambiar
// La palabra export de delante es para que el comprobador pueda ver tu variable. Déjala siempre.

// 🔮 PREDICCIONES · ¿Qué DA cada expresión? Cambia undefined por tu respuesta.
//    typeof dice de qué TIPO es un dato: "number" (número), "string" (texto) o "boolean" (true/false).
//    Si la respuesta es un texto, va entre comillas: "number". Si es un número, sin comillas: 4.
export const predicciones = {
  p1: "number", // typeof 5
  p2: "string", // typeof "5"
  p3: "boolean", // typeof true
  p4: 4, // let x = 3; x = x + 1; x
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export const ciudad = "Cádiz"; // un texto (string): entre comillas
export const habitantes = 115000; // un número (number): SIN comillas y sin puntos de miles
console.log("Vivo en " + ciudad + ", que tiene " + habitantes + " habitantes");

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// En cada una, cambia undefined por el valor que se pide.

// ✍️ 1.1 · Tu nombre, como TEXTO.
export const nombre = "Jaime";

// ✍️ 1.2 · Tu edad, como NÚMERO (sin comillas).
export const edad = 19;

// ✍️ 1.3 · ¿Eres alumno? Un BOOLEANO: true (verdadero) o false (falso), sin comillas.
export const esAlumno = true;

// ✍️ 1.4 · Empiezas con 10 puntos. En la línea de debajo, SÚMALE 5 a puntos (sin escribir 15: que lo calcule).
//          Pista: puntos = puntos + 5;   (se lee: «puntos pasa a valer lo que valía más 5»)
export let puntos = 10; 
puntos = puntos + 5;


// ✍️ 1.5 · Un saludo que USE tu variable nombre: "Hola, soy " y tu nombre. Si cambias nombre, el saludo cambia solo.
//          Dos formas: "Hola, soy " + nombre      o con comillas invertidas: `Hola, soy ${nombre}`
export const saludo = "Hola, soy " + nombre;

console.log(saludo);
console.log("Tengo " + edad + " años y " + puntos + " puntos");
