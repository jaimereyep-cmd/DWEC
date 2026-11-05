// ═══════════════════════════════════════════════════════════════════════════════════════════
//  🏁 MINI-PROYECTO 2 · Mi colección en la web
//  Explicación: web de DWEC → Practicar → Batería 0 → Mini-proyecto 2
//  Comprobar: docker compose run --rm web npm run comprobar m2
//  Verla funcionando: docker compose up → http://localhost:5173/?bloque=m2
// ═══════════════════════════════════════════════════════════════════════════════════════════
// La página de TU colección (la del mini-proyecto 1): verla, añadir, quitar, filtrar… y que lo recuerde todo.
// Junta los niveles 9 a 14: una clase, errores, DOM, eventos y localStorage. Es un bloque B + C de la práctica 2 en pequeño.
// La página ya tiene este HTML (no hace falta crearlo):
//   <form class="alta"> <input name="nombre"> <input name="categoria"> <input name="anio"> <input name="puntuacion">
//                       <button>Añadir</button> <p class="errores"></p> </form>
//   <select class="filtro"><option value="">Todas</option></select>
//   <div class="tarjetas"></div>

// ✍️ M2.1 · Coleccion: los datos, guardados en localStorage con la clave que le pases.
//           new Coleccion("mi-coleccion", inicial): si hay algo guardado con esa clave, lo carga; si no, usa una COPIA de inicial.
//           todos(): una copia de la lista.
// ✍️ M2.2 · agregar(elemento): primero VALIDA y, si algo está mal, lanza un Error con el mensaje:
//              nombre vacío → "Falta el nombre" · categoria vacía → "Falta la categoría" · anio no es un número → "El año tiene que ser un número"
//              puntuacion no es un número de 0 a 10 → "La puntuación va de 0 a 10"
//           Si está bien, lo añade y GUARDA.
// ✍️ M2.3 · quitar(nombre): quita el elemento con ese nombre y guarda.
//           categorias(): las categorías que hay, sin repetir y en orden alfabético.  → ["acción", "deportes"]
export class Coleccion {
  constructor(clave, inicial) {
    throw new Error("Sin hacer");
  }
  todos() {
    throw new Error("Sin hacer");
  }
  agregar(elemento) {
    throw new Error("Sin hacer");
  }
  quitar(nombre) {
    throw new Error("Sin hacer");
  }
  categorias() {
    throw new Error("Sin hacer");
  }
}

// ✍️ M2.4 · crearTarjeta(elemento): DEVUELVE
//             <article class="item" data-nombre="Hades">
//               <h3>Hades</h3>
//               <p>2020 · acción · ★ 10</p>
//               <button type="button" class="quitar">Quitar</button>
//             </article>
//           pintar(contenedor, elementos): vacía el contenedor y cuelga una tarjeta por elemento.
export function crearTarjeta(elemento) {
  throw new Error("Sin hacer");
}
export function pintar(contenedor, elementos) {
  throw new Error("Sin hacer");
}

// ✍️ M2.5 · iniciarApp(raiz, coleccion): pone la página en marcha (raiz es el elemento que contiene el HTML de arriba).
//           - pinta todas las tarjetas en .tarjetas y rellena el <select class="filtro"> con una <option> por categoría
//             (además de la de «Todas», que ya está);
//           - al enviar el formulario (sin recargar): lee los cuatro campos (anio y puntuacion con Number), intenta
//             coleccion.agregar; si lanza un error, su mensaje va a .errores; si no, vacía .errores, limpia el
//             formulario, vuelve a pintar y actualiza las opciones del filtro.
// ✍️ M2.6 · y además:
//           - clic en un botón .quitar (DELEGACIÓN en .tarjetas): quita ese elemento (su data-nombre) y vuelve a pintar;
//           - al cambiar el filtro (evento "change"): pinta solo los de esa categoría (o todos, si es «Todas», value "").
//           Ojo: después de añadir o quitar, se respeta el filtro que esté elegido.
export function iniciarApp(raiz, coleccion) {
  throw new Error("Sin hacer");
}
