// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 9 · Clases: moldes para fabricar objetos
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 9
//  Comprobar: docker compose run --rm web npm run comprobar 9
// ═══════════════════════════════════════════════════════════════════════════════════════════
// Una CLASE es un molde. Con new fabricas objetos (INSTANCIAS) a partir de él.
//
//   export class Perro {
//     constructor(nombre) {          ← se ejecuta al hacer new Perro("Toby"): prepara el objeto
//       this.nombre = nombre;        ← this es «el objeto que se está fabricando»
//       this.energia = 10;
//     }
//     ladrar() {                     ← un MÉTODO: algo que el objeto sabe hacer
//       return this.nombre + " dice guau";
//     }
//   }
//   const toby = new Perro("Toby");   toby.nombre → "Toby"   toby.ladrar() → "Toby dice guau"
//
// Dentro de la clase, para usar una propiedad o un método del propio objeto: SIEMPRE con this delante.

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // class A { constructor(n) { this.n = n; } } new A(3).n
  p2: undefined, // class B { hola() { return "hola"; } } new B().hola()
  p3: undefined, // class A { constructor(n) { this.n = n; } } new A(1) === new A(1)
  p4: undefined, // class C { constructor() { this.v = 0; } sumar() { this.v++; } } const c = new C(); c.sumar(); c.sumar(); c.v
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export class Contador {
  constructor() {
    this.valor = 0;
  }
  incrementar() {
    this.valor++;
  }
  reiniciar() {
    this.valor = 0;
  }
}

// 🔁 REPASO DEL NIVEL 8 ───────────────────────────────────────────────────────────────────────
// 🔁 9.r · mayoresDe(personas, edad): los objetos persona con MÁS de esa edad.  (filter)
export function mayoresDe(personas, edad) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 9.1 · Producto: new Producto("Teclado", 25) tiene las propiedades nombre y precio.
// ✍️ 9.2 · Su método conIva() devuelve el precio por 1.21, redondeado a 2 decimales.   → 30.25
// ✍️ 9.3 · Su método descripcion() devuelve "Teclado: 25 €"
export class Producto {
  constructor(nombre, precio) {
    throw new Error("Sin hacer");
  }
  conIva() {
    throw new Error("Sin hacer");
  }
  descripcion() {
    throw new Error("Sin hacer");
  }
}

// ✍️ 9.4 · Cuenta (bancaria): new Cuenta("Ana") empieza con titular "Ana" y saldo 0.
//          ingresar(cantidad) suma la cantidad al saldo.
//          retirar(cantidad): si hay saldo suficiente, lo resta y devuelve true; si no, no toca nada y devuelve false.
// ✍️ 9.5 · estado() devuelve "Ana: 50 €"
export class Cuenta {
  constructor(titular) {
    throw new Error("Sin hacer");
  }
  ingresar(cantidad) {
    throw new Error("Sin hacer");
  }
  retirar(cantidad) {
    throw new Error("Sin hacer");
  }
  estado() {
    throw new Error("Sin hacer");
  }
}

// ✍️ 9.6 · ListaCompra: guarda las cosas en un array (this.cosas, que empieza vacío).
//          agregar(cosa): la añade, pero solo si no está ya (sin repetidas).
//          cuantas(): cuántas cosas hay.
//          tiene(cosa): true o false.
export class ListaCompra {
  constructor() {
    throw new Error("Sin hacer");
  }
  agregar(cosa) {
    throw new Error("Sin hacer");
  }
  cuantas() {
    throw new Error("Sin hacer");
  }
  tiene(cosa) {
    throw new Error("Sin hacer");
  }
}
