// Nivel 11 · Errores: throw, try/catch, error.message, errores propios (extends Error), relanzar
import { casos, lanza, muestra, predicciones } from "../ayuda.mjs";

const f = (o) => Object.freeze({ ...o });
const mensajeDe = (fn) => {
  try {
    fn();
  } catch (e) {
    if (e?.message === "Sin hacer") throw e;
    return e;
  }
  return null;
};

export default {
  id: "11",
  titulo: "Nivel 11 · Errores: throw y try/catch",
  corto: "Nivel 11",
  animo: "Tus programas ya avisan cuando algo va mal y saben recuperarse.",
  modulos: { m: "src/nivel11/errores.js" },
  pruebas: [
    {
      id: "11.p",
      texto: "🔮 Predicciones: ¿por dónde pasa?",
      fn: predicciones({
        p1: ['let m; try { throw new Error("ups"); } catch (e) { m = e.message; } m', "ups", "el catch recibe el error, y su texto está en .message", "¿qué hay en e.message?"],
        p2: ['let r = "a"; try { null.x; r = r + "b"; } catch (e) { r = r + "c"; } r', "ac", "null.x da error: salta al catch y la línea de la b NO se ejecuta", "cuando algo falla dentro del try, ¿se ejecuta lo que hay detrás?"],
        p3: ['let r = "a"; try { r = r + "b"; } catch (e) { r = r + "c"; } r', "ab", "si nada falla, el catch NO se ejecuta", "¿hay algún error aquí?"],
        p4: ['class MiError extends Error {} new MiError("x") instanceof Error', true, "MiError hereda de Error: un MiError ES un Error", "piensa en herencia (nivel 10)"],
      }),
    },
    { id: "11.E", ejemplo: true, texto: "👀 Ejemplo: dividir y dividirOCero", fn: ({ m }) => (m.dividir(6, 3) === 2 && m.dividirOCero(1, 0) === 0) || "¿has cambiado el ejemplo?" },
    {
      id: "11.r",
      texto: "🔁 Repaso: Cuadrado extends Figura",
      fn: ({ m }) => {
        const c = new m.Cuadrado(3);
        if (c.area() === 0 && c.nombre() === "figura") return "pendiente";
        if (!(c instanceof m.Figura)) return "Cuadrado tiene que heredar de Figura";
        return (c.area() === 9 && c.nombre() === "cuadrado") || `new Cuadrado(3): area() da ${muestra(c.area())} y nombre() da ${muestra(c.nombre())}`;
      },
    },
    {
      id: "11.1",
      texto: "✍️ raizCuadrada lanza un error con negativos",
      fn: ({ m }) => {
        const r = casos(m.raizCuadrada, "raizCuadrada", [[[9], 3], [[0], 0], [[2.25], 1.5]]);
        if (r !== true) return r;
        const e = mensajeDe(() => m.raizCuadrada(-1));
        if (!e) return `raizCuadrada(-1) no lanza ningún error (da ${muestra(m.raizCuadrada(-1))}): throw new Error("…")`;
        if (typeof e === "string") return 'Lanzas un texto: hay que lanzar un Error → throw new Error("No hay raíz de un negativo")';
        return e.message === "No hay raíz de un negativo" || `El mensaje es ${muestra(e.message)} y tendría que ser "No hay raíz de un negativo"`;
      },
    },
    {
      id: "11.2",
      texto: "✍️ raizOMensaje (try/catch)",
      fn: ({ m }) => {
        let r;
        try {
          r = m.raizOMensaje(-1);
        } catch (e) {
          if (e?.message === "Sin hacer") throw e;
          return "raizOMensaje(-1) deja escapar el error: envuelve la llamada en try { … } catch (error) { … }";
        }
        if (r && typeof r === "object") return "Devuelves el error entero: devuelve solo su texto, error.message";
        return casos(m.raizOMensaje, "raizOMensaje", [[[9], 3], [[-1], "No hay raíz de un negativo"], [[-4], "No hay raíz de un negativo"]]);
      },
    },
    {
      id: "11.3",
      texto: "✍️ crearUsuario valida antes de crear",
      fn: ({ m }) => {
        const ok = casos(m.crearUsuario, "crearUsuario", [[["Ana", 20], { nombre: "Ana", edad: 20 }], [["Luis", 0], { nombre: "Luis", edad: 0 }]]);
        if (ok !== true) return ok;
        for (const [args, msg] of [[["", 20], "Falta el nombre"], [["   ", 20], "Falta el nombre"], [[undefined, 20], "Falta el nombre"], [["Ana", -3], "Edad no válida"], [["Ana", "20"], "Edad no válida"]]) {
          const e = mensajeDe(() => m.crearUsuario(...args));
          const llamada = `crearUsuario(${args.map(muestra).join(", ")})`;
          if (!e) return `${llamada} no lanza ningún error, y tendría que lanzar "${msg}"${args[0] === "   " ? " → «solo espacios» también es vacío: usa nombre.trim()" : ""}${args[1] === "20" ? ' → "20" es un texto, no un número: mira typeof edad' : ""}`;
          if (e.message !== msg) return `${llamada} lanza ${muestra(e.message)} y tendría que lanzar "${msg}"`;
        }
        return true;
      },
    },
    {
      id: "11.4",
      texto: "✍️ ErrorDeStock: tu propio error",
      fn: ({ m }) => {
        const e = new m.ErrorDeStock("Sin stock");
        if (!(e instanceof Error)) return "ErrorDeStock tiene que heredar de Error: class ErrorDeStock extends Error";
        if (e.name === "Error") return "pendiente";
        if (e.message !== "Sin stock") return `message vale ${muestra(e.message)}: pásale el mensaje a la madre con super(mensaje)`;
        return e.name === "ErrorDeStock" || `name vale ${muestra(e.name)} y tendría que ser "ErrorDeStock" (this.name = "ErrorDeStock")`;
      },
    },
    {
      id: "11.5",
      texto: "✍️ vender (lanza ErrorDeStock)",
      fn: ({ m }) => {
        const raton = f({ nombre: "Ratón", stock: 5 });
        const r = casos(m.vender, "vender", [[[raton, 2], { nombre: "Ratón", stock: 3 }], [[raton, 5], { nombre: "Ratón", stock: 0 }]]);
        if (r !== true) return r;
        const no = lanza(() => m.vender(f({ nombre: "Cable", stock: 2 }), 3), m.ErrorDeStock);
        if (no) return `vender(cable con stock 2, 3) ${no}`;
        const e = mensajeDe(() => m.vender(f({ nombre: "Cable", stock: 2 }), 3));
        return e.message === "Solo quedan 2" || `El mensaje es ${muestra(e.message)} y tendría que ser "Solo quedan 2"`;
      },
    },
    {
      id: "11.6",
      texto: "✍️ intentarVender (solo atrapa ErrorDeStock)",
      fn: ({ m }) => {
        const raton = f({ nombre: "Ratón", stock: 5 });
        let r;
        try {
          r = m.intentarVender(raton, 7);
        } catch (e) {
          if (e?.message === "Sin hacer") throw e;
          return `intentarVender(ratón con stock 5, 7) deja escapar el error: atrápalo con try/catch (${e.message})`;
        }
        if (r !== "Solo quedan 5") return `intentarVender(ratón con stock 5, 7) da ${muestra(r)} y tendría que dar "Solo quedan 5"`;
        if (m.intentarVender(raton, 1) !== "Vendido") return `intentarVender(ratón con stock 5, 1) da ${muestra(m.intentarVender(raton, 1))} y tendría que dar "Vendido"`;
        // Otro error (no de stock): tiene que volver a lanzarse
        try {
          const res = m.intentarVender(null, 1);
          return `Con un producto null (otro tipo de error) devuelve ${muestra(res)}: solo hay que atrapar los ErrorDeStock; los demás, throw error; otra vez`;
        } catch (e) {
          return e instanceof TypeError || `Con un producto null lanza ${muestra(e?.message)}: tendría que volver a lanzar el error original`;
        }
      },
    },
  ],
  empezar: {
    "11.p": "En p2, null.x da error: ¿qué líneas del try llegan a ejecutarse?",
    "11.r": "Dentro de class Cuadrado: constructor(lado) { super(); this.lado = lado; } y los métodos area() y nombre()",
    "11.1": "if (n < 0) { throw new Error(\"No hay raíz de un negativo\"); }  y después el return",
    "11.2": "Mira dividirOCero en el ejemplo: lo mismo, pero en el catch devuelves error.message",
    "11.3": "Dos if antes del return, cada uno con su throw new Error(\"…\")",
    "11.4": "Dentro de la clase: constructor(mensaje) { super(mensaje); this.name = \"ErrorDeStock\"; }",
    "11.5": "if (cantidad > producto.stock) { throw new ErrorDeStock(`Solo quedan ${producto.stock}`); }",
    "11.6": "try { vender(…); return \"Vendido\"; } catch (error) { if (error instanceof ErrorDeStock) … ; throw error; }",
  },
};
