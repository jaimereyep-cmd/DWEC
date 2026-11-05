// Nivel 14 · Guardar datos: JSON.stringify / JSON.parse, localStorage, datos rotos, una clase que se guarda sola
import { casos, cuerpoDe, muestra, predicciones } from "../ayuda.mjs";

const input = (v) => {
  const i = document.createElement("input");
  i.value = v;
  return i;
};

export default {
  id: "14",
  titulo: "Nivel 14 · Guardar datos: JSON y localStorage",
  corto: "Nivel 14",
  animo: "Tus páginas ya recuerdan. Esto es el bloque C de la práctica 2.",
  modulos: { m: "src/nivel14/guardar.js" },
  dom: true,
  pruebas: [
    {
      id: "14.p",
      texto: "🔮 Predicciones: JSON y localStorage",
      fn: predicciones({
        p1: ["JSON.stringify({ a: 1 })", '{"a":1}', "stringify convierte el objeto en un TEXTO (con comillas dobles en las claves)", "el resultado es un texto que se parece al objeto"],
        p2: ['JSON.parse("[1, 2]").length', 2, "parse convierte el texto en una lista de verdad, con 2 elementos", "¿qué hay dentro del texto?"],
        p3: ['localStorage.setItem("n", 5); typeof localStorage.getItem("n")', "string", "localStorage solo guarda TEXTOS: el 5 vuelve como \"5\"", "¿qué guarda localStorage?"],
        p4: ['localStorage.getItem("no-existe")', null, "si no hay nada con esa clave, getItem da null (no undefined)", "null o undefined… es el «vacío» de localStorage"],
      }),
    },
    {
      id: "14.E",
      ejemplo: true,
      texto: "👀 Ejemplo: guardarNombre y leerNombre",
      fn: ({ m }) => {
        if (m.leerNombre() !== "desconocido") return "¿has cambiado el ejemplo?";
        m.guardarNombre("Ana");
        return m.leerNombre() === "Ana" || "¿has cambiado el ejemplo?";
      },
    },
    {
      id: "14.r",
      texto: "🔁 Repaso: leerNumero",
      fn: ({ m }) => casos((v) => m.leerNumero(input(v)), "leerNumero(input con …)", [[["25"], 25], [[" 7 "], 7], [[""], null], [["hola"], null], [["0"], 0]]),
    },
    {
      id: "14.1",
      texto: "✍️ guardar (JSON.stringify)",
      fn: ({ m }) => {
        m.guardar("lista", [1, 2]);
        const t = localStorage.getItem("lista");
        if (t === "1,2") return 'Se guarda "1,2": localStorage convierte la lista a texto a su manera y se pierde. Usa JSON.stringify(valor)';
        if (t !== "[1,2]") return `guardar("lista", [1, 2]) deja guardado ${muestra(t)} y tendría que ser "[1,2]"`;
        m.guardar("obj", { a: 1 });
        return localStorage.getItem("obj") === '{"a":1}' || `Un objeto se guarda como ${muestra(localStorage.getItem("obj"))}: ¿usas JSON.stringify?`;
      },
    },
    {
      id: "14.2",
      texto: "✍️ cargar (JSON.parse y valor por defecto)",
      fn: ({ m }) => {
        localStorage.setItem("lista", "[1,2]");
        const r = m.cargar("lista", []);
        if (r === "[1,2]") return 'Devuelve el TEXTO "[1,2]": conviértelo de vuelta con JSON.parse';
        if (muestra(r) !== muestra([1, 2])) return `cargar("lista", []) da ${muestra(r)} y tendría que dar [1, 2]`;
        localStorage.setItem("n", "5");
        if (m.cargar("n", 0) !== 5) return `Con "5" guardado, cargar("n", 0) da ${muestra(m.cargar("n", 0))} y tendría que dar el número 5`;
        const nada = m.cargar("no-existe", "por defecto");
        return nada === "por defecto" || `Sin nada guardado, cargar("no-existe", "por defecto") da ${muestra(nada)} y tendría que devolver el valor por defecto`;
      },
    },
    {
      id: "14.3",
      texto: "✍️ cargar con datos rotos (try/catch)",
      fn: ({ m }) => {
        localStorage.setItem("roto", "{roto");
        try {
          const r = m.cargar("roto", []);
          return muestra(r) === "[]" || `Con datos rotos, cargar("roto", []) da ${muestra(r)} y tendría que dar el valor por defecto []`;
        } catch (e) {
          if (e?.message === "Sin hacer") throw e;
          return `Con datos rotos, cargar lanza «${e.message}»: pon JSON.parse dentro de un try y, en el catch, devuelve porDefecto`;
        }
      },
    },
    {
      id: "14.4",
      texto: "✍️ contarVisita (usa cargar y guardar)",
      fn: ({ m }, ctx) => {
        const r = [m.contarVisita(), m.contarVisita(), m.contarVisita()];
        if (muestra(r) === muestra(["01", "011", "0111"]) || typeof r[0] === "string") return `Da ${muestra(r)}: sumas a un TEXTO. Usa tu cargar (que hace JSON.parse) para tener un número`;
        if (muestra(r) !== muestra([1, 2, 3])) return `Tres visitas dan ${muestra(r)} y tendrían que dar 1, 2 y 3`;
        if (localStorage.getItem("visitas") !== "3") return `Lo guardado en "visitas" es ${muestra(localStorage.getItem("visitas"))} y tendría que ser "3"`;
        const cuerpo = cuerpoDe(ctx.leer("src/nivel14/guardar.js"), "contarVisita");
        return (/\bcargar\s*\(/.test(cuerpo) && /\bguardar\s*\(/.test(cuerpo)) || "Funciona, pero usa tus funciones cargar(…) y guardar(…)";
      },
    },
    {
      id: "14.5",
      texto: "✍️ ListaGuardada (se guarda sola)",
      fn: ({ m }) => {
        const l = new m.ListaGuardada("compra");
        if (muestra(l.elementos()) !== "[]") return `Una lista nueva (sin nada guardado) tiene ${muestra(l.elementos())}`;
        l.agregar("pan");
        l.agregar("leche");
        if (muestra(l.elementos()) !== muestra(["pan", "leche"])) return `Después de agregar pan y leche, elementos() da ${muestra(l.elementos())}`;
        if (localStorage.getItem("compra") !== '["pan","leche"]') return `En localStorage, "compra" vale ${muestra(localStorage.getItem("compra"))}: agregar tiene que GUARDAR (con tu guardar)`;
        const otra = new m.ListaGuardada("compra");
        if (muestra(otra.elementos()) !== muestra(["pan", "leche"])) return "Otra new ListaGuardada(\"compra\") no tiene lo guardado: en el constructor, carga con tu cargar(clave, [])";
        otra.elementos().push("TRAMPA");
        if (otra.elementos().includes("TRAMPA")) return "elementos() devuelve la lista de DENTRO: desde fuera se puede cambiar. Devuelve una copia: [...this.cosas]";
        otra.vaciar();
        if (muestra(otra.elementos()) !== "[]" || localStorage.getItem("compra") !== "[]") return "vaciar() tiene que dejar la lista vacía y guardarla vacía";
        return muestra(new m.ListaGuardada("otra").elementos()) === "[]" || "Cada clave es una lista distinta";
      },
    },
  ],
  empezar: {
    "14.p": "Prueba cada una en la página (botón Probar): ahí hay localStorage",
    "14.r": "const texto = input.value.trim(); si está vacío o Number(texto) es NaN (Number.isNaN), null; si no, Number(texto)",
    "14.1": "Una línea: localStorage.setItem(clave, JSON.stringify(valor));",
    "14.2": "const texto = localStorage.getItem(clave); if (texto === null) return porDefecto; return JSON.parse(texto);",
    "14.3": "try { return JSON.parse(texto); } catch { return porDefecto; }",
    "14.4": "const visitas = cargar(\"visitas\", 0) + 1; guardar(\"visitas\", visitas); return visitas;",
    "14.5": "constructor: this.clave = clave; this.cosas = cargar(clave, []);  agregar: push y guardar(this.clave, this.cosas)",
  },
};
