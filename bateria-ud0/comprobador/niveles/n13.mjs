// Nivel 13 · Eventos y formularios: addEventListener, toggle, leer campos (texto → Number), validar, submit, delegación
import { casos, muestra, predicciones } from "../ayuda.mjs";

const montar = (contenido) => {
  const d = document.createElement("div");
  d.innerHTML = contenido;
  document.body.append(d);
  return d;
};
const FORM = `<form><input name="nombre"><input name="precio"><button>Añadir</button><p class="errores"></p></form><ul class="lista"></ul>`;
const enviar = (form) => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
const rellenar = (form, nombre, precio) => {
  form.elements.nombre.value = nombre;
  form.elements.precio.value = precio;
};

export default {
  id: "13",
  titulo: "Nivel 13 · Eventos y formularios",
  corto: "Nivel 13",
  animo: "Tu página ya responde a lo que hace quien la usa.",
  modulos: { m: "src/nivel13/eventos.js" },
  dom: true,
  pruebas: [
    {
      id: "13.p",
      texto: "🔮 Predicciones: eventos y valores de los campos",
      fn: predicciones({
        p1: ['const b = document.createElement("button"); let n = 0; b.addEventListener("click", () => n++); b.click(); b.click(); n', 2, "cada clic ejecuta la flecha: dos clics, dos veces", "¿cuántas veces se pulsa?"],
        p2: ['const i = document.createElement("input"); i.value = 5; typeof i.value', "string", "lo que hay en un campo SIEMPRE es un texto, aunque metas un número", "¿qué guarda un <input>?"],
        p3: ['Number("5") + 1', 6, "Number convierte el texto en número; luego + suma", "Number(…) da un número"],
        p4: ['"5" + 1', "51", "con un texto, + PEGA: por eso hay que usar Number con lo que viene de un formulario", "uno de los dos es un texto…"],
      }),
    },
    {
      id: "13.E",
      ejemplo: true,
      texto: "👀 Ejemplo: contadorDeClics",
      fn: ({ m }) => {
        const d = montar("<button>+1</button><output></output>");
        m.contadorDeClics(d.querySelector("button"), d.querySelector("output"));
        d.querySelector("button").click();
        return d.querySelector("output").textContent === "1" || "¿has cambiado el ejemplo?";
      },
    },
    {
      id: "13.r",
      texto: "🔁 Repaso: crearBoton",
      fn: ({ m }) => {
        const b = m.crearBoton("Borrar", "borrar");
        const bien = '<button type="button" class="borrar">Borrar</button>';
        if (b?.outerHTML === bien) return true;
        if (b?.tagName !== "BUTTON") return `crearBoton devuelve ${b?.outerHTML ?? muestra(b)} y tendría que devolver un <button>`;
        if (b.type !== "button") return 'Falta type="button": b.type = "button"; (si no, dentro de un formulario lo enviaría)';
        return `Da ${b.outerHTML} y tendría que dar ${bien}`;
      },
    },
    {
      id: "13.1",
      texto: "✍️ mostrarOcultar (toggle)",
      fn: ({ m }) => {
        const d = montar("<button>Ver</button><div class='caja'>hola</div>");
        const caja = d.querySelector(".caja");
        m.mostrarOcultar(d.querySelector("button"), caja);
        if (caja.classList.contains("oculto")) return "La caja se oculta antes de pulsar: lo de dentro del addEventListener solo se ejecuta al hacer clic";
        d.querySelector("button").click();
        if (!caja.classList.contains("oculto")) return 'Después de un clic, la caja no tiene la clase "oculto"';
        d.querySelector("button").click();
        if (caja.classList.contains("oculto")) return 'Después del segundo clic sigue "oculto": con classList.toggle se pone y se quita';
        return true;
      },
    },
    {
      id: "13.2",
      texto: "✍️ leerFormulario (trim y Number)",
      fn: ({ m }) => {
        const form = montar(FORM).querySelector("form");
        rellenar(form, "  Teclado ", "25");
        const r = m.leerFormulario(form);
        if (r?.precio === "25") return 'precio sale como el TEXTO "25": conviértelo con Number(…)';
        if (r?.nombre === "  Teclado ") return "El nombre conserva los espacios de los lados: .trim()";
        return casos(() => m.leerFormulario(form), "leerFormulario(form con «  Teclado » y «25»)", [[[], { nombre: "Teclado", precio: 25 }]]);
      },
    },
    {
      id: "13.3",
      texto: "✍️ validar (lista de errores)",
      fn: ({ m }) => {
        if (m.validar({ nombre: "Teclado", precio: 25 }) === true) return "Devuelve true: tiene que devolver una LISTA de errores (vacía si todo va bien)";
        return casos(m.validar, "validar", [
          [[{ nombre: "Teclado", precio: 25 }], []],
          [[{ nombre: "", precio: 25 }], ["Falta el nombre"]],
          [[{ nombre: "Teclado", precio: 0 }], ["El precio tiene que ser mayor que 0"]],
          [[{ nombre: "Teclado", precio: NaN }], ["El precio tiene que ser mayor que 0"]],
          [[{ nombre: "", precio: -1 }], ["Falta el nombre", "El precio tiene que ser mayor que 0"]],
        ]);
      },
    },
    {
      id: "13.4",
      texto: "✍️ conectarFormulario (submit sin recargar)",
      fn: ({ m }) => {
        const d = montar(FORM);
        const form = d.querySelector("form");
        const lista = d.querySelector(".lista");
        m.conectarFormulario(form, lista);
        rellenar(form, "Teclado", "25");
        const noCancelado = enviar(form);
        if (noCancelado) return "El formulario recargaría la página: evento.preventDefault() al principio del submit";
        if (lista.children.length !== 1) return `Después de enviar «Teclado» y «25», la lista tiene ${lista.children.length} elementos`;
        if (lista.children[0].textContent !== "Teclado · 25 €") return `El <li> dice ${muestra(lista.children[0].textContent)} y tendría que decir "Teclado · 25 €"`;
        if (form.elements.nombre.value !== "") return "El formulario no se limpia después de añadir: form.reset()";
        rellenar(form, "", "0");
        enviar(form);
        if (lista.children.length !== 1) return "Con datos que no valen se ha añadido igualmente a la lista";
        const errores = form.querySelector(".errores").textContent;
        if (errores !== "Falta el nombre. El precio tiene que ser mayor que 0") return `.errores dice ${muestra(errores)} y tendría que decir "Falta el nombre. El precio tiene que ser mayor que 0" (errores.join(". "))`;
        rellenar(form, "Ratón", "12");
        enviar(form);
        if (form.querySelector(".errores").textContent !== "") return "Al enviar bien después de un error, el mensaje de error sigue ahí: vacía .errores";
        return lista.children.length === 2 || "El segundo producto no se ha añadido";
      },
    },
    {
      id: "13.5",
      texto: "✍️ borrarAlPulsar (delegación)",
      fn: ({ m }) => {
        const d = montar('<ul><li>pan <button class="borrar"><span>✖</span></button></li><li>leche <button class="borrar">✖</button></li><li>agua <button class="otro">ok</button></li></ul>');
        const ul = d.querySelector("ul");
        m.borrarAlPulsar(ul);
        const nuevo = document.createElement("li");
        nuevo.innerHTML = 'huevos <button class="borrar">✖</button>';
        ul.append(nuevo);
        ul.querySelectorAll("li")[2].querySelector("button").click();
        if (ul.children.length !== 4) return "Al pulsar un botón SIN la clase «borrar» se ha quitado algo: comprueba que el clic es en button.borrar";
        nuevo.querySelector("button").click();
        if (ul.children.length === 4) return "Los <li> añadidos DESPUÉS no se pueden borrar: pon un solo escuchador en la lista (delegación), no uno en cada botón";
        ul.querySelector("span").click();
        if (ul.textContent.includes("pan")) return "Pulsando en lo que hay DENTRO del botón (un <span>) no se borra: usa e.target.closest(\"button.borrar\")";
        if (!ul.textContent.includes("leche") || !ul.textContent.includes("agua")) return "Se ha borrado más de la cuenta: solo el <li> de ese botón";
        return ul.children.length === 2 || `Quedan ${ul.children.length} elementos y tendrían que quedar 2`;
      },
    },
  ],
  empezar: {
    "13.p": "Lo que viene de un <input> es siempre un texto. ¿Qué hace + con un texto?",
    "13.r": "Como crearParrafo del nivel 12, pero un button; además b.type = \"button\" y b.classList.add(clase)",
    "13.1": "boton.addEventListener(\"click\", () => { elemento.classList.toggle(\"oculto\"); });",
    "13.2": "form.elements.nombre.value.trim()  y  Number(form.elements.precio.value)",
    "13.3": "const errores = []; dos if con errores.push(\"…\"); return errores;",
    "13.4": "form.addEventListener(\"submit\", (evento) => { evento.preventDefault(); … usa leerFormulario y validar … });",
    "13.5": "lista.addEventListener(\"click\", (e) => { const boton = e.target.closest(\"button.borrar\"); if (boton) … });",
  },
};
