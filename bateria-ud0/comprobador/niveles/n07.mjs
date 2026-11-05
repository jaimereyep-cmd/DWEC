// Nivel 7 · Objetos: crear, leer con punto y corchetes, copiar con spread, recorrer con for…in
import { casos, congelar, predicciones } from "../ayuda.mjs";

const f = (o) => Object.freeze({ ...o });
export default {
  id: "7",
  titulo: "Nivel 7 · Objetos: fichas de datos",
  corto: "Nivel 7",
  animo: "Ya sabes agrupar datos en objetos.",
  modulos: { m: "src/nivel07/objetos.js" },
  pruebas: [
    {
      id: "7.p",
      texto: "🔮 Predicciones: leer propiedades",
      fn: ({ m }) => {
        const p = { ...(m.predicciones ?? {}) };
        if (typeof p.p3 === "string" && ["nada", "undefined"].includes(p.p3.trim().toLowerCase())) p.p3 = "__nada__";
        return predicciones({
          p1: ['const p = { nombre: "Ana", edad: 20 }; p.edad', 20, "con punto se lee una propiedad por su nombre", "busca edad en el objeto"],
          p2: ['const p = { nombre: "Ana", edad: 20 }; p["nombre"]', "Ana", 'p["nombre"] es lo mismo que p.nombre, con corchetes y comillas', "corchetes o punto, ¿es la misma propiedad?"],
          p3: ['const p = { nombre: "Ana", edad: 20 }; p.ciudad', "__nada__", "si la propiedad no existe da undefined (no da error)", "¿hay ciudad en el objeto?"],
          p4: ["const p = { a: 1, b: 2 }; let n = 0; for (const k in p) { n++; } n", 2, "for…in da una vuelta por cada propiedad: a y b", "¿cuántas propiedades tiene?"],
        })({ m: { predicciones: p } });
      },
    },
    { id: "7.E", ejemplo: true, texto: "👀 Ejemplo: crearPersona y esMayor", fn: ({ m }) => (m.crearPersona("Ana", 20).edad === 20 && m.esMayor({ edad: 17 }) === false) || "¿has cambiado el ejemplo?" },
    { id: "7.r", texto: "🔁 Repaso: contarMayoresQue", fn: ({ m }) => casos(m.contarMayoresQue, "contarMayoresQue", [[[congelar([3, 8, 10, 1]), 5], 2], [[congelar([]), 5], 0], [[congelar([5, 5]), 5], 0]]) },
    {
      id: "7.1",
      texto: "✍️ crearProducto",
      fn: ({ m }) => {
        const r = m.crearProducto("Teclado", 25);
        if (r?.disponible === "true") return 'disponible vale el TEXTO "true": true va sin comillas';
        return casos(m.crearProducto, "crearProducto", [[["Teclado", 25], { nombre: "Teclado", precio: 25, disponible: true }], [["Ratón", 9.5], { nombre: "Ratón", precio: 9.5, disponible: true }]]);
      },
    },
    {
      id: "7.2",
      texto: "✍️ presentar",
      fn: ({ m }) => {
        if (/persona\.|\$\{/.test(String(m.presentar(f({ nombre: "Ana", edad: 20 }))))) return "Sale el código tal cual: para meter variables en un texto con ${…} hacen falta comillas invertidas ` `";
        return casos(m.presentar, "presentar", [[[f({ nombre: "Ana", edad: 20 })], "Me llamo Ana y tengo 20 años"], [[f({ nombre: "Luis", edad: 33 })], "Me llamo Luis y tengo 33 años"]]);
      },
    },
    {
      id: "7.3",
      texto: "✍️ leerCampo (corchetes)",
      fn: ({ m }) => {
        if (m.leerCampo(f({ campo: "¡ojo!", edad: 20 }), "edad") === "¡ojo!") return 'Usas objeto.campo: eso busca una propiedad que se llama literalmente «campo». El nombre está DENTRO de la variable: objeto[campo]';
        return casos(m.leerCampo, "leerCampo", [[[f({ nombre: "Ana", edad: 20 }), "edad"], 20], [[f({ nombre: "Ana" }), "nombre"], "Ana"], [[f({ nombre: "Ana" }), "ciudad"], undefined]]);
      },
    },
    {
      id: "7.4",
      texto: "✍️ cumplirAnios (objeto nuevo)",
      fn: ({ m }) => {
        const ana = f({ nombre: "Ana", edad: 20 });
        const r = m.cumplirAnios(ana);
        if (r === ana) return "Devuelves el MISMO objeto: crea uno nuevo con { ...persona, … }";
        if (r?.edad === "201") return 'edad sale "201": pegas textos. Suma el NÚMERO 1: persona.edad + 1';
        return casos(m.cumplirAnios, "cumplirAnios", [[[ana], { nombre: "Ana", edad: 21 }], [[f({ nombre: "Luis", edad: 9, ciudad: "Cádiz" })], { nombre: "Luis", edad: 10, ciudad: "Cádiz" }]]);
      },
    },
    {
      id: "7.5",
      texto: "✍️ rebajar (nunca por debajo de 0)",
      fn: ({ m }) => {
        if (m.rebajar(f({ nombre: "Ratón", precio: 15 }), 20)?.precio === -5) return "Con 20 € de rebaja sale -5: el precio no puede bajar de 0. Un if antes de devolver";
        return casos(m.rebajar, "rebajar", [[[f({ nombre: "Ratón", precio: 15 }), 5], { nombre: "Ratón", precio: 10 }], [[f({ nombre: "Ratón", precio: 15 }), 20], { nombre: "Ratón", precio: 0 }], [[f({ nombre: "Cable", precio: 8, disponible: true }), 8], { nombre: "Cable", precio: 0, disponible: true }]]);
      },
    },
    {
      id: "7.6",
      texto: "✍️ describir (for…in)",
      fn: ({ m }) => {
        const r = m.describir(f({ nombre: "Ana", edad: 20 }));
        if (r === "nombre: Ana, edad: 20, ") return "Sobra la coma del final. Pon la coma ANTES de cada propiedad menos la primera";
        if (r === ", nombre: Ana, edad: 20") return "Sobra la coma del principio: la primera propiedad no lleva coma delante";
        return casos(m.describir, "describir", [[[f({ nombre: "Ana", edad: 20 })], "nombre: Ana, edad: 20"], [[f({ a: 1 })], "a: 1"], [[f({})], ""]]);
      },
    },
  ],
  empezar: {
    "7.p": 'En p3, si crees que no hay nada, escribe "nada"',
    "7.r": "Un contador y for…of; súmale 1 cuando x > n",
    "7.1": "return { nombre: nombre, precio: precio, disponible: true };",
    "7.2": "Comillas invertidas: `Me llamo ${persona.nombre} y …`",
    "7.3": "Una línea: return objeto[campo];",
    "7.4": "return { ...persona, edad: persona.edad + 1 };   (los ... copian todo; luego cambias lo que quieras)",
    "7.5": "Calcula el precio nuevo en una variable; si es menor que 0, ponlo a 0; y devuelve { ...producto, precio: … }",
    "7.6": "let texto = \"\"; for (const clave in objeto) { … clave + \": \" + objeto[clave] … }; la coma solo si texto ya no está vacío",
  },
};
