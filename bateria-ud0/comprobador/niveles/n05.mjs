// Nivel 5 · Funciones: escribirlas enteras, return frente a console.log, flecha, parámetros por defecto, llamar a otras
import { casos, cuerpoDe, predicciones } from "../ayuda.mjs";

const fichero = (ctx) => ctx.leer("src/nivel05/funciones.js");
const sinEscribir = (m, nombre) => (m[nombre] === undefined ? "pendiente" : typeof m[nombre] !== "function" ? `${nombre} existe pero no es una función` : null);
const usa = (ctx, en, que) => new RegExp(`\\b${que}\\s*\\(`).test(cuerpoDe(fichero(ctx), en));

export default {
  id: "5",
  titulo: "Nivel 5 · Funciones: tus propias herramientas",
  corto: "Nivel 5",
  animo: "Ya escribes funciones enteras. Con esto se construye todo lo demás.",
  modulos: { m: "src/nivel05/funciones.js" },
  pruebas: [
    {
      id: "5.p",
      texto: "🔮 Predicciones: ¿qué devuelve?",
      fn: ({ m }) => {
        // p2: la respuesta buena es undefined, que es justo lo que hay sin contestar: aquí vale «nada» o "undefined"
        const p = { ...(m.predicciones ?? {}) };
        if (typeof p.p2 === "string" && ["nada", "undefined", "ninguno", "ninguna"].includes(p.p2.trim().toLowerCase())) p.p2 = "__nada__";
        return predicciones({
          p1: ["function f(x) { return x + 1; } f(2)", 3, "devuelve x + 1, y x vale 2", "¿qué valor tiene x cuando llamas f(2)?"],
          p2: ["function g(x) { console.log(x); } g(2)", "__nada__", "MUESTRA un 2, pero no tiene return: no DEVUELVE nada (undefined)", "¿tiene return?"],
          p3: ["const h = (a, b) => a * b; h(3, 4)", 12, "una flecha devuelve lo que hay detrás de =>: 3 * 4", "lo de detrás de la flecha es lo que se devuelve"],
          p4: ['function s(n = "anónimo") { return "Hola, " + n; } s()', "Hola, anónimo", "si no le pasas el dato, n toma el valor por defecto", "¿qué vale n si llamas s() sin nada?"],
        })({ m: { predicciones: p } });
      },
    },
    { id: "5.E", ejemplo: true, texto: "👀 Ejemplo: areaRectangulo y perimetroRectangulo", fn: ({ m }) => (m.areaRectangulo(3, 4) === 12 && m.perimetroRectangulo(3, 4) === 14) || "¿has cambiado el ejemplo?" },
    { id: "5.r", texto: "🔁 Repaso: sumaPares", fn: ({ m }) => casos(m.sumaPares, "sumaPares", [[[6], 12], [[7], 12], [[1], 0], [[10], 30]]) },
    {
      id: "5.1",
      texto: "✍️ cuadrado (función flecha)",
      fn: ({ m }, ctx) => {
        const no = sinEscribir(m, "cuadrado");
        if (no) return no;
        const r = casos(m.cuadrado, "cuadrado", [[[4], 16], [[0], 0], [[-3], 9]]);
        if (r !== true) return r;
        return /=>/.test(cuerpoDe(fichero(ctx), "cuadrado")) || "Funciona, pero se pide como función FLECHA: export const cuadrado = (n) => …;";
      },
    },
    {
      id: "5.2",
      texto: "✍️ saludar (parámetro por defecto)",
      fn: ({ m }) => {
        const no = sinEscribir(m, "saludar");
        if (no) return no;
        if (m.saludar() === "Hola, undefined") return 'saludar() da "Hola, undefined": falta el valor por defecto en el parámetro → (nombre = "desconocido")';
        return casos(m.saludar, "saludar", [[["Ana"], "Hola, Ana"], [[], "Hola, desconocido"]]);
      },
    },
    {
      id: "5.3",
      texto: "✍️ hipotenusa (usa cuadrado)",
      fn: ({ m }, ctx) => {
        const no = sinEscribir(m, "hipotenusa");
        if (no) return no;
        const r = casos(m.hipotenusa, "hipotenusa", [[[3, 4], 5], [[6, 8], 10], [[5, 12], 13]]);
        if (r !== true) return r;
        return usa(ctx, "hipotenusa", "cuadrado") || "Da bien, pero el ejercicio pide USAR tu función cuadrado(…)";
      },
    },
    {
      id: "5.4",
      texto: "✍️ aplicarDescuento",
      fn: ({ m }) => {
        const no = sinEscribir(m, "aplicarDescuento");
        if (no) return no;
        if (m.aplicarDescuento(80, 25) === 20) return "aplicarDescuento(80, 25) da 20: eso es lo que te DESCUENTAN. El precio final es 80 - 20";
        if (m.aplicarDescuento(80, 25) === 55) return "aplicarDescuento(80, 25) da 55: le restas 25 euros, no el 25 %. El 25 % de 80 es 80 * 25 / 100";
        return casos(m.aplicarDescuento, "aplicarDescuento", [[[80, 25], 60], [[100, 10], 90], [[50, 0], 50], [[20, 100], 0]]);
      },
    },
    {
      id: "5.5",
      texto: "✍️ redondear",
      fn: ({ m }) => {
        const no = sinEscribir(m, "redondear");
        if (no) return no;
        if (m.redondear(12.3456) === "12.35") return 'Devuelve el TEXTO "12.35" (toFixed da un texto). Usa Math.round(n * 100) / 100, que da un número';
        if (m.redondear(12.3456) === 12) return "Da 12: redondeas a entero. Multiplica por 100 antes de redondear y divide después";
        return casos(m.redondear, "redondear", [[[12.3456], 12.35], [[3], 3], [[2.004], 2], [[0.125], 0.13]]);
      },
    },
    {
      id: "5.6",
      texto: "✍️ precioFinal (usa tus funciones)",
      fn: ({ m }, ctx) => {
        const no = sinEscribir(m, "precioFinal");
        if (no) return no;
        const r = casos(m.precioFinal, "precioFinal", [[[80, 25], 72.6], [[9.99, 10], 10.88], [[100, 0], 121]]);
        if (r !== true) return r;
        if (!usa(ctx, "precioFinal", "aplicarDescuento") || !usa(ctx, "precioFinal", "redondear")) return "Da bien, pero el ejercicio pide USAR tus funciones aplicarDescuento(…) y redondear(…)";
        return true;
      },
    },
  ],
  empezar: {
    "5.p": 'En p2, si crees que no devuelve nada, escribe "nada"',
    "5.r": "Un acumulador y un for. Puedes ir de 2 en 2: for (let i = 2; i <= n; i += 2)",
    "5.1": "Mira perimetroRectangulo en el ejemplo: export const cuadrado = (n) => …;",
    "5.2": "El valor por defecto va en el paréntesis: export function saludar(nombre = \"desconocido\") { … }",
    "5.3": "Dentro: return Math.sqrt(cuadrado(a) + cuadrado(b));  ¿ves cómo una función usa otra?",
    "5.4": "Calcula el descuento (precio * porcentaje / 100) y réstaselo al precio",
    "5.5": "Una flecha: (n) => Math.round(n * 100) / 100",
    "5.6": "De dentro afuera: aplicarDescuento(precio, porcentaje) → por 1.21 → redondear(…)",
  },
};
