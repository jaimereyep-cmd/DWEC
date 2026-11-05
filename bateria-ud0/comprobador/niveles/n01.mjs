// Nivel 1 · Variables y tipos: const, let, number, string, boolean, typeof, + con textos
import { muestra, predicciones, sinComentarios } from "../ayuda.mjs";

const codigo = (ctx) => sinComentarios(ctx.leer("src/nivel01/variables.js"));

export default {
  id: "1",
  titulo: "Nivel 1 · Variables y tipos de datos",
  corto: "Nivel 1",
  animo: "Ya sabes guardar datos en variables.",
  modulos: { m: "src/nivel01/variables.js" },
  pruebas: [
    {
      id: "1.p",
      texto: "🔮 Predicciones: tipos y variables",
      fn: predicciones({
        p1: ["typeof 5", "number", "5 sin comillas es un NÚMERO", "¿lleva comillas?"],
        p2: ['typeof "5"', "string", "con comillas es un TEXTO, aunque dentro haya un número", "¿lleva comillas?"],
        p3: ["typeof true", "boolean", "true y false son los dos únicos BOOLEANOS (verdadero/falso)", "true no es un texto: no lleva comillas"],
        p4: ["let x = 3; x = x + 1; x", 4, "x = x + 1 se lee «x pasa a valer lo que valía (3) más 1»", "primero se calcula lo de la derecha del = con el valor de antes"],
      }),
    },
    {
      id: "1.E",
      ejemplo: true,
      texto: "👀 Ejemplo: ciudad y habitantes",
      fn: ({ m }) => (m.ciudad === "Cádiz" && m.habitantes === 115000) || "¿has cambiado el ejemplo?",
    },
    {
      id: "1.1",
      texto: "✍️ nombre: un texto",
      fn: ({ m }) => {
        if (m.nombre === undefined) return "pendiente";
        if (typeof m.nombre !== "string") return `nombre vale ${muestra(m.nombre)}, que no es un texto. Los textos van entre comillas: "Lucía"`;
        return m.nombre.trim() !== "" || "nombre está vacío: escribe tu nombre dentro de las comillas";
      },
    },
    {
      id: "1.2",
      texto: "✍️ edad: un número",
      fn: ({ m }) => {
        if (m.edad === undefined) return "pendiente";
        if (typeof m.edad === "string") return `edad vale ${muestra(m.edad)}: es un TEXTO porque lleva comillas. Los números van sin comillas: 19`;
        if (typeof m.edad !== "number" || Number.isNaN(m.edad)) return `edad vale ${muestra(m.edad)}, que no es un número`;
        return (m.edad > 0 && m.edad < 120) || `¿de verdad tienes ${m.edad} años?`;
      },
    },
    {
      id: "1.3",
      texto: "✍️ esAlumno: un booleano",
      fn: ({ m }) => {
        if (m.esAlumno === undefined) return "pendiente";
        if (m.esAlumno === "true" || m.esAlumno === "false") return `esAlumno vale el TEXTO ${muestra(m.esAlumno)}. true y false van sin comillas`;
        return typeof m.esAlumno === "boolean" || `esAlumno vale ${muestra(m.esAlumno)}: tiene que ser true o false`;
      },
    },
    {
      id: "1.4",
      texto: "✍️ puntos: 10 y luego se le suman 5",
      fn: ({ m }, ctx) => {
        const c = codigo(ctx);
        if (/let\s+puntos\s*=\s*15/.test(c)) return "Has escrito 15 directamente. Deja let puntos = 10; y SÚMALE 5 en la línea de debajo: puntos = puntos + 5;";
        if (m.puntos === 10) return "pendiente";
        if (m.puntos === "105") return 'puntos vale "105": has pegado un texto. El 5 va SIN comillas';
        if (m.puntos !== 15) return `puntos vale ${muestra(m.puntos)} y tendría que valer 15`;
        return /puntos\s*(=\s*puntos\s*\+|\+=)/.test(c) || "Vale 15, pero no veo dónde le sumas 5: puntos = puntos + 5;";
      },
    },
    {
      id: "1.5",
      texto: "✍️ saludo: usa la variable nombre",
      fn: ({ m }, ctx) => {
        if (m.saludo === undefined) return "pendiente";
        if (typeof m.nombre !== "string") return "Primero haz el 1.1 (nombre)";
        if (m.saludo === "Hola, soy nombre") return 'Sale «Hola, soy nombre»: la palabra nombre está DENTRO de las comillas. Ponla fuera: "Hola, soy " + nombre';
        if (m.saludo === "Hola, soy ${nombre}") return "Sale «${nombre}» tal cual: con ${…} hay que usar comillas invertidas ` (la tecla a la derecha de la P), no \" ni '";
        if (m.saludo !== `Hola, soy ${m.nombre}`) return `saludo vale ${muestra(m.saludo)} y tendría que ser ${muestra(`Hola, soy ${m.nombre}`)}${m.saludo === `Hola, soy${m.nombre}` ? " → falta el espacio después de «soy»" : ""}`;
        return /(\+\s*nombre|\$\{\s*nombre\s*\})/.test(codigo(ctx)) || "Sale bien, pero has escrito tu nombre a mano. Usa la VARIABLE: \"Hola, soy \" + nombre";
      },
    },
  ],
  empezar: {
    "1.p": 'typeof devuelve el tipo como TEXTO: "number", "string" o "boolean". En p4, sigue la caja x paso a paso',
    "1.1": 'Cambia undefined por tu nombre entre comillas: export const nombre = "…";',
    "1.2": "Un número se escribe tal cual, sin comillas: export const edad = 19;",
    "1.3": "Solo hay dos booleanos: true o false. Sin comillas",
    "1.4": "Debajo de let puntos = 10; escribe una línea que diga que puntos pasa a valer puntos + 5",
    "1.5": "Une el texto \"Hola, soy \" (con el espacio) y la variable nombre con un +",
  },
};
