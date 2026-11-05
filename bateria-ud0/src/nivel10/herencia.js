// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 10 · Herencia y campos privados
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 10
//  Comprobar: docker compose run --rm web npm run comprobar 10
// ═══════════════════════════════════════════════════════════════════════════════════════════
// HERENCIA: una clase hija tiene todo lo de la madre y le añade o cambia cosas.
//   export class Gato extends Animal {          ← Gato hereda de Animal
//     constructor(nombre, color) {
//       super(nombre);                          ← PRIMERO, el constructor de la madre (con lo que ella necesita)
//       this.color = color;                     ← luego, lo propio de la hija
//     }
//     hablar() { return "Miau"; }               ← cambia (SOBRESCRIBE) el método de la madre
//     presentarse() { return super.presentarse() + " y soy un gato"; }   ← usa el de la madre y le añade algo
//   }
//
// PRIVADOS: una propiedad con # delante solo se puede usar DENTRO de la clase. Desde fuera no se ve ni se cambia.
//   class Caja {
//     #secreto = 0;                             ← se declara arriba, antes del constructor
//     ver() { return this.#secreto; }           ← para leerla desde fuera, un método
//   }

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // class A { hola() { return "A"; } } class B extends A {} new B().hola()
  p2: undefined, // class A { hola() { return "A"; } } class B extends A { hola() { return "B"; } } new B().hola()
  p3: undefined, // class A {} class B extends A {} new B() instanceof A
  p4: undefined, // class P { #x = 1; } new P().x            ← (si crees que nada, escribe "nada")
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
  hablar() {
    return "...";
  }
  presentarse() {
    return `Soy ${this.nombre} y digo ${this.hablar()}`;
  }
}
export class Perro extends Animal {
  hablar() {
    return "Guau";
  }
}
// new Perro("Toby").presentarse() → "Soy Toby y digo Guau"   (presentarse es de Animal, pero usa el hablar de Perro)

// 🔁 REPASO DEL NIVEL 9 ───────────────────────────────────────────────────────────────────────
// 🔁 10.r · Rectangulo: new Rectangulo(3, 4) guarda base y altura; area() → 12
export class Rectangulo {
  constructor(base, altura) {
    throw new Error("Sin hacer");
  }
  area() {
    throw new Error("Sin hacer");
  }
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// La madre (ya hecha): un vehículo con su marca.
export class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }
  describir() {
    return `Vehículo ${this.marca}`;
  }
  ruedas() {
    return 4;
  }
}

// ✍️ 10.1 · Coche hereda de Vehiculo. new Coche("Seat", 5): marca (con super) y puertas.
//           describir() → "Coche Seat de 5 puertas"
export class Coche extends Vehiculo {
  constructor(marca, puertas) {
    throw new Error("Sin hacer");
  }
  describir() {
    throw new Error("Sin hacer");
  }
}

// ✍️ 10.2 · Moto hereda de Vehiculo (su constructor es el de la madre: no hace falta escribirlo).
//           ruedas() → 2 · describir() → lo de la madre más " (moto)": "Vehículo Honda (moto)"  (usa super.describir())
export class Moto extends Vehiculo {
}

// ✍️ 10.3 · describirTodos(vehiculos): la descripción de cada uno (coches, motos… cada uno con SU describir()).
export function describirTodos(vehiculos) {
  throw new Error("Sin hacer");
}

// ✍️ 10.4 · Hucha con el dinero PRIVADO (#dinero, empieza en 0). meter(cantidad) lo suma; cuanto() lo devuelve.
//           Desde fuera, hucha.dinero no existe y no hay forma de cambiarlo sin meter().
// ✍️ 10.5 · meter() no acepta cantidades de 0 o negativas: las ignora y devuelve false. Si la mete, devuelve true.
export class Hucha {
  meter(cantidad) {
    throw new Error("Sin hacer");
  }
  cuanto() {
    throw new Error("Sin hacer");
  }
}
