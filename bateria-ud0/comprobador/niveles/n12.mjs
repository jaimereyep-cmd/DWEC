// Nivel 12 · DOM: createElement, textContent, classList, append, querySelector(All), vaciar
import { casos, cuerpoDe, muestra, predicciones } from "../ayuda.mjs";

const html = (el) => (el && typeof el === "object" && "outerHTML" in el ? el.outerHTML : muestra(el));
const div = (contenido = "") => {
  const d = document.createElement("div");
  d.innerHTML = contenido;
  document.body.append(d);
  return d;
};

export default {
  id: "12",
  titulo: "Nivel 12 · El DOM: pintar en la página",
  corto: "Nivel 12",
  animo: "Ya pintas en la página con JavaScript: el bloque B de la práctica 2 va de esto.",
  modulos: { m: "src/nivel12/pintar.js" },
  dom: true,
  pruebas: [
    {
      id: "12.p",
      texto: "🔮 Predicciones: crear y buscar elementos",
      fn: predicciones({
        p1: ['document.createElement("p").tagName', "P", "tagName es el nombre de la etiqueta, en MAYÚSCULAS", "¿qué etiqueta es? (sale en mayúsculas)"],
        p2: ['const d = document.createElement("div"); d.textContent = "hola"; d.textContent', "hola", "textContent guarda y devuelve el texto del elemento", "lo que guardas es lo que lees"],
        p3: ['const u = document.createElement("ul"); u.append(document.createElement("li"), document.createElement("li")); u.children.length', 2, "append puede colgar varios a la vez; children son los hijos", "¿cuántos <li> has colgado?"],
        p4: ['document.createElement("div").querySelector("p")', null, "querySelector da null si no encuentra nada (el div está vacío)", "¿hay algún <p> dentro de un div recién creado?"],
      }),
    },
    { id: "12.E", ejemplo: true, texto: "👀 Ejemplo: ponerTitulo", fn: ({ m }) => (m.ponerTitulo(div(), "Hola").outerHTML === "<h2>Hola</h2>") || "¿has cambiado el ejemplo?" },
    {
      id: "12.r",
      texto: "🔁 Repaso: validarPrecio",
      fn: ({ m }) => {
        if (m.validarPrecio(5) !== 5) return `validarPrecio(5) da ${muestra(m.validarPrecio(5))}`;
        for (const malo of [0, -2, "5", NaN]) {
          try {
            m.validarPrecio(malo);
            return `validarPrecio(${muestra(malo)}) no lanza ningún error`;
          } catch (e) {
            if (e?.message !== "Precio no válido") return `validarPrecio(${muestra(malo)}) lanza ${muestra(e?.message)} y tendría que ser "Precio no válido"`;
          }
        }
        return true;
      },
    },
    {
      id: "12.1",
      texto: "✍️ crearParrafo (con textContent)",
      fn: ({ m }) => {
        const p = m.crearParrafo("Hola");
        if (!p || p.tagName !== "P") return `crearParrafo("Hola") devuelve ${html(p)} y tendría que devolver un <p>`;
        if (p.textContent !== "Hola") return `El párrafo tiene el texto ${muestra(p.textContent)}`;
        const peligro = m.crearParrafo("<b>hola</b>");
        return peligro.querySelector("b") === null || 'Con "<b>hola</b>" sale una negrita: usas innerHTML, que interpreta las etiquetas. Para textos, textContent';
      },
    },
    {
      id: "12.2",
      texto: "✍️ crearLista",
      fn: ({ m }) => {
        const ul = m.crearLista(["pan", "leche", "huevos"]);
        if (!ul || ul.tagName !== "UL") return `crearLista devuelve ${html(ul)} y tendría que devolver un <ul>`;
        if (ul.outerHTML === "<ul><li>huevos</li></ul>") return "Solo sale el último: ¿creas un <li> nuevo en CADA vuelta del bucle?";
        if (ul.outerHTML !== "<ul><li>pan</li><li>leche</li><li>huevos</li></ul>") return `crearLista(["pan", "leche", "huevos"]) da ${ul.outerHTML}`;
        return m.crearLista([]).outerHTML === "<ul></ul>" || "Con una lista vacía tiene que dar <ul></ul>";
      },
    },
    {
      id: "12.3",
      texto: "✍️ crearTarjeta",
      fn: ({ m }) => {
        const t = m.crearTarjeta({ nombre: "Teclado", precio: 25 });
        const bien = '<article class="producto"><h3>Teclado</h3><p class="precio">25 €</p></article>';
        if (!t || t.tagName !== "ARTICLE") return `crearTarjeta devuelve ${html(t)} y tendría que devolver un <article>`;
        if (!t.classList.contains("producto")) return 'Al <article> le falta la clase "producto": classList.add("producto")';
        if (!t.querySelector("h3")) return "Falta el <h3> con el nombre dentro del article";
        if (!t.querySelector("p.precio")) return 'Falta el <p class="precio"> dentro del article';
        if (t.outerHTML !== bien) return `Da ${t.outerHTML}\n           y tendría que dar ${bien}`;
        return m.crearTarjeta({ nombre: "<i>x</i>", precio: 1 }).querySelector("i") === null || "El nombre se interpreta como HTML: usa textContent";
      },
    },
    {
      id: "12.4",
      texto: "✍️ pintarProductos (vacía y usa crearTarjeta)",
      fn: ({ m }, ctx) => {
        const c = div("<p>lo de antes</p>");
        m.pintarProductos(c, [{ nombre: "Teclado", precio: 25 }, { nombre: "Ratón", precio: 12 }]);
        if (c.querySelector("p:not(.precio)")) return "Lo que había antes en el contenedor sigue ahí: vacíalo primero (contenedor.replaceChildren())";
        const n = c.querySelectorAll("article.producto").length;
        if (n !== 2) return `Después de pintar 2 productos hay ${n} tarjetas`;
        m.pintarProductos(c, [{ nombre: "Monitor", precio: 140 }]);
        const n2 = c.querySelectorAll("article.producto").length;
        if (n2 !== 1) return `Al pintar otra vez (1 producto) hay ${n2} tarjetas: se acumulan. Vacía el contenedor al principio`;
        if (c.querySelector("h3")?.textContent !== "Monitor") return "La tarjeta no es la del Monitor";
        return /crearTarjeta\s*\(/.test(cuerpoDe(ctx.leer("src/nivel12/pintar.js"), "pintarProductos")) || "Funciona, pero usa tu función crearTarjeta(…)";
      },
    },
    {
      id: "12.5",
      texto: "✍️ resaltar (querySelectorAll)",
      fn: ({ m }) => {
        const c = div("<ul><li>a</li><li class='x'>b</li><li class='x'>c</li></ul><p class='x'>d</p>");
        const r = m.resaltar(c, "li");
        const marcados = c.querySelectorAll(".resaltado").length;
        if (marcados === 1) return "Solo se resalta el primero: querySelector da uno; para todos, querySelectorAll y un for…of";
        if (marcados !== 3) return `resaltar(c, "li") ha resaltado ${marcados} elementos y tendría que resaltar los 3 <li>`;
        if (r !== 3) return `resaltar(c, "li") devuelve ${muestra(r)} y tendría que devolver 3`;
        return m.resaltar(div("<p class='x'>a</p><p>b</p>"), ".x") === 1 || 'resaltar(c, ".x") tiene que funcionar con cualquier selector';
      },
    },
    {
      id: "12.6",
      texto: "✍️ contarTexto",
      fn: ({ m }) => {
        const c = div("<ul><li>pan de pueblo</li><li>leche</li><li>empanada</li></ul><p>pan</p>");
        return casos(m.contarTexto, "contarTexto(lista, …)", [[[c, "li", "pan"], 2], [[c, "li", "huevos"], 0], [[c, "p", "pan"], 1]]);
      },
    },
  ],
  empezar: {
    "12.p": "Prueba cada una en la página (botón Probar): ahí hay document",
    "12.r": "Un if que junte las tres condiciones con || y lance el error; si no, return precio",
    "12.1": "createElement(\"p\"), su textContent = texto, y return",
    "12.2": "Crea el <ul>; recorre los textos y por cada uno crea un <li>, ponle el texto y cuélgalo en el <ul>",
    "12.3": "Tres createElement (article, h3, p), dos classList.add y un append(h3, p) en el article",
    "12.4": "contenedor.replaceChildren(); y luego for (const p of productos) contenedor.append(crearTarjeta(p));",
    "12.5": "const elementos = contenedor.querySelectorAll(selector); for…of con classList.add; return elementos.length",
    "12.6": "Un contador; for (const el of contenedor.querySelectorAll(selector)) si el.textContent.includes(palabra), súmale 1",
  },
};
