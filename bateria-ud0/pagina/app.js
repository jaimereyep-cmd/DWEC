// app.js — La página de la batería 0. No hace falta tocarla: lo tuyo está en src/.
// Carga TU fichero del nivel, enseña lo que muestra con console.log, deja sus funciones y clases en la consola (F12)
// y ejecuta los ejemplos. Cada vez que guardas un fichero de src/, Vite recarga la página sola.
import { BLOQUES, cargarColeccion, cargarModulo, prediccionesDe, textoDe } from "./ejemplos.js";

const pedido = new URLSearchParams(location.search).get("bloque") ?? "0";
const bloque = BLOQUES.find((b) => b.n === pedido) ?? BLOQUES[0];
const app = document.querySelector("#app");

// ── Mostrar un valor como lo enseñaría la consola (en corto) ──
function mostrar(v, prof = 0) {
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "function") return /^class\b/.test(Function.prototype.toString.call(v)) ? `class ${v.name}` : `ƒ ${v.name || "(anónima)"}()`;
  if (typeof v !== "object") return String(v);
  if (v instanceof Error) return `${v.name}: ${v.message}`;
  if (v instanceof Element) return `<${v.tagName.toLowerCase()}>`;
  if (prof > 3) return "…";
  if (Array.isArray(v)) return `[${v.map((x) => mostrar(x, prof + 1)).join(", ")}]`;
  const clase = v.constructor && v.constructor !== Object ? `${v.constructor.name} ` : "";
  const props = Object.entries(v).map(([k, x]) => `${k}: ${mostrar(x, prof + 1)}`);
  return props.length ? `${clase}{ ${props.join(", ")} }` : `${clase}{}`;
}

// ── Lo que se escribe con console.log mientras pasa algo ──
function capturando(fn) {
  const original = console.log;
  const lineas = [];
  console.log = (...a) => {
    lineas.push(a.map((x) => (typeof x === "string" ? x : mostrar(x))).join(" "));
    original(...a);
  };
  try {
    return { resultado: fn(), lineas };
  } finally {
    console.log = original;
  }
}

// ── Ejecutar código como la consola: da el valor de la última sentencia ──
const ejecutarEnGlobal = (codigo) => (0, eval)(codigo); // eval indirecto: cada ejecución con sus propias const
function ejecutar(codigo) {
  let r;
  const { lineas } = capturando(() => {
    try {
      r = { ok: true, valor: ejecutarEnGlobal(codigo) };
    } catch (error) {
      r = { ok: false, error };
    }
  });
  return { ...r, lineas };
}

const el = (etiqueta, props = {}, ...hijos) => {
  const nodo = Object.assign(document.createElement(etiqueta), props);
  nodo.append(...hijos);
  return nodo;
};

const faltaAlgo = (error) => error instanceof TypeError && / is not a (function|constructor)$/.test(error.message);
const errorDePrograma = (error) => [TypeError, ReferenceError, SyntaxError, RangeError].some((C) => error?.constructor === C);

function textoError(error, codigo) {
  if (error?.message === "Sin hacer") return ["pendiente", "⏳ Sin hacer todavía"];
  if (faltaAlgo(error) || (error instanceof ReferenceError && / is not defined$/.test(error.message))) {
    return ["pendiente", `⏳ Todavía no existe: ${error.message.replace(/ is not (a function|a constructor|defined)$/, "")}. ¿Lo has escrito? ¿Lleva export?`];
  }
  console.groupCollapsed(`💥 ${error?.name}: ${error?.message} · al ejecutar: ${codigo.split("\n").at(-1)}`);
  console.error(error);
  console.groupEnd();
  return ["mal", `💥 ${error?.name ?? "Error"}: ${error?.message ?? error}   (más detalle en la consola, F12)`];
}

function filaEjemplo({ codigo, espera, tipo = "✍️" }) {
  const r = ejecutar(codigo);
  let clase;
  let texto;
  if (espera === "💥") {
    if (r.ok) [clase, texto] = ["mal", `No lanza ningún error, y debería. Da: ${mostrar(r.valor)}`];
    else if (r.error?.message === "Sin hacer" || errorDePrograma(r.error)) [clase, texto] = textoError(r.error, codigo);
    else [clase, texto] = ["bien", `💥 lanza ${r.error?.name}: ${r.error?.message}  ✔`];
  } else if (r.ok) {
    const sale = mostrar(r.valor);
    if (espera === null) [clase, texto] = ["info", sale];
    else [clase, texto] = sale === espera ? ["bien", `${sale}  ✔`] : ["mal", `${sale}   ✘ se esperaba ${espera}`];
  } else {
    [clase, texto] = textoError(r.error, codigo);
  }
  return el(
    "li",
    { className: `ejemplo ${clase}` },
    el("span", { className: "tipo", textContent: tipo }),
    el("pre", { className: "codigo", textContent: codigo }),
    el("div", { className: "resultado", textContent: `→ ${texto}` }),
  );
}

function seccionPredicciones(lista, tuyas) {
  if (lista.length === 0) return "";
  const filas = lista.map(({ clave, expresion }) => {
    const salida = el("td", { className: "real" });
    const boton = el("button", { type: "button", textContent: "Probar" });
    boton.addEventListener("click", () => {
      const r = ejecutar(expresion);
      const muestra = r.lineas.length ? `📺 muestra: ${r.lineas.join(" | ")}` : "";
      salida.textContent = r.ok ? muestra || mostrar(r.valor) : `💥 ${r.error.name}: ${r.error.message}`;
    });
    const tuya = tuyas?.[clave];
    return el("tr", {}, el("td", { textContent: clave }), el("td", {}, el("code", { textContent: expresion })), el("td", { textContent: tuya === undefined ? "(sin contestar)" : mostrar(tuya) }), el("td", {}, boton), salida);
  });
  return el(
    "section",
    {},
    el("h2", { textContent: "🔮 Predicciones" }),
    el("p", { textContent: "Contesta PRIMERO en tu fichero (cambia cada undefined). Después pulsa «Probar» para ver lo que da de verdad. El PORQUÉ te lo explica: docker compose run --rm web npm run comprobar " + bloque.n }),
    el("div", { className: "tabla" }, el("table", {}, el("thead", {}, el("tr", {}, ...["", "Código", "Tu respuesta", "", "Lo que da"].map((t) => el("th", { textContent: t })))), el("tbody", {}, ...filas))),
  );
}

function seccionProbar() {
  const area = el("textarea", { rows: 4, spellcheck: false, value: bloque.ejemplos.at(-1)?.codigo ?? 'console.log("Hola");\n2 + 3' });
  const salida = el("pre", { className: "salida" });
  const boton = el("button", { type: "button", textContent: "▶ Ejecutar" });
  boton.addEventListener("click", () => {
    const r = ejecutar(area.value);
    salida.className = `salida ${r.ok ? "bien" : "mal"}`;
    const muestra = r.lineas.map((l) => `📺 ${l}`).join("\n");
    salida.textContent = (muestra ? muestra + "\n" : "") + (r.ok ? `→ ${mostrar(r.valor)}` : textoError(r.error, area.value)[1]);
  });
  return el("section", {}, el("h2", { textContent: "🧪 Prueba tu código" }), el("p", { textContent: "Como en la consola: 📺 es lo que muestra con console.log y → lo que da la última línea. Puedes usar todo lo del nivel." }), area, boton, salida);
}

function seccionDepurar(nombres) {
  return el(
    "section",
    { className: "depurar" },
    el("h2", { textContent: "🐞 Depurar en el navegador" }),
    el(
      "ol",
      {},
      el("li", { textContent: "F12 → Consola: están tus funciones y clases con su nombre. Prueba, por ejemplo: " }, el("code", { textContent: nombres.slice(0, 6).join(", ") || "(todavía no hay)" })),
      el("li", { textContent: "Si un ejemplo sale 💥, en la consola está el error: pincha en el enlace azul (src/…:línea) y te lleva a la línea que falla." }),
      el("li", { textContent: "Para ver tu código paso a paso: escribe debugger; dentro de tu función, abre F12 y recarga. Con el código parado, pasa el ratón por encima de las variables y avanza con F10." }),
    ),
  );
}

async function seccionApp(m) {
  const raiz = el("div", { className: "mi-app" });
  raiz.innerHTML = `<form class="alta"><input name="nombre" placeholder="nombre"> <input name="categoria" placeholder="categoría"> <input name="anio" placeholder="año" size="6"> <input name="puntuacion" placeholder="puntuación" size="6"> <button>Añadir</button><p class="errores"></p></form>
  <label>Filtrar: <select class="filtro"><option value="">Todas</option></select></label><div class="tarjetas"></div>`;
  const borrar = el("button", { type: "button", textContent: "🗑 Borrar lo guardado y volver a mi colección" });
  borrar.addEventListener("click", () => {
    localStorage.removeItem("mi-coleccion");
    location.reload();
  });
  const seccion = el("section", {}, el("h2", { textContent: "🌐 Tu aplicación, funcionando" }), el("p", { textContent: "Con tus datos del mini-proyecto 1. Añade, quita y filtra; luego recarga la página: ¡lo recuerda!" }), raiz, borrar);
  try {
    m.iniciarApp(raiz, new m.Coleccion("mi-coleccion", await cargarColeccion()));
  } catch (error) {
    seccion.append(el("p", { className: "mal", textContent: textoError(error, "iniciarApp(…)")[1] }));
  }
  return seccion;
}

// ── Arrancar ──
document.querySelector("#bloques").append(
  ...BLOQUES.map((b) => el("a", { href: `?bloque=${b.n}`, className: b.n === bloque.n ? "activo" : "", textContent: /^m/.test(b.n) ? `🏁 ${b.n.toUpperCase()}` : `${b.n} · ${b.titulo}` })),
);

let m;
let muestra = [];
try {
  // Lo que tu programa muestra al cargarse (el import es asíncrono: se captura hasta que termina)
  const original = console.log;
  console.log = (...a) => {
    muestra.push(a.map((x) => (typeof x === "string" ? x : mostrar(x))).join(" "));
    original(...a);
  };
  try {
    m = await cargarModulo(bloque.fichero);
  } finally {
    console.log = original;
  }
} catch (error) {
  console.error(error);
  app.append(
    el("section", { className: "mal" }, el("h2", { textContent: "💥 Tu código no se puede cargar" }), el("pre", { textContent: `${error.name}: ${error.message}` }), el("p", { textContent: "Suele ser un error de sintaxis: unas comillas, una llave o un paréntesis de más o de menos. Vite también lo enseña en la terminal. Arréglalo y guarda: la página se recarga sola." })),
  );
}

if (m) {
  const exportado = { ...m };
  delete exportado.predicciones;
  Object.assign(window, exportado);
  const nombres = Object.keys(exportado);
  console.info(`Nivel ${bloque.n}: tienes en la consola ${nombres.join(", ")}`);
  if (bloque.preparar) ejecutarEnGlobal(bloque.preparar);
  if (bloque.n === "m2") window.coleccion = await cargarColeccion();
  const partes = [el("h2", { className: "titulo-bloque", textContent: `${/^m/.test(bloque.n) ? "🏁" : "Nivel " + bloque.n + " ·"} ${bloque.titulo}` })];
  if (muestra.length || ["0", "1", "m1"].includes(bloque.n)) {
    partes.push(el("section", {}, el("h2", { textContent: "📺 Lo que muestra tu programa" }), el("pre", { className: "salida bien", textContent: muestra.join("\n") || "(nada todavía: escribe algún console.log)" }), el("p", { textContent: `En la terminal también lo ves con: docker compose run --rm web npm run ejecutar ${bloque.n}` })));
  }
  if (bloque.escenario) {
    const escenario = el("div", { id: "escenario", className: "escenario" });
    escenario.innerHTML = bloque.html ?? "";
    window.escenario = escenario;
    partes.push(el("section", {}, el("h2", { textContent: "🖼 El escenario (lo que pintan tus funciones)" }), escenario));
  }
  if (bloque.ejemplos.length) {
    partes.splice(1, 0, el("section", {}, el("h2", { textContent: "▶ Tus funciones, en marcha" }), el("p", { textContent: "La página ejecuta estos ejemplos con TU código cada vez que guardas. 👀 = ejemplo resuelto · 🔁 = repaso. El comprobador prueba muchos casos más." }), el("ul", { className: "ejemplos" }, ...bloque.ejemplos.map(filaEjemplo))));
  }
  if (bloque.app) partes.push(await seccionApp(m));
  partes.push(seccionPredicciones(prediccionesDe(await textoDe(bloque.fichero)), m.predicciones), seccionProbar(), seccionDepurar(nombres));
  app.append(...partes);
}
