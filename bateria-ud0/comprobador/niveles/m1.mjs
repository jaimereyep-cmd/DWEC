// Mini-proyecto 1 · Mi colección: junta los niveles 1 a 8 con datos del propio alumno
import { casos, congelar, cuerpoDe, muestra } from "../ayuda.mjs";

const PRUEBA = () =>
  congelar([
    { nombre: "Dune", categoria: "ciencia ficción", anio: 1965, puntuacion: 9 },
    { nombre: "Momo", categoria: "fantasía", anio: 1973, puntuacion: 8 },
    { nombre: "Fundación", categoria: "ciencia ficción", anio: 1951, puntuacion: 7 },
    { nombre: "El Hobbit", categoria: "fantasía", anio: 1937, puntuacion: 9 },
    { nombre: "Solaris", categoria: "ciencia ficción", anio: 1961, puntuacion: 6 },
  ]);
const sinEscribir = (m, n) => (m[n] === undefined ? "pendiente" : null);

export default {
  id: "m1",
  titulo: "Mini-proyecto 1 · Mi colección",
  corto: "Mini-proyecto 1",
  animo: "Has hecho un programa entero con tus propios datos. Esto ya es programar de verdad.",
  modulos: { m: "src/mini1/coleccion.js" },
  pruebas: [
    {
      id: "M1.1",
      texto: "✍️ Tus datos: 6 o más, 2 o más categorías, con la forma exacta",
      fn: ({ m }) => {
        const c = m.coleccion;
        if (!Array.isArray(c)) return "coleccion tiene que ser una lista: [ … ]";
        if (c.length === 0) return "pendiente";
        for (const [i, e] of c.entries()) {
          const donde = `El elemento ${i + 1} (${muestra(e)})`;
          if (!e || typeof e !== "object") return `${donde} no es un objeto { … }`;
          const sobran = Object.keys(e).filter((k) => !["nombre", "categoria", "anio", "puntuacion"].includes(k));
          if (sobran.length) return `${donde} tiene propiedades que no tocan: ${sobran.join(", ")}. Solo: nombre, categoria, anio, puntuacion (sin tildes ni ñ)`;
          if (typeof e.nombre !== "string" || !e.nombre.trim()) return `${donde}: nombre tiene que ser un texto`;
          if (typeof e.categoria !== "string" || !e.categoria.trim()) return `${donde}: categoria tiene que ser un texto`;
          if (typeof e.anio !== "number") return `${donde}: anio tiene que ser un NÚMERO (sin comillas)`;
          if (typeof e.puntuacion !== "number" || e.puntuacion < 0 || e.puntuacion > 10) return `${donde}: puntuacion tiene que ser un número de 0 a 10`;
        }
        if (c.length < 6) return `Tienes ${c.length} elementos: hacen falta al menos 6`;
        if (new Set(c.map((e) => e.categoria)).size < 2) return "Todos son de la misma categoría: pon al menos 2 distintas (si no, deCategoria no tiene gracia)";
        return true;
      },
    },
    { id: "M1.2", texto: "✍️ titulos", fn: ({ m }) => sinEscribir(m, "titulos") ?? casos(m.titulos, "titulos", [[[PRUEBA()], ["Dune", "Momo", "Fundación", "El Hobbit", "Solaris"]], [[congelar([])], []]]) },
    {
      id: "M1.3",
      texto: "✍️ deCategoria",
      fn: ({ m }) => sinEscribir(m, "deCategoria") ?? casos((l, c) => m.deCategoria(l, c)?.map?.((e) => e.nombre), "deCategoria (los nombres)", [[[PRUEBA(), "fantasía"], ["Momo", "El Hobbit"]], [[PRUEBA(), "terror"], []]]),
    },
    {
      id: "M1.4",
      texto: "✍️ mejor (el primero si hay empate)",
      fn: ({ m }) => {
        const no = sinEscribir(m, "mejor");
        if (no) return no;
        const r = m.mejor(PRUEBA());
        if (typeof r === "number") return "Devuelve la puntuación (un número). Hay que devolver el ELEMENTO entero, el objeto";
        if (r?.nombre === "El Hobbit") return "Con empate (Dune y El Hobbit tienen un 9) sale el último: usa > y no >=, para quedarte con el primero";
        if (r?.nombre !== "Dune") return `mejor(…) da ${muestra(r)} y tendría que ser Dune`;
        return m.mejor(congelar([])) === undefined || "Con la lista vacía tiene que dar undefined";
      },
    },
    {
      id: "M1.5",
      texto: "✍️ mediaPuntuacion (1 decimal)",
      fn: ({ m }) => sinEscribir(m, "mediaPuntuacion") ?? casos(m.mediaPuntuacion, "mediaPuntuacion", [[[PRUEBA()], 7.8], [[PRUEBA().slice(0, 3)], 8], [[congelar([])], 0], [[PRUEBA().slice(1, 3)], 7.5]]),
    },
    { id: "M1.6", texto: "✍️ ficha", fn: ({ m }) => sinEscribir(m, "ficha") ?? casos(m.ficha, "ficha", [[[PRUEBA()[0]], "Dune (1965) · ciencia ficción · ★ 9"], [[PRUEBA()[3]], "El Hobbit (1937) · fantasía · ★ 9"]]) },
    {
      id: "M1.7",
      texto: "✍️ resumen (usa tus funciones)",
      fn: ({ m }, ctx) => {
        const no = sinEscribir(m, "resumen");
        if (no) return no;
        const r = casos(m.resumen, "resumen", [[[PRUEBA()], { total: 5, porCategoria: { "ciencia ficción": 3, fantasía: 2 }, media: 7.8 }], [[congelar([])], { total: 0, porCategoria: {}, media: 0 }]]);
        if (r !== true) return r;
        return /mediaPuntuacion\s*\(/.test(cuerpoDe(ctx.leer("src/mini1/coleccion.js"), "resumen")) || "Da bien, pero usa tu función mediaPuntuacion para la media";
      },
    },
  ],
  empezar: {
    "M1.1": "Copia la línea de ejemplo 6 veces y rellénala con lo tuyo. Cada elemento entre { }, separados por comas",
    "M1.2": "Escribe la función entera: export function titulos(lista) { return lista.map(…); }",
    "M1.3": "filter comparando e.categoria con la categoría que te pasan",
    "M1.4": "Como maximo del nivel 6, pero comparando la puntuacion y guardando el elemento entero",
    "M1.5": "Si está vacía, 0. Si no, suma con reduce, divide entre length y redondea: Math.round(x * 10) / 10",
    "M1.6": "Comillas invertidas con ${elemento.nombre}, ${elemento.anio}…",
    "M1.7": "Cuenta por categoría como en el 8.6 y devuelve { total: …, porCategoria: …, media: mediaPuntuacion(lista) }",
  },
};
