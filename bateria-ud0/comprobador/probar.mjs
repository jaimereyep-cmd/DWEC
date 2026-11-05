// probar.mjs — ejecuta un trozo de código y enseña lo que da (y lo que muestra con console.log), como la consola del navegador.
//   docker compose run --rm web npm run probar "let x = 3; x = x + 1; x"
import { inspect } from "node:util";
import { runInNewContext } from "node:vm";

const codigo = process.argv[2];
if (!codigo) {
  console.log('Uso: docker compose run --rm web npm run probar "2 + 3"');
  process.exit(1);
}
// document y localStorage de mentira (los de un navegador), por si el código los usa
const contexto = {};
try {
  const { Window } = await import("happy-dom");
  const w = new Window({ url: "http://localhost/" });
  Object.assign(contexto, { document: w.document, localStorage: w.localStorage, window: w });
} catch {
  /* sin happy-dom (falta npm install): sin document */
}
const muestra = [];
contexto.console = { log: (...a) => muestra.push(a.map((v) => (typeof v === "string" ? v : inspect(v))).join(" ")) };
try {
  const valor = runInNewContext(codigo, contexto);
  for (const l of muestra) console.log("📺", l);
  console.log("→", inspect(valor));
} catch (e) {
  for (const l of muestra) console.log("📺", l);
  console.log("💥", `${e.name}: ${e.message}`);
  process.exit(1);
}
