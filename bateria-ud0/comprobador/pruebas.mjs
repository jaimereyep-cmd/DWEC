// pruebas.mjs — Las pruebas de cada nivel están en niveles/. Puedes leerlas: dicen QUÉ se espera, no CÓMO hacerlo.
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ORDEN = ["n00", "n01", "n02", "n03", "n04", "n05", "n06", "n07", "n08", "m1", "n09", "n10", "n11", "n12", "n13", "n14", "m2"];
const AQUI = dirname(fileURLToPath(import.meta.url));

export const BLOQUES = [];
export const EMPEZAR = {};
for (const n of ORDEN) {
  if (!existsSync(join(AQUI, "niveles", `${n}.mjs`))) continue;
  const bloque = (await import(`./niveles/${n}.mjs`)).default;
  BLOQUES.push(bloque);
  Object.assign(EMPEZAR, bloque.empezar ?? {});
}
