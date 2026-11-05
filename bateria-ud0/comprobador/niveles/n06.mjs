// Nivel 6 · Arrays: índices, length, push, for…of, recorrer, acumular, buscar y crear listas nuevas
import { casos, congelar, cuerpoDe, predicciones } from "../ayuda.mjs";

const c = congelar;
export default {
  id: "6",
  titulo: "Nivel 6 · Arrays: listas de datos",
  corto: "Nivel 6",
  animo: "Ya sabes manejar listas.",
  modulos: { m: "src/nivel06/arrays.js" },
  pruebas: [
    {
      id: "6.p",
      texto: "🔮 Predicciones: posiciones y length",
      fn: ({ m }) => {
        const p = { ...(m.predicciones ?? {}) };
        if (typeof p.p3 === "string" && ["nada", "undefined"].includes(p.p3.trim().toLowerCase())) p.p3 = "__nada__";
        return predicciones({
          p1: ["[10, 20, 30][0]", 10, "las posiciones empiezan en 0: [0] es el PRIMERO", "¿en qué número empiezan las posiciones?"],
          p2: ["[10, 20, 30].length", 3, "length dice cuántos elementos hay", "cuéntalos"],
          p3: ["[10, 20, 30][3]", "__nada__", "hay 3 elementos en las posiciones 0, 1 y 2: en la 3 no hay nada (undefined)", "si empiezan en 0, ¿cuál es la última posición?"],
          p4: ["const a = [1]; a.push(5); a.length", 2, "push añade al FINAL: [1, 5]", "¿qué hace push?"],
        })({ m: { predicciones: p } });
      },
    },
    { id: "6.E", ejemplo: true, texto: "👀 Ejemplo: primero, ultimo y contarAprobados", fn: ({ m }) => (m.primero([4, 5]) === 4 && m.ultimo([4, 5]) === 5 && m.contarAprobados([7, 3, 5]) === 2) || "¿has cambiado el ejemplo?" },
    {
      id: "6.r",
      texto: "🔁 Repaso: triple (flecha, entera)",
      fn: ({ m }) => (m.triple === undefined ? "pendiente" : casos(m.triple, "triple", [[[4], 12], [[0], 0], [[-2], -6]])),
    },
    { id: "6.1", texto: "✍️ sumar", fn: ({ m }) => casos(m.sumar, "sumar", [[[c([4, 1, 5])], 10], [[c([])], 0], [[c([7])], 7], [[c([-3, 3, 10])], 10]]) },
    {
      id: "6.2",
      texto: "✍️ media (usa sumar)",
      fn: ({ m }, ctx) => {
        if (Number.isNaN(m.media(c([])))) return "media([]) da NaN: dividir 0 entre 0 no es un número. Si la lista está vacía, devuelve 0 ANTES de dividir";
        const r = casos(m.media, "media", [[[c([4, 6, 8])], 6], [[c([5])], 5], [[c([])], 0], [[c([1, 2])], 1.5]]);
        if (r !== true) return r;
        return /\bsumar\s*\(/.test(cuerpoDe(ctx.leer("src/nivel06/arrays.js"), "media")) || "Da bien, pero el ejercicio pide USAR tu función sumar(lista)";
      },
    },
    {
      id: "6.3",
      texto: "✍️ maximo (también con negativos)",
      fn: ({ m }) => {
        if (m.maximo(c([-5, -2])) === 0) return "maximo([-5, -2]) da 0: empiezas suponiendo que el mayor es 0, y aquí todos son menores. Empieza con el PRIMERO: lista[0]";
        return casos(m.maximo, "maximo", [[[c([3, 9, 2])], 9], [[c([-5, -2])], -2], [[c([4])], 4], [[c([1, 8, 8, 3])], 8]]);
      },
    },
    {
      id: "6.4",
      texto: "✍️ contiene",
      fn: ({ m }) => {
        if (m.contiene(c([1, 2, 3]), 1) === true && m.contiene(c([1, 2, 3]), 2) === false) return "contiene([1, 2, 3], 2) da false, pero con el 1 (el PRIMERO) sí funciona: tienes un return false dentro del for (en un else), y la función termina en la primera vuelta. El return false va DESPUÉS del for, cuando ya has mirado todos";
        if (m.contiene(c([1, 2, 3]), 1) === false && m.contiene(c([1, 2, 3]), 3) === true) return "contiene([1, 2, 3], 1) da false: solo cuenta el ÚLTIMO elemento. ¿Guardas el resultado en una variable que se pisa en cada vuelta? En cuanto lo encuentres, return true";
        return casos(m.contiene, "contiene", [[[c([1, 2, 3]), 2], true], [[c([1, 2, 3]), 1], true], [[c([1, 2, 3]), 7], false], [[c([]), 1], false], [[c(["a", "b"]), "b"], true]]);
      },
    },
    { id: "6.5", texto: "✍️ soloAprobados (lista nueva)", fn: ({ m }) => casos(m.soloAprobados, "soloAprobados", [[[c([7, 3, 5, 4])], [7, 5]], [[c([1, 2])], []], [[c([])], []], [[c([10, 5])], [10, 5]]]) },
    {
      id: "6.6",
      texto: "✍️ alReves (sin cambiar la original)",
      fn: ({ m }) => casos(m.alReves, "alReves", [[[c([1, 2, 3])], [3, 2, 1]], [[c(["a"])], ["a"]], [[c([])], []]]),
    },
  ],
  empezar: {
    "6.p": 'En p3, si crees que no hay nada, escribe "nada"',
    "6.r": "Una flecha entera: export const triple = (n) => …;",
    "6.1": "Un acumulador y for (const n of lista) { … }",
    "6.2": "Primero: if (lista.length === 0) { return 0; }. Después: sumar(lista) / lista.length",
    "6.3": "let mayor = lista[0]; y recorre la lista: si uno es más grande que mayor, mayor pasa a ser ese",
    "6.4": "Recorre la lista: en cuanto encuentres el valor, return true. Si el bucle termina sin encontrarlo, return false",
    "6.5": "const aprobados = []; recorre las notas y, si nota >= 5, aprobados.push(nota)",
    "6.6": "for (let i = lista.length - 1; i >= 0; i--) { … lista[i] … }",
  },
};
