// Nivel 3 · Decisiones: comparaciones, &&, ||, if / else if / else
import { casos, predicciones } from "../ayuda.mjs";

export default {
  id: "3",
  titulo: "Nivel 3 · Decisiones: if, else if, else",
  corto: "Nivel 3",
  animo: "Tus programas ya saben decidir.",
  modulos: { m: "src/nivel03/decisiones.js" },
  pruebas: [
    {
      id: "3.p",
      texto: "🔮 Predicciones: comparar y decidir",
      fn: predicciones({
        p1: ["5 > 3", true, "una comparación da true o false: 5 es mayor que 3", "¿es verdad?"],
        p2: ['5 === "5"', false, "=== compara valor Y tipo: un número nunca es igual a un texto", "uno lleva comillas y el otro no"],
        p3: ["7 > 3 && 2 > 4", false, "&& («y») solo da true si las DOS son true, y 2 > 4 es false", "¿son verdad las dos?"],
        p4: ["7 > 3 || 2 > 4", true, "|| («o») da true si AL MENOS UNA es true", "¿es verdad alguna?"],
        p5: ['let n = 6; let r; if (n > 8) { r = "A"; } else if (n > 5) { r = "B"; } else { r = "C"; } r', "B", "6 > 8 no; 6 > 5 sí → entra en el segundo y ya no mira más", "ve de arriba abajo y para en la primera que se cumpla"],
      }),
    },
    { id: "3.E", ejemplo: true, texto: "👀 Ejemplo: esMayorDeEdad", fn: ({ m }) => (m.esMayorDeEdad(18) === true && m.esMayorDeEdad(17) === false) || "¿has cambiado el ejemplo?" },
    { id: "3.r", texto: "🔁 Repaso: mitad", fn: ({ m }) => casos(m.mitad, "mitad", [[[10], 5], [[7], 3.5], [[0], 0]]) },
    { id: "3.1", texto: "✍️ mayor", fn: ({ m }) => casos(m.mayor, "mayor", [[[3, 8], 8], [[9, 2], 9], [[-1, -5], -1], [[4, 4], 4]]) },
    {
      id: "3.2",
      texto: "✍️ signo",
      fn: ({ m }) => {
        if (m.signo(0) === "positivo") return 'signo(0) da "positivo": el 0 no es mayor que 0. ¿Usas >= en vez de >?';
        return casos(m.signo, "signo", [[[5], "positivo"], [[-2], "negativo"], [[0], "cero"], [[0.5], "positivo"]]);
      },
    },
    {
      id: "3.3",
      texto: "✍️ calificacion (con los bordes 5, 7 y 9)",
      fn: ({ m }) => {
        for (const [n, bien, mal] of [[5, "aprobado", "suspenso"], [7, "notable", "aprobado"], [9, "sobresaliente", "notable"]]) {
          if (m.calificacion(n) === mal) return `calificacion(${n}) da "${mal}" y tendría que dar "${bien}": el ${n} es el BORDE. ¿Has puesto <= donde va <?`;
        }
        if (m.calificacion(8) === "aprobado") return 'calificacion(8) da "aprobado": el orden importa. Si preguntas primero «< 9», el 8 entra ahí… ¿Vas de menor a mayor?';
        return casos(m.calificacion, "calificacion", [[[2], "suspenso"], [[4.9], "suspenso"], [[5], "aprobado"], [[6.5], "aprobado"], [[7], "notable"], [[8.9], "notable"], [[9], "sobresaliente"], [[10], "sobresaliente"]]);
      },
    },
    {
      id: "3.4",
      texto: "✍️ puedeEntrar (dos condiciones)",
      fn: ({ m }) => {
        if (m.puedeEntrar(16, true) === true) return "puedeEntrar(16, true) da true: con 16 años no puede. ¿Usas || («o») en vez de && («y»)?";
        return casos(m.puedeEntrar, "puedeEntrar", [[[20, true], true], [[20, false], false], [[16, true], false], [[18, true], true], [[16, false], false]]);
      },
    },
    {
      id: "3.5",
      texto: "✍️ precioEntrada (tres casos)",
      fn: ({ m }) => {
        if (m.precioEntrada(70) === 9) return "precioEntrada(70) da 9: los de 65 o más pagan 6. ¿Llega tu código a preguntar por ellos?";
        return casos(m.precioEntrada, "precioEntrada", [[[8], 5], [[11], 5], [[12], 9], [[30], 9], [[64], 9], [[65], 6], [[80], 6]]);
      },
    },
    {
      id: "3.6",
      texto: "✍️ esFinde",
      fn: ({ m }) => {
        if (m.esFinde("domingo") === "domingo" || m.esFinde("lunes") === "domingo") return 'Devuelve "domingo": dia === "sábado" || "domingo" no funciona así. Hay que comparar las dos veces: dia === "sábado" || dia === "domingo"';
        return casos(m.esFinde, "esFinde", [[["sábado"], true], [["domingo"], true], [["lunes"], false], [["viernes"], false]]);
      },
    },
  ],
  empezar: {
    "3.p": 'En p5, ve línea a línea: ¿6 > 8? ¿6 > 5? Para en la primera que sea true',
    "3.r": "return y la cuenta: n entre 2",
    "3.1": "if (a > b) { return a; } … y si no, ¿qué devuelves?",
    "3.2": "Tres casos → if, else if y else. Empieza: if (n > 0) { return \"positivo\"; }",
    "3.3": "Pregunta de menor a mayor: primero si nota < 5, luego si nota < 7, luego si nota < 9, y si no…",
    "3.4": "Las dos cosas a la vez: edad >= 18 && conEntrada",
    "3.5": "Mira el ejemplo de esMayorDeEdad: primero los menores de 12, luego los de 65 o más, y el resto",
    "3.6": "Compara dos veces: dia === \"sábado\" || dia === …",
  },
};
