// ayuda.mjs — Herramientas de las pruebas. No hace falta leerlo (pero puedes).
// Cada prueba devuelve: true (bien) · "pendiente" · un texto (lo que falla) · { bien|mal, info }
import { inspect } from "node:util";

export const muestra = (v) => inspect(v, { depth: 4, breakLength: Infinity, compact: true });

export function igual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) < 1e-6;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  return ka.length === kb.length && ka.every((k) => igual(a[k], b[k]));
}

// Lo que suele estar detrás de un resultado raro, explicado para quien empieza
export function pistaDe(obtenido, esperado, escribio = false) {
  if (obtenido === undefined && esperado !== undefined) {
    return escribio
      ? " → lo MUESTRAS con console.log, pero hay que DEVOLVERLO con return. console.log es para ti; return es para quien llama a la función"
      : " → no devuelve nada: ¿te falta el return?";
  }
  if (typeof obtenido === "string" && typeof esperado === "number" && obtenido.trim() !== "" && Number(obtenido) === esperado)
    return ` → devuelves el TEXTO "${obtenido}", no el NÚMERO ${esperado}. ¿Le sobran las comillas?`;
  if (typeof obtenido === "number" && typeof esperado === "string" && String(obtenido) === esperado) return " → devuelves un número y se pide un texto";
  if (typeof obtenido === "string" && typeof esperado === "boolean" && obtenido === String(esperado)) return ` → devuelves el texto "${obtenido}": true y false van SIN comillas`;
  if (Number.isNaN(obtenido)) return " → sale NaN («no es un número»): estás haciendo cuentas con algo que no es un número (¿undefined? ¿un texto?)";
  if (typeof obtenido === "string" && typeof esperado === "string" && obtenido.trim() === esperado.trim()) return " → sobran o faltan ESPACIOS al principio o al final";
  if (typeof obtenido === "string" && typeof esperado === "string" && obtenido.toLowerCase() === esperado.toLowerCase()) return " → cambia alguna MAYÚSCULA o minúscula";
  return "";
}

// Ejecuta fn y avisa si ha escrito algo con console.log mientras tanto
function llamar(fn, argumentos) {
  const original = console.log;
  let escribio = false;
  console.log = (...a) => {
    escribio = true;
    original(...a);
  };
  try {
    return { valor: fn(...argumentos), escribio };
  } finally {
    console.log = original;
  }
}

// Prueba una función con varios casos y explica el primero que falla
export function casos(fn, nombre, lista) {
  if (typeof fn !== "function") return `No encuentro la función ${nombre}: ¿está bien escrito su nombre? ¿Lleva export delante?`;
  for (const [argumentos, esperado] of lista) {
    let copia;
    try {
      copia = structuredClone(argumentos); // para enseñar los datos tal y como eran ANTES de llamar
    } catch {
      copia = argumentos;
    }
    const { valor, escribio } = llamar(fn, argumentos);
    if (!igual(valor, esperado)) {
      return `${nombre}(${copia.map(muestra).join(", ")}) tendría que dar ${muestra(esperado)} y da ${muestra(valor)}${pistaDe(valor, esperado, escribio)}`;
    }
  }
  return true;
}

// ¿Lanza un error? Devuelve null si sí (y cumple la condición), o el texto de lo que ha pasado
export function lanza(fn, Clase = Error) {
  try {
    fn();
  } catch (e) {
    if (e?.message === "Sin hacer") throw e;
    if (!(e instanceof Clase)) return `lanza un ${e?.name ?? typeof e}, y tendría que ser un ${Clase.name}`;
    return null;
  }
  return "no lanza ningún error, y tendría que lanzarlo (throw new Error(\"…\"))";
}

// Predicciones: no se dice cuál es la buena. Al acertar, se explica POR QUÉ; al fallar, una pista.
// datos = { p1: [expresión, valor correcto, por qué, pista], ... }
// opciones.muestra: lo que se predice es lo que MUESTRA console.log (da igual escribir 5 o "5")
export function predicciones(datos, opciones = {}) {
  const acierta = (tuya, buena) => igual(tuya, buena) || (opciones.muestra && tuya !== undefined && String(tuya) === String(buena));
  return ({ m }) => {
    const p = m.predicciones ?? {};
    const claves = Object.keys(datos);
    const sinContestar = claves.filter((k) => p[k] === undefined);
    if (sinContestar.length === claves.length) return "pendiente";
    if (sinContestar.length > 0) return `Te faltan: ${sinContestar.join(", ")} (cambia su undefined por lo que crees que da)`;
    const falladas = claves.filter((k) => !acierta(p[k], datos[k][1]));
    const info = claves.map((k) => {
      const [expresion, valor, porque, pista] = datos[k];
      return falladas.includes(k)
        ? `✘ ${k} · ${expresion}  → no es ${muestra(p[k])}. Pista: ${pista}`
        : `✔ ${k} · ${expresion}  → ${muestra(valor)}: ${porque}`;
    });
    if (falladas.length > 0) {
      return { mal: `${claves.length - falladas.length} de ${claves.length} bien. Revisa: ${falladas.join(", ")} → pruébalas con npm run probar "…" o en la página (botón Probar)`, info };
    }
    return { bien: true, info };
  };
}

// Un valor de los que el alumno rellena (cambia undefined por …): ¿lo ha rellenado?
export const sinRellenar = (v) => v === undefined;

// El código del fichero sin comentarios (para mirar CÓMO lo has hecho, no solo qué da)
export const sinComentarios = (codigo) => (codigo ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");

// El cuerpo de una función exportada (para ver si usa algo: un for, un map…)
export function cuerpoDe(codigo, nombre) {
  const limpio = sinComentarios(codigo);
  const i = limpio.search(new RegExp(`(function\\s+${nombre}\\b|(const|let)\\s+${nombre}\\s*=|class\\s+${nombre}\\b)`));
  if (i < 0) return "";
  const resto = limpio.slice(i);
  const siguiente = resto.slice(1).search(/\nexport\s/);
  return siguiente < 0 ? resto : resto.slice(0, siguiente + 1);
}

// Una lista congelada (y sus objetos): si la cambias, salta un error
export const congelar = (lista) => Object.freeze(lista.map((x) => (x && typeof x === "object" ? Object.freeze({ ...x }) : x)));
