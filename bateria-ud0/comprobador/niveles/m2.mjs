// Mini-proyecto 2 · Mi colección en la web: clase + errores + DOM + eventos + localStorage (niveles 9 a 14)
import { congelar, muestra } from "../ayuda.mjs";

const DATOS = () =>
  congelar([
    { nombre: "Dune", categoria: "ciencia ficción", anio: 1965, puntuacion: 9 },
    { nombre: "Momo", categoria: "fantasía", anio: 1973, puntuacion: 8 },
    { nombre: "Solaris", categoria: "ciencia ficción", anio: 1961, puntuacion: 6 },
  ]);
const NUEVO = { nombre: "El Hobbit", categoria: "fantasía", anio: 1937, puntuacion: 9 };
const nombres = (l) => (Array.isArray(l) ? l.map((e) => e.nombre) : l);
const HTML = `<form class="alta"><input name="nombre"><input name="categoria"><input name="anio"><input name="puntuacion"><button>Añadir</button><p class="errores"></p></form>
<select class="filtro"><option value="">Todas</option></select><div class="tarjetas"></div>`;
function montar(m) {
  const raiz = document.createElement("div");
  raiz.innerHTML = HTML;
  document.body.append(raiz);
  const col = new m.Coleccion("prueba", DATOS());
  m.iniciarApp(raiz, col);
  const $ = (s) => raiz.querySelector(s);
  const tarjetas = () => [...raiz.querySelectorAll(".tarjetas article")].map((a) => a.querySelector("h3")?.textContent);
  const alta = (n, c, a, p) => {
    const f = $("form.alta").elements;
    [f.nombre.value, f.categoria.value, f.anio.value, f.puntuacion.value] = [n, c, a, p];
    return $("form.alta").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  };
  const filtrar = (v) => {
    $("select.filtro").value = v;
    $("select.filtro").dispatchEvent(new Event("change", { bubbles: true }));
  };
  return { raiz, col, $, tarjetas, alta, filtrar };
}
const lanzaCon = (fn) => {
  try {
    fn();
  } catch (e) {
    if (e?.message === "Sin hacer") throw e;
    return e?.message ?? String(e);
  }
  return null;
};

export default {
  id: "m2",
  titulo: "Mini-proyecto 2 · Mi colección en la web",
  corto: "Mini-proyecto 2",
  animo: "¡Has terminado la batería 0! Has hecho una aplicación web entera, que recuerda sus datos. Ya sabes programar: a por la práctica.",
  modulos: { m: "src/mini2/app.js" },
  dom: true,
  pruebas: [
    {
      id: "M2.1",
      texto: "✍️ Coleccion: cargar lo guardado o una copia de inicial; todos()",
      fn: ({ m }) => {
        const datos = [...DATOS()];
        const c = new m.Coleccion("col", datos);
        if (muestra(nombres(c.todos())) !== muestra(["Dune", "Momo", "Solaris"])) return `Sin nada guardado, todos() da ${muestra(nombres(c.todos()))} y tendría que ser la lista inicial`;
        c.todos().push(NUEVO);
        if (c.todos().length !== 3) return "todos() devuelve la lista de dentro: desde fuera se puede cambiar. Devuelve una copia: [...this.lista]";
        localStorage.setItem("col2", JSON.stringify([NUEVO]));
        const c2 = new m.Coleccion("col2", datos);
        if (muestra(nombres(c2.todos())) !== muestra(["El Hobbit"])) return `Con algo guardado en "col2", todos() da ${muestra(nombres(c2.todos()))}: tiene que cargar lo guardado (JSON.parse de localStorage)`;
        localStorage.setItem("col3", "{roto");
        const roto = lanzaCon(() => new m.Coleccion("col3", datos));
        return roto === null || `Si lo guardado está roto, new Coleccion lanza «${roto}»: usa try/catch y, si falla, la lista inicial`;
      },
    },
    {
      id: "M2.2",
      texto: "✍️ Coleccion: agregar valida, añade y guarda",
      fn: ({ m }) => {
        const c = new m.Coleccion("col", [...DATOS()]);
        const casos = [
          [{ ...NUEVO, nombre: "  " }, "Falta el nombre"],
          [{ ...NUEVO, categoria: "" }, "Falta la categoría"],
          [{ ...NUEVO, anio: NaN }, "El año tiene que ser un número"],
          [{ ...NUEVO, anio: "1937" }, "El año tiene que ser un número"],
          [{ ...NUEVO, puntuacion: 11 }, "La puntuación va de 0 a 10"],
          [{ ...NUEVO, puntuacion: -1 }, "La puntuación va de 0 a 10"],
          [{ ...NUEVO, puntuacion: NaN }, "La puntuación va de 0 a 10"],
        ];
        for (const [e, msg] of casos) {
          const r = lanzaCon(() => c.agregar(e));
          if (r !== msg) return `agregar(${muestra(e)}) ${r ? `lanza «${r}»` : "no lanza ningún error"} y tendría que lanzar "${msg}"`;
        }
        if (c.todos().length !== 3) return "Algún elemento que no valía se ha añadido igualmente: valida ANTES de añadir";
        c.agregar(NUEVO);
        if (c.todos().length !== 4) return "Un elemento correcto no se añade";
        const guardado = JSON.parse(localStorage.getItem("col") ?? "null");
        if (!Array.isArray(guardado) || guardado.length !== 4) return `Después de agregar, en localStorage "col" hay ${muestra(localStorage.getItem("col"))}: hay que GUARDAR la lista (JSON.stringify)`;
        return new m.Coleccion("col", []).todos().length === 4 || "Una Coleccion nueva con la misma clave no recupera lo añadido";
      },
    },
    {
      id: "M2.3",
      texto: "✍️ Coleccion: quitar y categorias",
      fn: ({ m }) => {
        const c = new m.Coleccion("col", [...DATOS()]);
        const cat = c.categorias();
        if (muestra(cat) === muestra(["ciencia ficción", "fantasía", "ciencia ficción"])) return "categorias() repite: sin repetidos (new Set(…) o comprobando con includes)";
        if (muestra(cat) !== muestra(["ciencia ficción", "fantasía"])) return `categorias() da ${muestra(cat)} y tendría que dar ["ciencia ficción", "fantasía"]`;
        c.quitar("Momo");
        if (muestra(nombres(c.todos())) !== muestra(["Dune", "Solaris"])) return `Después de quitar("Momo"), todos() da ${muestra(nombres(c.todos()))}`;
        if (muestra(c.categorias()) !== muestra(["ciencia ficción"])) return `Sin Momo, categorias() da ${muestra(c.categorias())}`;
        return new m.Coleccion("col", []).todos().length === 2 || "quitar no guarda: una Coleccion nueva con la misma clave sigue teniendo a Momo";
      },
    },
    {
      id: "M2.4",
      texto: "✍️ crearTarjeta y pintar",
      fn: ({ m }) => {
        const t = m.crearTarjeta(DATOS()[0]);
        const bien = '<article class="item" data-nombre="Dune"><h3>Dune</h3><p>1965 · ciencia ficción · ★ 9</p><button type="button" class="quitar">Quitar</button></article>';
        if (t?.outerHTML !== bien) return `crearTarjeta(Dune) da ${t?.outerHTML ?? muestra(t)}\n           y tendría que dar ${bien}${t && !t.dataset?.nombre ? "\n           (el data-nombre se pone con: article.dataset.nombre = elemento.nombre)" : ""}`;
        if (m.crearTarjeta({ ...NUEVO, nombre: "<b>x</b>" }).querySelector("b")) return "El nombre se interpreta como HTML: textContent";
        const c = document.createElement("div");
        c.innerHTML = "<p>antes</p>";
        m.pintar(c, DATOS());
        if ([...c.children].some((x) => x.tagName !== "ARTICLE")) return "pintar no vacía el contenedor antes";
        return c.querySelectorAll("article.item").length === 3 || `pintar(contenedor, 3 elementos) deja ${c.querySelectorAll("article.item").length} tarjetas`;
      },
    },
    {
      id: "M2.5",
      texto: "✍️ iniciarApp: pintar, filtro y alta con errores",
      fn: ({ m }) => {
        const app = montar(m);
        if (muestra(app.tarjetas()) !== muestra(["Dune", "Momo", "Solaris"])) return `Al empezar, .tarjetas enseña ${muestra(app.tarjetas())}`;
        const opciones = [...app.raiz.querySelectorAll("select.filtro option")].map((o) => o.value);
        if (muestra(opciones) !== muestra(["", "ciencia ficción", "fantasía"])) return `El filtro tiene las opciones ${muestra(opciones)} y tendría que tener "" (Todas) y una por categoría`;
        if (app.alta("", "terror", "2000", "5")) return "El formulario recargaría la página: evento.preventDefault()";
        if (app.$(".errores").textContent !== "Falta el nombre") return `Con el nombre vacío, .errores dice ${muestra(app.$(".errores").textContent)} y tendría que decir "Falta el nombre" (el mensaje del error de agregar)`;
        if (app.tarjetas().length !== 3) return "Con un error, se ha añadido igualmente";
        app.alta("El Hobbit", "fantasía", "1937", "9");
        if (app.col.todos().find((e) => e.nombre === "El Hobbit")?.anio !== 1937) return "El año se guarda como texto (o no se guarda): Number(campo.value)";
        if (!app.tarjetas().includes("El Hobbit")) return "Después de añadir, la tarjeta nueva no aparece: vuelve a pintar";
        if (app.$(".errores").textContent !== "") return "Después de añadir bien, el error anterior sigue en .errores";
        if (app.$("form.alta").elements.nombre.value !== "") return "Después de añadir, el formulario no se limpia (form.reset())";
        app.alta("Drácula", "terror", "1897", "7");
        const op2 = [...app.raiz.querySelectorAll("select.filtro option")].map((o) => o.value);
        return op2.includes("terror") || "Al añadir una categoría nueva (terror), no aparece en el filtro";
      },
    },
    {
      id: "M2.6",
      texto: "✍️ iniciarApp: quitar (delegación) y filtrar",
      fn: ({ m }) => {
        const app = montar(m);
        app.filtrar("fantasía");
        if (muestra(app.tarjetas()) !== muestra(["Momo"])) return `Con el filtro en «fantasía», se ven ${muestra(app.tarjetas())}: escucha el evento "change" del select`;
        app.filtrar("");
        if (app.tarjetas().length !== 3) return "Al volver a «Todas» no se ven todas";
        app.raiz.querySelector('article[data-nombre="Momo"] button.quitar').click();
        if (app.tarjetas().includes("Momo")) return "Al pulsar Quitar en Momo, sigue ahí: delegación en .tarjetas con closest(\"button.quitar\") y su article.dataset.nombre";
        if (app.col.todos().some((e) => e.nombre === "Momo")) return "La tarjeta desaparece, pero Momo sigue en la colección: llama a coleccion.quitar(…)";
        app.alta("El Hobbit", "fantasía", "1937", "9");
        app.filtrar("ciencia ficción");
        app.alta("Neuromante", "ciencia ficción", "1984", "8");
        if (app.tarjetas().includes("El Hobbit")) return "Después de añadir con el filtro «ciencia ficción», se ve El Hobbit: al repintar, respeta el filtro elegido";
        app.raiz.querySelector('article[data-nombre="Dune"] button.quitar').click();
        return muestra(app.tarjetas()) === muestra(["Solaris", "Neuromante"]) || `Con el filtro puesto, después de quitar Dune se ven ${muestra(app.tarjetas())}`;
      },
    },
  ],
  empezar: {
    "M2.1": "constructor: this.clave = clave; intenta JSON.parse(localStorage.getItem(clave)) con try/catch; si es una lista, úsala; si no, [...inicial]",
    "M2.2": "Cuatro if con throw new Error(\"…\"), luego push y guardar (te viene bien un método privado #guardar())",
    "M2.3": "quitar: this.lista = this.lista.filter(…) y guardar.  categorias: [...new Set(this.lista.map((e) => e.categoria))].sort()",
    "M2.4": "Como crearTarjeta del nivel 12, más article.dataset.nombre y el botón (como crearBoton del 13.r)",
    "M2.5": "Haz una función repintar() y otra rellenarFiltro() dentro de iniciarApp, y llámalas al empezar y después de cada cambio",
    "M2.6": "tarjetas.addEventListener(\"click\", …) con closest; filtro.addEventListener(\"change\", repintar)",
  },
};
