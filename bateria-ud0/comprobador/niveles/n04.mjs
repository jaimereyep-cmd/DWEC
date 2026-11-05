// Nivel 4 · Bucles: for, while, acumuladores y contadores
import { casos, cuerpoDe, predicciones } from "../ayuda.mjs";

const usaBucle = (ctx, nombre) => /\b(for|while)\s*\(/.test(cuerpoDe(ctx.leer("src/nivel04/bucles.js"), nombre));
const conBucle = (ctx, nombre, r) => (r !== true ? r : usaBucle(ctx, nombre) || `Da bien, pero este nivel es para practicar bucles: hazlo con un for o un while`);

export default {
  id: "4",
  titulo: "Nivel 4 · Bucles: for y while",
  corto: "Nivel 4",
  animo: "Ya sabes repetir: esto es la mitad de programar.",
  modulos: { m: "src/nivel04/bucles.js" },
  pruebas: [
    {
      id: "4.p",
      texto: "🔮 Predicciones: ¿cuántas vueltas?",
      fn: predicciones({
        p1: ["let n = 0; for (let i = 0; i < 3; i++) { n = n + 1; } n", 3, "i vale 0, 1 y 2 (el 3 ya no cumple i < 3): tres vueltas", "apunta en un papel el valor de i en cada vuelta"],
        p2: ["let s = 0; for (let i = 1; i <= 3; i++) { s = s + i; } s", 6, "s va valiendo 1, 3 y 6: es el truco del acumulador", "suma i en cada vuelta: 1, luego 2, luego 3"],
        p3: ['let t = ""; for (let i = 1; i <= 3; i++) { t = t + i; } t', "123", 't es un TEXTO, así que + PEGA: "" → "1" → "12" → "123"', "t empieza siendo un texto vacío: ¿qué hace + con un texto?"],
        p4: ["let x = 1; while (x < 10) { x = x * 2; } x", 16, "x vale 1, 2, 4, 8 y 16; con 16 ya no se cumple x < 10 y para", "¿cuándo deja de cumplirse x < 10?"],
      }),
    },
    { id: "4.E", ejemplo: true, texto: "👀 Ejemplo: sumaHasta", fn: ({ m }) => m.sumaHasta(4) === 10 || "¿has cambiado el ejemplo?" },
    { id: "4.r", texto: "🔁 Repaso: valorAbsoluto", fn: ({ m }) => casos(m.valorAbsoluto, "valorAbsoluto", [[[-7], 7], [[3], 3], [[0], 0]]) },
    {
      id: "4.1",
      texto: "✍️ factorial",
      fn: ({ m }, ctx) => {
        if (m.factorial(4) === 0) return "factorial(4) da 0: el acumulador empieza en 0, y 0 por lo que sea es 0. Para multiplicar, empieza en 1";
        return conBucle(ctx, "factorial", casos(m.factorial, "factorial", [[[4], 24], [[1], 1], [[5], 120], [[0], 1]]));
      },
    },
    {
      id: "4.2",
      texto: "✍️ cuentaAtras",
      fn: ({ m }, ctx) => {
        if (m.cuentaAtras(3) === "1 2 3 ¡Ya!") return "Cuenta hacia DELANTE. Empieza en n y baja: for (let i = n; i >= 1; i--)";
        return conBucle(ctx, "cuentaAtras", casos(m.cuentaAtras, "cuentaAtras", [[[3], "3 2 1 ¡Ya!"], [[1], "1 ¡Ya!"], [[5], "5 4 3 2 1 ¡Ya!"]]));
      },
    },
    { id: "4.3", texto: "✍️ contarPares", fn: ({ m }, ctx) => conBucle(ctx, "contarPares", casos(m.contarPares, "contarPares", [[[10], 5], [[7], 3], [[1], 0], [[2], 1]])) },
    {
      id: "4.4",
      texto: "✍️ contarVocales",
      fn: ({ m }, ctx) => {
        if (m.contarVocales("murcielago") === 4 || m.contarVocales("casa") === 1) return "Te falta una: ¿tu for llega hasta la ÚLTIMA letra? Las posiciones van de 0 a length - 1 → i < texto.length";
        return conBucle(ctx, "contarVocales", casos(m.contarVocales, "contarVocales", [[["murcielago"], 5], [["casa"], 2], [["xyz"], 0], [[""], 0]]));
      },
    },
    {
      id: "4.5",
      texto: "✍️ tablaDel",
      fn: ({ m }, ctx) => {
        const r = m.tablaDel(2);
        if (typeof r === "string" && r.endsWith("\n")) return "Sobra el \\n del final (después de la línea 10 no va salto)";
        if (typeof r === "string" && r.split("\n").length === 9) return "Salen 9 líneas: ¿el for llega hasta el 10? (i <= 10)";
        const esperado = (n) => Array.from({ length: 10 }, (_, i) => `${n} x ${i + 1} = ${n * (i + 1)}`).join("\n");
        if (typeof r === "string" && r !== esperado(2)) {
          const linea = r.split("\n").findIndex((l, i) => l !== esperado(2).split("\n")[i]);
          return `La línea ${linea + 1} sale «${r.split("\n")[linea]}» y tendría que ser «${esperado(2).split("\n")[linea]}»`;
        }
        return conBucle(ctx, "tablaDel", casos(m.tablaDel, "tablaDel", [[[2], esperado(2)], [[7], esperado(7)]]));
      },
    },
    { id: "4.6", texto: "✍️ vecesParaLlegar (while)", fn: ({ m }, ctx) => conBucle(ctx, "vecesParaLlegar", casos(m.vecesParaLlegar, "vecesParaLlegar", [[[1, 10], 4], [[5, 5], 0], [[3, 4], 1], [[1, 1000], 10]])) },
  ],
  empezar: {
    "4.p": "Haz de ordenador: en un papel, una fila por vuelta con lo que vale cada variable",
    "4.r": "Si n es negativo, devuelve -n (le das la vuelta al signo). Si no, n",
    "4.1": "Como sumaHasta, pero el acumulador empieza en 1 y en cada vuelta MULTIPLICA",
    "4.2": "let texto = \"\"; un for desde n hasta 1 con i--, y en cada vuelta texto = texto + i + \" \"; al final le pegas \"¡Ya!\"",
    "4.3": "Un contador que empieza en 0. Dentro del for: if (i % 2 === 0) { cuantos++; }",
    "4.4": "for (let i = 0; i < texto.length; i++) { … texto[i] es la letra de esta vuelta … }",
    "4.5": "Un acumulador de texto. En cada vuelta: n + \" x \" + i + \" = \" + n * i. Y el \"\\n\" solo si no es la última",
    "4.6": "let veces = 0; while (cantidad < meta) { duplica la cantidad y suma 1 a veces }",
  },
};
