// Nivel 9 · Clases: constructor, this, métodos, estado que cambia
import { casos, congelar, muestra, predicciones } from "../ayuda.mjs";

const faltaThis = (e) => (e instanceof ReferenceError ? ` → «${e.message}»: dentro de la clase, las propiedades se usan con this delante (this.precio)` : "");

export default {
  id: "9",
  titulo: "Nivel 9 · Clases: moldes para fabricar objetos",
  corto: "Nivel 9",
  animo: "Ya sabes crear tus propios tipos de objetos. Es la base del bloque A de la práctica 2.",
  modulos: { m: "src/nivel09/clases.js" },
  pruebas: [
    {
      id: "9.p",
      texto: "🔮 Predicciones: new, this y métodos",
      fn: predicciones({
        p1: ["class A { constructor(n) { this.n = n; } } new A(3).n", 3, "new llama al constructor con 3, que lo guarda en this.n", "¿qué hace el constructor con lo que recibe?"],
        p2: ['class B { hola() { return "hola"; } } new B().hola()', "hola", "un método se llama con punto y paréntesis, como una función", "hola() devuelve…"],
        p3: ["class A { constructor(n) { this.n = n; } } new A(1) === new A(1)", false, "cada new fabrica un objeto DISTINTO, aunque tengan lo mismo dentro", "¿son el mismo objeto o dos gemelos?"],
        p4: ["class C { constructor() { this.v = 0; } sumar() { this.v++; } } const c = new C(); c.sumar(); c.sumar(); c.v", 2, "el objeto RECUERDA su estado: cada sumar() cambia su this.v", "v empieza en 0 y se llama dos veces a sumar"],
      }),
    },
    {
      id: "9.E",
      ejemplo: true,
      texto: "👀 Ejemplo: Contador",
      fn: ({ m }) => {
        const c = new m.Contador();
        c.incrementar();
        c.incrementar();
        return c.valor === 2 || "¿has cambiado el ejemplo?";
      },
    },
    { id: "9.r", texto: "🔁 Repaso: mayoresDe", fn: ({ m }) => casos((l, e) => m.mayoresDe(l, e)?.map?.((p) => p.nombre), "mayoresDe (los nombres)", [[[congelar([{ nombre: "Ana", edad: 20 }, { nombre: "Luis", edad: 15 }, { nombre: "Eva", edad: 18 }]), 17], ["Ana", "Eva"]], [[congelar([{ nombre: "Ana", edad: 20 }]), 20], []]]) },
    {
      id: "9.1",
      texto: "✍️ Producto: constructor (nombre y precio)",
      fn: ({ m }) => {
        const p = new m.Producto("Teclado", 25);
        if (p.nombre === undefined && p.precio === undefined) return "new Producto(\"Teclado\", 25) no tiene nombre ni precio: en el constructor, this.nombre = nombre; …";
        if (p.nombre !== "Teclado" || p.precio !== 25) return `new Producto("Teclado", 25) tiene nombre ${muestra(p.nombre)} y precio ${muestra(p.precio)}`;
        return true;
      },
    },
    {
      id: "9.2",
      texto: "✍️ Producto: conIva()",
      fn: ({ m }) => {
        try {
          return casos((n, pr) => new m.Producto(n, pr).conIva(), "new Producto(…).conIva", [[["Teclado", 25], 30.25], [["Cable", 9.99], 12.09], [["Nada", 0], 0]]);
        } catch (e) {
          if (e?.message === "Sin hacer") throw e;
          return `💥 ${e.message}${faltaThis(e)}`;
        }
      },
    },
    {
      id: "9.3",
      texto: "✍️ Producto: descripcion()",
      fn: ({ m }) => {
        try {
          return casos((n, pr) => new m.Producto(n, pr).descripcion(), "new Producto(…).descripcion", [[["Teclado", 25], "Teclado: 25 €"], [["Ratón", 12.5], "Ratón: 12.5 €"]]);
        } catch (e) {
          if (e?.message === "Sin hacer") throw e;
          return `💥 ${e.message}${faltaThis(e)}`;
        }
      },
    },
    {
      id: "9.4",
      texto: "✍️ Cuenta: ingresar y retirar",
      fn: ({ m }) => {
        const c = new m.Cuenta("Ana");
        if (c.titular !== "Ana" || c.saldo !== 0) return `new Cuenta("Ana") tiene titular ${muestra(c.titular)} y saldo ${muestra(c.saldo)}: tendría que ser "Ana" y 0`;
        c.ingresar(50);
        if (c.saldo !== 50) return `Después de ingresar(50), el saldo es ${muestra(c.saldo)} y tendría que ser 50`;
        c.ingresar(30);
        if (c.saldo !== 80) return `Después de ingresar(50) e ingresar(30), el saldo es ${muestra(c.saldo)}: ¿sumas al saldo que había (+=) o lo sustituyes (=)?`;
        const r1 = c.retirar(100);
        if (r1 !== false) return `retirar(100) con 80 € tendría que devolver false, y devuelve ${muestra(r1)}`;
        if (c.saldo !== 80) return `retirar(100) con 80 € ha dejado el saldo en ${muestra(c.saldo)}: si no hay bastante, no se toca`;
        const r2 = c.retirar(30);
        if (r2 !== true) return `retirar(30) con 80 € tendría que devolver true, y devuelve ${muestra(r2)}`;
        if (c.saldo !== 50) return `Después de retirar(30), el saldo es ${muestra(c.saldo)} y tendría que ser 50`;
        return c.retirar(50) === true && c.saldo === 0 ? true : "retirar(50) con 50 € justos tendría que poder hacerse (¿usas >= donde va >?)";
      },
    },
    {
      id: "9.5",
      texto: "✍️ Cuenta: estado()",
      fn: ({ m }) => {
        const c = new m.Cuenta("Ana");
        c.ingresar(50);
        const r = c.estado();
        return r === "Ana: 50 €" || `estado() da ${muestra(r)} y tendría que ser "Ana: 50 €"`;
      },
    },
    {
      id: "9.6",
      texto: "✍️ ListaCompra: agregar sin repetidos, cuantas y tiene",
      fn: ({ m }) => {
        const l = new m.ListaCompra();
        if (!Array.isArray(l.cosas)) return "this.cosas tiene que empezar siendo una lista vacía: this.cosas = [];";
        l.agregar("pan");
        l.agregar("leche");
        if (l.cuantas() !== 2) return `Después de agregar pan y leche, cuantas() da ${muestra(l.cuantas())}`;
        l.agregar("pan");
        if (l.cuantas() === 3) return "Has añadido «pan» dos veces: antes de añadir, pregunta si ya lo tiene (puedes usar tu método this.tiene)";
        if (l.tiene("pan") !== true || l.tiene("huevos") !== false) return `tiene("pan") da ${muestra(l.tiene("pan"))} y tiene("huevos") da ${muestra(l.tiene("huevos"))}`;
        const otra = new m.ListaCompra();
        return otra.cuantas() === 0 || "Una lista nueva no está vacía: ¿guardas las cosas fuera de la clase en vez de en this.cosas?";
      },
    },
  ],
  empezar: {
    "9.p": "Recuerda: cada new fabrica un objeto nuevo y el constructor lo prepara",
    "9.r": "return personas.filter((p) => …);",
    "9.1": "En el constructor: this.nombre = nombre; y lo mismo con el precio",
    "9.2": "return y la cuenta con this.precio; redondea con Math.round(x * 100) / 100",
    "9.3": "Comillas invertidas con ${this.nombre} y ${this.precio}",
    "9.4": "ingresar: this.saldo += cantidad;  retirar: si cantidad > this.saldo, return false; si no, resta y return true",
    "9.5": "Como descripcion() de Producto, con this.titular y this.saldo",
    "9.6": "constructor: this.cosas = [];  agregar: if (!this.tiene(cosa)) { this.cosas.push(cosa); }",
  },
};
