// Nivel 8 · Listas de objetos: find, filter, map, reduce, contar por categoría y ordenar sin cambiar la original
import { casos, congelar, cuerpoDe, muestra, predicciones } from "../ayuda.mjs";

const TIENDA = () =>
  congelar([
    { nombre: "Teclado", precio: 25, stock: 4, categoria: "periféricos" },
    { nombre: "Ratón", precio: 12, stock: 0, categoria: "periféricos" },
    { nombre: "Cable HDMI", precio: 8.5, stock: 10, categoria: "cables" },
    { nombre: "Monitor", precio: 140, stock: 2, categoria: "pantallas" },
    { nombre: "Alfombrilla", precio: 6, stock: 7, categoria: "periféricos" },
  ]);
const nombresDe = (lista) => (Array.isArray(lista) ? lista.map((p) => p?.nombre) : lista);

export default {
  id: "8",
  titulo: "Nivel 8 · Listas de objetos: find, filter, map y reduce",
  corto: "Nivel 8",
  animo: "Esto es justo lo que pide la práctica 1: ya puedes hacerla.",
  modulos: { m: "src/nivel08/listas.js" },
  pruebas: [
    {
      id: "8.p",
      texto: "🔮 Predicciones: map, filter, find y reduce",
      fn: predicciones({
        p1: ["[1, 2, 3].map((n) => n * 2)", [2, 4, 6], "map devuelve una lista NUEVA con el resultado de la flecha para cada uno", "aplica n * 2 a cada número; el resultado es una lista: [ … ]"],
        p2: ["[1, 2, 3, 4].filter((n) => n > 2)", [3, 4], "filter se queda con los que cumplen la condición", "¿cuáles son mayores que 2? Va en una lista: [ … ]"],
        p3: ["[5, 8, 12].find((n) => n > 6)", 8, "find devuelve el PRIMERO que cumple (solo uno, no una lista)", "¿cuál es el primero mayor que 6?"],
        p4: ["[1, 2, 3].reduce((suma, n) => suma + n, 0)", 6, "reduce acumula: 0 + 1 = 1, 1 + 2 = 3, 3 + 3 = 6", "suma empieza en 0 y en cada vuelta se le añade n"],
      }),
    },
    { id: "8.E", ejemplo: true, texto: "👀 Ejemplo: nombres y agotados", fn: ({ m }) => (m.nombres(TIENDA()).length === 5 && m.agotados(TIENDA())[0].nombre === "Ratón") || "¿has cambiado el ejemplo?" },
    { id: "8.r", texto: "🔁 Repaso: etiqueta", fn: ({ m }) => casos(m.etiqueta, "etiqueta", [[[TIENDA()[0]], "Teclado · 25 €"], [[TIENDA()[2]], "Cable HDMI · 8.5 €"]]) },
    {
      id: "8.1",
      texto: "✍️ baratos (filter)",
      fn: ({ m }) => {
        const r = m.baratos(TIENDA(), 12);
        if (Array.isArray(r) && r.length === 2) return "baratos(tienda, 12) no incluye el Ratón, que cuesta justo 12: «maximo o menos» es <=";
        if (r !== undefined && !Array.isArray(r)) return `devuelve ${muestra(r)} y tendría que ser una LISTA de productos (filter)`;
        return casos((...a) => nombresDe(m.baratos(...a)), "baratos (los nombres)", [[[TIENDA(), 12], ["Ratón", "Cable HDMI", "Alfombrilla"]], [[TIENDA(), 5], []], [[TIENDA(), 1000], ["Teclado", "Ratón", "Cable HDMI", "Monitor", "Alfombrilla"]]]);
      },
    },
    {
      id: "8.2",
      texto: "✍️ buscar (find)",
      fn: ({ m }) => {
        const r = m.buscar(TIENDA(), "Monitor");
        if (Array.isArray(r)) return "Devuelve una LISTA: filter da todos los que cumplen. Para uno solo, find";
        if (r === true) return "Devuelve true: some/includes dicen SI está. Hay que devolver el producto: find";
        if (r?.nombre !== "Monitor") return `buscar(tienda, "Monitor") da ${muestra(r)}`;
        return m.buscar(TIENDA(), "Silla") === undefined || `buscar(tienda, "Silla") da ${muestra(m.buscar(TIENDA(), "Silla"))} y tendría que dar undefined`;
      },
    },
    {
      id: "8.3",
      texto: "✍️ valorDelAlmacen (reduce)",
      fn: ({ m }) => {
        const r = m.valorDelAlmacen(TIENDA());
        if (r === 191.5) return "Da 191.5: has sumado los precios. Cada producto vale precio × stock";
        if (typeof r === "string") return 'Da un texto: ¿te falta el 0 del final del reduce? → reduce((total, p) => …, 0)';
        return casos(m.valorDelAlmacen, "valorDelAlmacen", [[[TIENDA()], 25 * 4 + 8.5 * 10 + 140 * 2 + 6 * 7], [[congelar([])], 0]]);
      },
    },
    {
      id: "8.4",
      texto: "✍️ etiquetas (map, usa etiqueta)",
      fn: ({ m }, ctx) => {
        const r = casos(m.etiquetas, "etiquetas", [[[TIENDA().slice(0, 2)], ["Teclado · 25 €", "Ratón · 12 €"]], [[congelar([])], []]]);
        if (r !== true) return r;
        return /\betiqueta\b/.test(cuerpoDe(ctx.leer("src/nivel08/listas.js"), "etiquetas").replace(/^.*?\{/s, "")) || "Da bien, pero el ejercicio pide USAR tu función etiqueta dentro del map";
      },
    },
    {
      id: "8.5",
      texto: "✍️ conDescuento (objetos nuevos)",
      fn: ({ m }) => {
        const r = m.conDescuento(TIENDA(), 10);
        if (r?.[0]?.precio === 2.5) return "El teclado sale a 2.5: eso es el descuento. El precio nuevo es el precio menos ese 10 %";
        return casos(m.conDescuento, "conDescuento", [
          [[TIENDA().slice(0, 3), 10], [{ ...TIENDA()[0], precio: 22.5 }, { ...TIENDA()[1], precio: 10.8 }, { ...TIENDA()[2], precio: 7.65 }]],
          [[TIENDA().slice(3), 0], TIENDA().slice(3).map((p) => ({ ...p }))],
        ]);
      },
    },
    {
      id: "8.6",
      texto: "✍️ contarPorCategoria",
      fn: ({ m }) => {
        const r = m.contarPorCategoria(TIENDA());
        if (r && Number.isNaN(r.periféricos)) return "Sale NaN: la primera vez, cuenta[categoria] es undefined, y undefined + 1 es NaN. Empieza en 0: (cuenta[c] ?? 0) + 1";
        return casos(m.contarPorCategoria, "contarPorCategoria", [[[TIENDA()], { periféricos: 3, cables: 1, pantallas: 1 }], [[congelar([])], {}]]);
      },
    },
    {
      id: "8.7",
      texto: "✍️ ordenarPorPrecio (sin cambiar la original)",
      fn: ({ m }) => {
        let r;
        try {
          r = m.ordenarPorPrecio(TIENDA());
        } catch (e) {
          if (e instanceof TypeError && /read only|Cannot assign/.test(e.message)) return "sort está ordenando la lista ORIGINAL (y no se puede tocar). Ordena una copia: [...productos].sort(…)";
          throw e;
        }
        const n = nombresDe(r);
        if (muestra(n) === muestra(["Monitor", "Teclado", "Ratón", "Cable HDMI", "Alfombrilla"])) return "Sale de más caro a más barato: es a.precio - b.precio (no al revés)";
        return muestra(n) === muestra(["Alfombrilla", "Cable HDMI", "Ratón", "Teclado", "Monitor"]) || `ordenarPorPrecio da ${muestra(n)}`;
      },
    },
  ],
  empezar: {
    "8.p": "Prueba cada una en la página (botón Probar) o con npm run probar \"…\"",
    "8.r": "Comillas invertidas: `${producto.nombre} · ${producto.precio} €`",
    "8.1": "return productos.filter((p) => …);   ¿qué condición tiene que cumplir p?",
    "8.2": "Como el 8.1, pero con find y comparando el nombre",
    "8.3": "reduce((total, p) => total + p.precio * p.stock, 0)",
    "8.4": "return productos.map((p) => etiqueta(p));",
    "8.5": "map, y para cada p devuelve ({ ...p, precio: … }). Ojo: un objeto devuelto por una flecha va entre paréntesis",
    "8.6": "const cuenta = {}; for (const p of productos) { cuenta[p.categoria] = (cuenta[p.categoria] ?? 0) + 1; }",
    "8.7": "Copia la lista con [...productos] y ordena la copia con sort((a, b) => a.precio - b.precio)",
  },
};
