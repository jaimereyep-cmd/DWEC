// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 13 · Eventos y formularios: que la página responda
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 13
//  Comprobar: docker compose run --rm web npm run comprobar 13      Ver: docker compose up → http://localhost:5173
// ═══════════════════════════════════════════════════════════════════════════════════════════
//   boton.addEventListener("click", () => { … });   ← cuando pulsen el botón, se ejecuta la flecha
//   form.addEventListener("submit", (evento) => {
//     evento.preventDefault();                       ← que el formulario NO recargue la página
//     form.elements.nombre.value                     ← lo escrito en el campo con name="nombre" (¡siempre es un TEXTO!)
//   });
//   elemento.classList.toggle("oculto")              ← pone la clase si no está, y la quita si está
//   lista.addEventListener("click", (e) => { e.target.closest("li") … })   ← DELEGACIÓN: un solo escuchador para
//                                                      todos los hijos, también los que se añadan después

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // const b = document.createElement("button"); let n = 0; b.addEventListener("click", () => n++); b.click(); b.click(); n
  p2: undefined, // const i = document.createElement("input"); i.value = 5; typeof i.value
  p3: undefined, // Number("5") + 1
  p4: undefined, // "5" + 1
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
// Cada clic en el botón suma 1 y lo enseña en el elemento salida.
export function contadorDeClics(boton, salida) {
  let clics = 0;
  salida.textContent = "0";
  boton.addEventListener("click", () => {
    clics++;
    salida.textContent = String(clics);
  });
}

// 🔁 REPASO DEL NIVEL 12 ──────────────────────────────────────────────────────────────────────
// 🔁 13.r · crearBoton(texto, clase): DEVUELVE un <button type="button"> con ese texto y esa clase.
export function crearBoton(texto, clase) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 13.1 · mostrarOcultar(boton, elemento): cada clic en el botón pone o quita la clase "oculto" del elemento.
export function mostrarOcultar(boton, elemento) {
  throw new Error("Sin hacer");
}

// ✍️ 13.2 · leerFormulario(form): un objeto con lo escrito en los campos name="nombre" y name="precio":
//           el nombre SIN espacios a los lados (trim) y el precio como NÚMERO (Number).
//           → { nombre: "Teclado", precio: 25 }
export function leerFormulario(form) {
  throw new Error("Sin hacer");
}

// ✍️ 13.3 · validar(datos): una lista con los errores (vacía si todo está bien):
//           nombre vacío → "Falta el nombre" · precio no es un número o es 0 o menos → "El precio tiene que ser mayor que 0"
export function validar(datos) {
  throw new Error("Sin hacer");
}

// ✍️ 13.4 · conectarFormulario(form, lista): al enviar el formulario (submit), SIN recargar la página:
//           - lee los datos (leerFormulario) y los valida (validar);
//           - si hay errores: los escribe en el elemento .errores del formulario, separados por ". ", y no añade nada;
//           - si no: añade a lista un <li> con el texto "Teclado · 25 €", vacía .errores y limpia el formulario (form.reset()).
export function conectarFormulario(form, lista) {
  throw new Error("Sin hacer");
}

// ✍️ 13.5 · borrarAlPulsar(lista): DELEGACIÓN. Un solo escuchador de clic en la lista: si se pulsa un botón con la
//           clase "borrar" (o algo dentro de él), se quita el <li> en el que está ese botón. Tiene que funcionar también
//           con los <li> que se añadan DESPUÉS de llamar a borrarAlPulsar.
export function borrarAlPulsar(lista) {
  throw new Error("Sin hacer");
}
