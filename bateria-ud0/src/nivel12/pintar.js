// ═══════════════════════════════════════════════════════════════════════════════════════════
//  NIVEL 12 · El DOM: pintar en la página
//  Explicación: web de DWEC → Practicar → Batería 0 → Nivel 12
//  Comprobar: docker compose run --rm web npm run comprobar 12      Ver: docker compose up → http://localhost:5173
// ═══════════════════════════════════════════════════════════════════════════════════════════
// La página es un árbol de ELEMENTOS (<h1>, <p>, <ul>…). Desde JavaScript se crean, se rellenan y se cuelgan:
//   const p = document.createElement("p");     ← crea un <p> (todavía no está en la página)
//   p.textContent = "Hola";                    ← le pone texto (SIEMPRE textContent para textos: es seguro)
//   p.classList.add("aviso");                  ← le añade una clase CSS
//   contenedor.append(p);                      ← lo cuelga DENTRO de contenedor (ahora sí se ve)
//   contenedor.querySelector(".aviso")         ← busca el PRIMERO que encaje con el selector CSS (o null)
//   contenedor.querySelectorAll("li")          ← busca TODOS (se recorre con for…of)
//   contenedor.replaceChildren()               ← lo vacía
// Ojo: innerHTML = texto interpreta las etiquetas (<b>, <script>…): con datos que escribe el usuario es PELIGROSO.

// 🔮 PREDICCIONES
export const predicciones = {
  p1: undefined, // document.createElement("p").tagName
  p2: undefined, // const d = document.createElement("div"); d.textContent = "hola"; d.textContent
  p3: undefined, // const u = document.createElement("ul"); u.append(document.createElement("li"), document.createElement("li")); u.children.length
  p4: undefined, // document.createElement("div").querySelector("p")
};

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────────────────────
export function ponerTitulo(contenedor, texto) {
  const h2 = document.createElement("h2");
  h2.textContent = texto;
  contenedor.append(h2);
  return h2;
}

// 🔁 REPASO DEL NIVEL 11 ──────────────────────────────────────────────────────────────────────
// 🔁 12.r · validarPrecio(precio): si no es un número o es 0 o negativo, lanza Error "Precio no válido". Si no, lo devuelve.
export function validarPrecio(precio) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────────────────────
// ✍️ 12.1 · crearParrafo(texto): DEVUELVE un <p> con ese texto (no lo cuelga en ningún sitio).
//           Si el texto es "<b>hola</b>", el párrafo tiene que enseñar eso tal cual, no una negrita (textContent).
export function crearParrafo(texto) {
  throw new Error("Sin hacer");
}

// ✍️ 12.2 · crearLista(elementos): DEVUELVE un <ul> con un <li> por cada texto de la lista.
//           crearLista(["pan", "leche"]) → <ul><li>pan</li><li>leche</li></ul>
export function crearLista(elementos) {
  throw new Error("Sin hacer");
}

// ✍️ 12.3 · crearTarjeta(producto): DEVUELVE   <article class="producto">
//                                                <h3>Teclado</h3>
//                                                <p class="precio">25 €</p>
//                                              </article>
export function crearTarjeta(producto) {
  throw new Error("Sin hacer");
}

// ✍️ 12.4 · pintarProductos(contenedor, productos): VACÍA el contenedor y cuelga dentro una tarjeta por producto.
//           USA crearTarjeta. Si se llama dos veces, no se tienen que acumular las tarjetas de la primera vez.
export function pintarProductos(contenedor, productos) {
  throw new Error("Sin hacer");
}

// ✍️ 12.5 · resaltar(contenedor, selector): añade la clase "resaltado" a TODOS los elementos de dentro del contenedor
//           que encajen con el selector, y devuelve cuántos ha resaltado.   resaltar(lista, "li") → 3
export function resaltar(contenedor, selector) {
  throw new Error("Sin hacer");
}

// ✍️ 12.6 · contarTexto(contenedor, selector): cuántos elementos que encajan con el selector tienen un texto
//           que incluye la palabra buscada.  contarTexto(lista, "li", "pan") → los <li> cuyo texto incluye "pan"
export function contarTexto(contenedor, selector, palabra) {
  throw new Error("Sin hacer");
}
