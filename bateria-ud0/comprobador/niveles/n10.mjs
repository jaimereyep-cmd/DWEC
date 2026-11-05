// Nivel 10 · Herencia (extends, super, sobrescribir, polimorfismo) y campos #privados
import { casos, muestra, predicciones } from "../ayuda.mjs";

export default {
  id: "10",
  titulo: "Nivel 10 · Herencia y campos privados",
  corto: "Nivel 10",
  animo: "Herencia y privados: lo que pide el bloque A de la práctica 2.",
  modulos: { m: "src/nivel10/herencia.js" },
  pruebas: [
    {
      id: "10.p",
      texto: "🔮 Predicciones: heredar y sobrescribir",
      fn: ({ m }) => {
        const p = { ...(m.predicciones ?? {}) };
        if (typeof p.p4 === "string" && ["nada", "undefined"].includes(p.p4.trim().toLowerCase())) p.p4 = "__nada__";
        return predicciones({
          p1: ['class A { hola() { return "A"; } } class B extends A {} new B().hola()', "A", "B no tiene hola(), así que usa el de su madre A", "¿tiene B su propio hola()?"],
          p2: ['class A { hola() { return "A"; } } class B extends A { hola() { return "B"; } } new B().hola()', "B", "B SOBRESCRIBE hola(): se usa el suyo", "si la hija tiene el método, ¿cuál se usa?"],
          p3: ["class A {} class B extends A {} new B() instanceof A", true, "un B ES también un A (como un perro es un animal)", "¿un perro es un animal?"],
          p4: ["class P { #x = 1; } new P().x", "__nada__", "#x es privado y además se llama #x, no x: desde fuera no existe (undefined)", "¿se ve #x desde fuera? ¿y se llama x?"],
        })({ m: { predicciones: p } });
      },
    },
    { id: "10.E", ejemplo: true, texto: "👀 Ejemplo: Animal y Perro", fn: ({ m }) => new m.Perro("Toby").presentarse() === "Soy Toby y digo Guau" || "¿has cambiado el ejemplo?" },
    {
      id: "10.r",
      texto: "🔁 Repaso: Rectangulo",
      fn: ({ m }) => casos((b, a) => new m.Rectangulo(b, a).area(), "new Rectangulo(…).area", [[[3, 4], 12], [[5, 5], 25]]),
    },
    {
      id: "10.1",
      texto: "✍️ Coche extends Vehiculo (super)",
      fn: ({ m }) => {
        let c;
        try {
          c = new m.Coche("Seat", 5);
        } catch (e) {
          if (/super constructor|before accessing 'this'|Must call super/.test(e.message)) return "En el constructor de una hija, lo PRIMERO es super(marca); y después this.puertas = …";
          throw e;
        }
        if (!(c instanceof m.Vehiculo)) return "Coche tiene que heredar de Vehiculo: class Coche extends Vehiculo";
        if (c.marca !== "Seat") return `marca vale ${muestra(c.marca)}: pásasela a la madre con super(marca)`;
        if (c.puertas !== 5) return `puertas vale ${muestra(c.puertas)}`;
        const d = c.describir();
        if (d === "Vehículo Seat") return "describir() da el de la madre: escribe el de Coche";
        return d === "Coche Seat de 5 puertas" || `describir() da ${muestra(d)} y tendría que ser "Coche Seat de 5 puertas"`;
      },
    },
    {
      id: "10.2",
      texto: "✍️ Moto: ruedas() y super.describir()",
      fn: ({ m }) => {
        const moto = new m.Moto("Honda");
        if (moto.ruedas() === 4 && moto.describir() === "Vehículo Honda") return "pendiente";
        if (moto.ruedas() !== 2) return `ruedas() da ${muestra(moto.ruedas())}: sobrescríbelo en Moto para que dé 2`;
        const d = moto.describir();
        if (d === "Moto Honda (moto)" || d === "Moto Honda") return 'describir() tiene que usar el de la madre: super.describir() + " (moto)"';
        if (d !== "Vehículo Honda (moto)") return `describir() da ${muestra(d)} y tendría que ser "Vehículo Honda (moto)"`;
        return new m.Vehiculo("Ford").ruedas() === 4 || "¡Has cambiado el ruedas() de Vehiculo! Va en Moto";
      },
    },
    {
      id: "10.3",
      texto: "✍️ describirTodos (polimorfismo)",
      fn: ({ m }) => {
        const lista = [new m.Coche("Seat", 5), new m.Moto("Honda"), new m.Vehiculo("Ford")];
        return casos(m.describirTodos, "describirTodos([coche Seat, moto Honda, vehículo Ford])", [[[lista], ["Coche Seat de 5 puertas", "Vehículo Honda (moto)", "Vehículo Ford"]], [[[]], []]]);
      },
    },
    {
      id: "10.4",
      texto: "✍️ Hucha: #dinero privado, meter y cuanto",
      fn: ({ m }, ctx) => {
        const h = new m.Hucha();
        h.meter(5);
        h.meter(10);
        if (h.cuanto() !== 15) return `Después de meter(5) y meter(10), cuanto() da ${muestra(h.cuanto())} y tendría que dar 15`;
        if (Object.keys(h).length > 0) return `Se ve desde fuera: ${Object.keys(h).join(", ")}. El dinero tiene que ser privado: #dinero`;
        if (!/#dinero/.test(ctx.leer("src/nivel10/herencia.js") ?? "")) return "No veo el campo privado #dinero";
        return new m.Hucha().cuanto() === 0 || "Una hucha nueva tiene que empezar en 0";
      },
    },
    {
      id: "10.5",
      texto: "✍️ Hucha: no acepta 0 ni negativos",
      fn: ({ m }) => {
        const h = new m.Hucha();
        const r1 = h.meter(10);
        const r2 = h.meter(-5);
        const r3 = h.meter(0);
        if (h.cuanto() === 5) return "meter(-5) te ha quitado dinero: las cantidades negativas se ignoran";
        if (r1 !== true) return `meter(10) tendría que devolver true y devuelve ${muestra(r1)}`;
        if (r2 !== false || r3 !== false) return `meter(-5) y meter(0) tendrían que devolver false (y dan ${muestra(r2)} y ${muestra(r3)})`;
        return h.cuanto() === 10 || `Después de meter 10, -5 y 0, cuanto() da ${muestra(h.cuanto())}`;
      },
    },
  ],
  empezar: {
    "10.p": 'En p4, si crees que no hay nada, escribe "nada"',
    "10.r": "Como Producto en el nivel 9: guarda base y altura en this, y area() devuelve su producto",
    "10.1": "constructor: super(marca); this.puertas = puertas;   describir(): comillas invertidas con this.marca y this.puertas",
    "10.2": "Dentro de class Moto escribe dos métodos: ruedas() { return 2; } y describir() { return super.describir() + …; }",
    "10.3": "return vehiculos.map((v) => v.describir());  cada uno usa SU describir",
    "10.4": "Arriba de la clase: #dinero = 0;  y en los métodos, this.#dinero",
    "10.5": "Al principio de meter: if (cantidad <= 0) { return false; }",
  },
};
