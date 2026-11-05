// Nivel 2 · Operaciones (+ - * / %), textos (+, length, [0], toUpperCase, slice) y la primera idea de función
import { casos, cuerpoDe, predicciones } from "../ayuda.mjs";

export default {
  id: "2",
  titulo: "Nivel 2 · Operaciones y textos",
  corto: "Nivel 2",
  animo: "Ya sabes hacer cuentas y trabajar con textos.",
  modulos: { m: "src/nivel02/operaciones.js" },
  pruebas: [
    {
      id: "2.p",
      texto: "🔮 Predicciones: operaciones y textos",
      fn: predicciones({
        p1: ["7 % 2", 1, "% da el RESTO de la división: 7 entre 2 es 3 y sobra 1", "% no es el porcentaje: es lo que SOBRA al dividir"],
        p2: ["10 / 4", 2.5, "la división da decimales (con punto): 2.5", "¿10 entre 4 es exacto?"],
        p3: ['"Hola".length', 4, "length cuenta los caracteres: H-o-l-a", "cuenta las letras"],
        p4: ['"Hola mundo".slice(0, 4)', "Hola", "slice(0, 4) corta desde la posición 0 hasta la 4, SIN incluir la 4", "las posiciones empiezan en 0; la última no se incluye"],
      }),
    },
    { id: "2.E", ejemplo: true, texto: "👀 Ejemplo: doble y saludar", fn: ({ m }) => (m.doble(4) === 8 && m.saludar("Ana") === "Hola, Ana!") || "¿has cambiado el ejemplo?" },
    { id: "2.r", texto: "🔁 Repaso: tipoDe", fn: ({ m }) => casos(m.tipoDe, "tipoDe", [[[5], "number"], [["hola"], "string"], [[false], "boolean"], [["7"], "string"]]) },
    {
      id: "2.1",
      texto: "✍️ conIva",
      fn: ({ m }) => {
        if (m.conIva(100) === 100.21) return "conIva(100) da 100.21: le SUMAS 0.21. Hay que MULTIPLICAR: precio * 1.21";
        if (m.conIva(100) === 21) return "conIva(100) da 21: eso es solo el IVA. El precio con IVA es precio * 1.21";
        return casos(m.conIva, "conIva", [[[100], 121], [[10], 12.1], [[0], 0]]);
      },
    },
    {
      id: "2.2",
      texto: "✍️ esPar",
      fn: ({ m }) => {
        const r = m.esPar(4);
        if (r === 0) return "esPar(4) da 0: devuelves el resto. Compáralo con 0 para que salga true o false: n % 2 === 0";
        return casos(m.esPar, "esPar", [[[4], true], [[7], false], [[0], true], [[13], false]]);
      },
    },
    { id: "2.3", texto: "✍️ nombreCompleto", fn: ({ m }) => casos(m.nombreCompleto, "nombreCompleto", [[["Ana", "López"], "Ana López"], [["Luis", "Gil"], "Luis Gil"]]) },
    {
      id: "2.4",
      texto: "✍️ iniciales",
      fn: ({ m }) => {
        if (m.iniciales("Ana", "López") === "A.L") return 'Da "A.L": falta el punto del final';
        return casos(m.iniciales, "iniciales", [[["Ana", "López"], "A.L."], [["Luis", "Gil"], "L.G."]]);
      },
    },
    {
      id: "2.5",
      texto: "✍️ gritar",
      fn: ({ m }) => {
        const r = m.gritar("hola");
        if (typeof r === "string" && /toUpperCase/.test(r)) return "Sale el código, no el resultado: ¿has puesto toUpperCase dentro de comillas?";
        if (typeof r === "function") return "Devuelves la función toUpperCase sin llamarla: faltan los paréntesis → texto.toUpperCase()";
        return casos(m.gritar, "gritar", [[["hola"], "HOLA!"], [["vamos"], "VAMOS!"]]);
      },
    },
    {
      id: "2.6",
      texto: "✍️ letrasDe (usando nombreCompleto)",
      fn: ({ m }, ctx) => {
        const r = casos(m.letrasDe, "letrasDe", [[["Ana", "López"], 9], [["Luis", "Gil"], 8]]);
        if (r !== true) return r;
        return /nombreCompleto\s*\(/.test(cuerpoDe(ctx.leer("src/nivel02/operaciones.js"), "letrasDe")) || "Da bien, pero el ejercicio pide USAR tu función nombreCompleto(nombre, apellido) y luego .length";
      },
    },
  ],
  empezar: {
    "2.p": "Puedes probar cada una: docker compose run --rm web npm run probar \"7 % 2\"",
    "2.r": "Es una sola línea: return typeof …;",
    "2.1": "return y la cuenta: el precio por 1.21",
    "2.2": "return n % 2 === 0;  (=== compara y da true o false)",
    "2.3": "Pega tres cosas con +: el nombre, un espacio \" \" y el apellido",
    "2.4": "nombre[0] es la primera letra. Pega: primera letra + \".\" + …",
    "2.5": "texto.toUpperCase() (con paréntesis) y le pegas \"!\"",
    "2.6": "Llama a tu función nombreCompleto(nombre, apellido) y pregúntale su .length",
  },
};
