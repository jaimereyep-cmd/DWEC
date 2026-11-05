// ejecutar.mjs — ejecuta TU programa de un nivel y enseña lo que muestra con console.log.
//   docker compose run --rm web npm run ejecutar 0     → ejecuta src/nivel00/hola.js
//   docker compose run --rm web npm run ejecutar 1     → ejecuta src/nivel01/variables.js
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const n = (process.argv[2] ?? "").toLowerCase();
const carpeta = /^\d+$/.test(n) ? `nivel${n.padStart(2, "0")}` : /^m[12]$/.test(n) ? `mini${n[1]}` : null;
if (!carpeta) {
  console.log("Uso: docker compose run --rm web npm run ejecutar 0     (el número del nivel)");
  process.exit(1);
}
let ficheros;
try {
  ficheros = readdirSync(join(RAIZ, "src", carpeta)).filter((f) => f.endsWith(".js"));
} catch {
  console.log(`No existe src/${carpeta}`);
  process.exit(1);
}
for (const f of ficheros) {
  console.log(`\n▶ src/${carpeta}/${f} muestra:\n`);
  const r = spawnSync(process.execPath, [join(RAIZ, "src", carpeta, f)], { stdio: ["ignore", "inherit", "pipe"], encoding: "utf8", timeout: 5000 });
  if (r.error?.code === "ETIMEDOUT") console.log("⌛ No termina nunca: ¿un bucle infinito?");
  else if (r.status !== 0) {
    const lineas = r.stderr.split("\n");
    const donde = lineas.find((l) => l.includes(`/src/${carpeta}/`)) ?? "";
    const error = lineas.find((l) => /^\w*Error/.test(l)) ?? lineas.find(Boolean) ?? "";
    console.log(`💥 ${error}\n   ${donde.replace(/^.*\/src\//, "en src/")}`);
    if (/Sin hacer/.test(error)) console.log("   (es normal: hay ejercicios sin hacer. Para ver lo que muestra tu programa, mira la parte de arriba)");
  }
}
