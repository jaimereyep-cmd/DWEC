// Nivel 0 · Arrancar: console.log, textos y números, comentarios y leer un error
import { predicciones, sinComentarios } from "../ayuda.mjs";

const lineas = (ctx) => ctx.salida.m ?? [];

export default {
  id: "0",
  titulo: "Nivel 0 · Arrancar: tu primer programa",
  corto: "Nivel 0",
  animo: "Ya has escrito, ejecutado y arreglado tu primer programa.",
  modulos: { m: "src/nivel00/hola.js" },
  pruebas: [
    {
      id: "0.p",
      texto: "🔮 Predicciones: ¿qué muestra?",
      fn: predicciones({
        p1: ["console.log(2 + 3)", "5", "sin comillas, 2 + 3 es una CUENTA: el ordenador la hace y muestra el resultado", "sin comillas, ¿es un texto o una cuenta?"],
        p2: ['console.log("2" + "3")', "23", "entre comillas son TEXTOS, y + con textos los PEGA uno detrás de otro", "¿qué hace + cuando tiene dos textos?"],
        p3: ['console.log("2 + 3")', "2 + 3", "todo está entre comillas: es un texto y se muestra tal cual, sin calcular nada", "¿dónde están las comillas?"],
      }, { muestra: true }),
    },
    {
      id: "0.E",
      ejemplo: true,
      texto: "👀 Ejemplo: muestra ¡Hola, mundo!",
      fn: (_, ctx) => lineas(ctx).includes("¡Hola, mundo!") || "No se muestra «¡Hola, mundo!»: ¿has borrado la línea del ejemplo?",
    },
    {
      id: "0.1",
      texto: "✍️ Muestra «Me llamo …» con tu nombre",
      fn: (_, ctx) => {
        const l = lineas(ctx);
        if (l.some((x) => /^Me llamo \S/.test(x))) return true;
        const casi = l.find((x) => /me\s*llamo/i.test(x));
        if (casi) return `Muestra «${casi}»: tiene que empezar exactamente por «Me llamo » (M mayúscula, un espacio) y luego tu nombre`;
        return "pendiente";
      },
    },
    {
      id: "0.2",
      texto: "✍️ Muestra el resultado de 7 + 5, calculado",
      fn: (_, ctx) => {
        const l = lineas(ctx);
        if (l.includes("7 + 5") || l.includes("7+5")) return "Muestra «7 + 5» tal cual: va entre comillas y es un TEXTO. Quítale las comillas para que el ordenador haga la cuenta";
        if (l.includes("75")) return "Muestra 75: has pegado dos textos (\"7\" + \"5\"). Escribe los números SIN comillas";
        if (!l.includes("12")) return "pendiente";
        return /7\s*\+\s*5/.test(sinComentarios(ctx.leer("src/nivel00/hola.js"))) || "Muestra 12, pero lo has escrito tú. Que lo calcule el ordenador: console.log(7 + 5)";
      },
    },
    {
      id: "0.3",
      texto: "✍️ Muestra uno, dos y tres, en tres líneas",
      fn: (_, ctx) => {
        const l = lineas(ctx);
        const i = l.indexOf("uno");
        if (i >= 0 && l[i + 1] === "dos" && l[i + 2] === "tres") return true;
        if (l.some((x) => /uno.*dos/.test(x))) return "Salen en la MISMA línea. Cada console.log muestra una línea: usa tres";
        if (l.some((x) => /^(uno|dos|tres)$/i.test(x))) return "Tienen que salir «uno», «dos» y «tres», en minúsculas, en ese orden y seguidas";
        return "pendiente";
      },
    },
    {
      id: "0.4",
      texto: "✍️ Un comentario: Mi primer programa",
      fn: (_, ctx) => {
        const codigo = ctx.leer("src/nivel00/hola.js") ?? "";
        if (/^\s*\/\/\s*Mi primer programa\s*$/im.test(codigo)) return true;
        if (lineas(ctx).some((x) => /mi primer programa/i.test(x))) return "Lo MUESTRAS con console.log. Un comentario no se muestra: es una línea que empieza por //";
        return "pendiente";
      },
    },
    {
      id: "0.5",
      texto: "✍️ Arregla la línea con el error",
      fn: (_, ctx) => {
        if (lineas(ctx).includes("Ya sé arreglar errores")) return true;
        return "pendiente";
      },
    },
  ],
  empezar: {
    "0.p": 'Lee cada línea y piensa: ¿hay comillas? Entre comillas es un texto; sin comillas, una cuenta. Escribe tu respuesta entre comillas: p1: "…"',
    "0.1": 'Copia la línea del ejemplo y cambia lo de dentro de las comillas: console.log("Me llamo …");',
    "0.2": "Dentro de los paréntesis, los números SIN comillas: el ordenador hace la cuenta antes de mostrarla",
    "0.3": "Tres líneas de código, cada una con su console.log y su texto entre comillas",
    "0.4": "Una línea que empieza por dos barras // y después el texto. No lleva console.log",
    "0.5": "Primero quita las //. Al ejecutar, el error dice «Invalid or unexpected token»: ¿dónde se cierra el texto?",
  },
};
