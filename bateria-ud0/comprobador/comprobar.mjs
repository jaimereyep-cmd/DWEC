// comprobar.mjs — El comprobador de la batería de la UD0 (programar desde cero). Lo lanza:
//   docker compose run --rm web npm run comprobar        → todos los niveles
//   docker compose run --rm web npm run comprobar 3      → solo el nivel 3 (con una pista 💡 en cada ejercicio)
//   docker compose run --rm web npm run comprobar m1     → solo el mini-proyecto 1
//   ... npm run comprobar -- --informe                   → además guarda entrega/informe-comprobador.txt
// Te dice qué llevas bien y qué te falta. NO te da la solución: te dice qué caso falla y te da una pista.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { inspect } from "node:util";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const { BLOQUES, EMPEZAR } = await import("./pruebas.mjs");

// Node no siempre dice en qué fichero está un error de sintaxis: lo buscamos con node --check
function dondeEsta(error, primero = []) {
  const enPila = (error.stack ?? "").split("\n").find((l) => l.includes("/src/"));
  if (enPila) return ` (${enPila.trim().replace(/^at\s+/, "").replace(/^.*\/src\//, "src/")})`;
  if (error.name !== "SyntaxError") return "";
  const peso = (f) => (primero.includes(`src/${f}`) ? 0 : 1);
  const ficheros = readdirSync(join(RAIZ, "src"), { recursive: true })
    .filter((f) => f.endsWith(".js"))
    .sort((a, b) => peso(a) - peso(b) || a.localeCompare(b));
  for (const f of ficheros) {
    const r = spawnSync(process.execPath, ["--check", join(RAIZ, "src", f)], { encoding: "utf8" });
    if (r.status !== 0) {
      const linea = r.stderr.split("\n").find((l) => l.includes(`src/${f}:`)) ?? "";
      const num = linea.match(/:(\d+)\s*$/)?.[1];
      return ` → en src/${f}${num ? `, línea ${num}` : ""}`;
    }
  }
  return "";
}

// Los errores de sintaxis más típicos de quien empieza, explicados
function explicarError(error) {
  const m = error?.message ?? "";
  if (/Unexpected end of input/.test(m)) return " → te falta cerrar algo: una llave } o un paréntesis )";
  if (/Invalid or unexpected token/.test(m)) return " → ¿unas comillas sin cerrar? Un texto empieza y acaba con las mismas comillas: \"…\"";
  if (/missing \) after argument list/.test(m)) return " → te falta un paréntesis ) o una coma entre dos cosas";
  if (/Unexpected token '}'/.test(m)) return " → sobra una llave } (o falta una { más arriba)";
  if (/Unexpected identifier/.test(m)) return " → dos palabras seguidas sin nada entre medias: ¿falta una coma, un + o unas comillas?";
  if (/is not defined/.test(m)) return " → ese nombre no existe: ¿está bien escrito (mayúsculas incluidas)? ¿Lo has declarado con const o let?";
  if (/Assignment to constant variable/.test(m)) return " → una const no se puede cambiar. Si su valor tiene que cambiar, decláralo con let";
  if (/has already been declared/.test(m)) return " → has declarado dos veces el mismo nombre: la segunda vez, sin const ni let";
  if (/Private field/.test(m)) return " → un campo #privado se declara arriba de la clase (#dinero = 0;) antes de usarlo";
  return "";
}

// ───────────────────────── modo hijo: ejecuta UN nivel y devuelve JSON ─────────────────────────
// Cada nivel va en un proceso aparte con un tiempo máximo: así un bucle infinito no cuelga todo.
if (args[0] === "--hijo") {
  const bloque = BLOQUES.find((b) => b.id === args[1]);
  if (bloque.dom) {
    const { GlobalRegistrator } = await import("@happy-dom/global-registrator");
    GlobalRegistrator.register({ url: "http://localhost/" });
  }
  // Lo que tu código escribe con console.log NO sale por pantalla: se guarda para comprobarlo
  const consola = [];
  const texto = (v) => (typeof v === "string" ? v : inspect(v, { depth: 3, breakLength: Infinity }));
  for (const nivel of ["log", "info", "warn", "error"]) console[nivel] = (...a) => consola.push(a.map(texto).join(" "));
  const resultados = [];
  const ctx = {
    raiz: RAIZ,
    consola,
    salida: {}, // lo que muestra cada fichero al cargarlo: salida.m = ["línea 1", ...]
    leer: (ruta) => (existsSync(join(RAIZ, ruta)) ? readFileSync(join(RAIZ, ruta), "utf8") : null),
    cargar: async (ruta) => import(pathToFileURL(join(RAIZ, ruta)).href),
  };
  let modulos = {};
  try {
    for (const [nombre, ruta] of Object.entries(bloque.modulos ?? {})) {
      const desde = consola.length;
      modulos[nombre] = await ctx.cargar(ruta);
      ctx.salida[nombre] = consola.slice(desde);
    }
  } catch (error) {
    resultados.push({
      id: `${bloque.id.toUpperCase()}.0`,
      texto: "Cargar tu fichero",
      estado: "mal",
      detalle: `💥 Tu fichero tiene un error y no se puede ni ejecutar: ${error.name}: ${error.message}${dondeEsta(error, Object.values(bloque.modulos ?? {}))}${explicarError(error)}`,
    });
    modulos = null;
  }
  if (modulos) {
    for (const prueba of bloque.pruebas) {
      let estado = "bien";
      let detalle = "";
      let info = [];
      try {
        if (bloque.dom) {
          document.body.innerHTML = "";
          localStorage.clear();
        }
        const r = await prueba.fn(modulos, ctx);
        if (r === "pendiente") estado = "pendiente";
        else if (typeof r === "string") {
          estado = "mal";
          detalle = r;
        } else if (r && typeof r === "object" && (r.mal || r.bien)) {
          estado = r.mal ? "mal" : "bien";
          detalle = r.mal ?? "";
          info = r.info ?? [];
        }
      } catch (error) {
        if (error?.message === "Sin hacer") {
          estado = "pendiente";
        } else if (error instanceof TypeError && /read only|not extensible|Cannot add property|Cannot assign/.test(error.message)) {
          estado = "mal";
          detalle = `Estás CAMBIANDO el objeto (o la lista) que te pasan, y no se puede tocar. Crea uno nuevo y devuélvelo (${error.message})`;
        } else if (/Invalid array length|Maximum call stack|heap out of memory/.test(error?.message ?? "")) {
          estado = "mal";
          detalle = `💥 ${error.name}: ${error.message} → ¿un bucle que no termina nunca? En un while, ¿cambia el contador en cada vuelta?`;
        } else if (/is not a constructor|Class constructor .* without 'new'/.test(error?.message ?? "")) {
          estado = "mal";
          detalle = `💥 ${error.name}: ${error.message} → ¿está bien escrito el nombre y lleva export delante (export class …)?`;
        } else if (/is not a function/.test(error?.message ?? "")) {
          estado = "mal";
          detalle = `💥 ${error.name}: ${error.message} → ese método o esa función no existe: ¿está bien escrito su nombre?`;
        } else {
          estado = "mal";
          detalle = `💥 Tu código falla: ${error?.name ?? "Error"}: ${error?.message ?? error}${dondeEsta(error ?? {})}${explicarError(error)}`;
        }
      }
      resultados.push({ id: prueba.id, texto: prueba.texto, estado, detalle, info, cuenta: !prueba.ejemplo });
    }
  }
  process.stdout.write(JSON.stringify(resultados));
  process.exit(0);
}

// ───────────────────────── modo normal ─────────────────────────
const color = process.stdout.isTTY || process.env.FORCE_COLOR === "1";
const c = (cod, t) => (color ? `\x1b[${cod}m${t}\x1b[0m` : t);
const ICONO = { bien: c("1;32", "✔"), mal: c("1;31", "✘"), pendiente: c("1;33", "⏳") };

const filtro = args.find((a) => !a.startsWith("--"))?.toLowerCase();
const informe = args.includes("--informe");
const elegidos = filtro ? BLOQUES.filter((b) => b.id === filtro) : BLOQUES;
if (elegidos.length === 0) {
  console.error(`No existe el nivel «${filtro}». Niveles: ${BLOQUES.map((b) => b.id).join(", ")}`);
  process.exit(2);
}

const lineas = [];
const salida = (t = "") => {
  console.log(t);
  lineas.push(t.replace(/\x1b\[[0-9;]*m/g, ""));
};

let pistaDada = false;
let totalBien = 0;
let totalCuentan = 0;
let siguiente = null; // el primer ejercicio sin hacer: lo que toca ahora
const resumen = [];

for (const bloque of elegidos) {
  salida();
  // OJO: la cabecera es siempre la misma (sin contadores): el planificador la usa para reconocer cada ejercicio
  salida(c("1", `━━ ${bloque.titulo} ━━`));
  const hijo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), "--hijo", bloque.id], {
    encoding: "utf8",
    timeout: 10000,
    env: process.env,
  });
  let resultados;
  if (hijo.error?.code === "ETIMEDOUT" || hijo.signal) {
    resultados = [{ id: `${bloque.id.toUpperCase()}.0`, texto: "Ejecutar tu código", estado: "mal", detalle: "⌛ Tu código no termina nunca: ¿tienes un bucle infinito? En un while o un for, ¿el contador avanza hacia el final?" }];
  } else {
    try {
      resultados = JSON.parse(hijo.stdout);
    } catch {
      resultados = [{ id: `${bloque.id.toUpperCase()}.0`, texto: "Ejecutar tu código", estado: "mal", detalle: `💥 El comprobador no ha podido ejecutar tu código: ${(hijo.stderr || hijo.stdout).trim().split("\n").slice(0, 3).join(" ")}` }];
    }
  }
  let bien = 0;
  let cuentan = 0;
  for (const r of resultados) {
    salida(`  ${ICONO[r.estado]} ${c("1", r.id.padEnd(6))} ${r.texto}`);
    if (r.detalle) salida(`         ${r.estado === "mal" ? c("31", r.detalle) : c("33", r.detalle)}`);
    const sinHacer = r.estado === "pendiente" || r.estado === "mal";
    if (sinHacer && r.cuenta !== false && !siguiente) siguiente = `${r.id} · ${r.texto}`;
    if (EMPEZAR[r.id] && (filtro ? sinHacer : r.estado === "pendiente" && !pistaDada)) {
      salida(c("36", `         💡 ${EMPEZAR[r.id]}`));
      if (!filtro) salida(c("2", `            (con «npm run comprobar ${bloque.id}» ves una pista en cada ejercicio; y más pistas en «🆘 ¿Atascado?» de la web)`));
      pistaDada = true;
    }
    if (r.info?.length) {
      if (filtro) for (const linea of r.info) salida(`         ${linea}`);
      else salida(c("2", `         (con «npm run comprobar ${bloque.id}» ves el porqué de cada predicción)`));
    }
    if (r.cuenta !== false) {
      cuentan++;
      if (r.estado === "bien") bien++;
    }
  }
  if (cuentan && bien === cuentan) salida(c("1;32", `    🎉 ¡${bloque.corto} superado! ${bloque.animo ?? ""}`.trimEnd()));
  totalBien += bien;
  totalCuentan += cuentan;
  resumen.push({ corto: bloque.corto, bien, cuentan });
}

salida();
salida(c("1", `━━ Resumen ━━`));
for (let i = 0; i < resumen.length; i += 4) {
  salida(
    "  " +
      resumen
        .slice(i, i + 4)
        .map(({ corto, bien, cuentan }) => `${bien === cuentan ? "✅" : bien ? "🟡" : "⬜"} ${corto.padEnd(16)} ${String(bien).padStart(2)}/${cuentan}`)
        .join("   "),
  );
}
const todo = totalBien === totalCuentan;
salida(
  todo
    ? c("1;32", `  ✔ ${totalBien}/${totalCuentan}: ¡todo en verde! ${filtro ? "" : "Has terminado la batería 0. Ya sabes programar: a por la práctica."}`)
    : `  ${totalBien} de ${totalCuentan} en verde. ⏳ = sin hacer · ✘ = hay que arreglarlo`,
);
if (siguiente) salida(c("36", `  👉 Lo siguiente: ${siguiente}`));
if (!todo) salida(c("2", "  Cuando un ejercicio salga en verde: git add . && git commit -m \"N<nivel>.<ejercicio>: lo que has hecho\" && git push"));

if (informe) {
  mkdirSync(join(RAIZ, "entrega"), { recursive: true });
  const cabecera = `Comprobador · ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`;
  writeFileSync(join(RAIZ, "entrega", "informe-comprobador.txt"), [cabecera, ...lineas].join("\n") + "\n");
}
process.exit(todo ? 0 : 1);
