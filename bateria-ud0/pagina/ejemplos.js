// ejemplos.js — Qué enseña la página en cada nivel. No hace falta tocarlo.
//   fichero:  el fichero del nivel. Todo lo que exporta queda en la consola (F12) con su nombre.
//   ejemplos: código que la página ejecuta con TUS funciones; «espera» es lo que debería salir.
// El comprobador (docker compose run --rm web npm run comprobar N) prueba muchos más casos: esto es para VER y DEPURAR.
const modulos = import.meta.glob("../src/*/*.js");
const textos = import.meta.glob("../src/*/*.js", { query: "?raw", import: "default" });

export const BLOQUES = [
  { n: "0", titulo: "Arrancar", fichero: "nivel00/hola.js", ejemplos: [] },
  {
    n: "1", titulo: "Variables y tipos", fichero: "nivel01/variables.js",
    ejemplos: [
      { codigo: "ciudad", espera: '"Cádiz"', tipo: "👀" },
      { codigo: "typeof nombre", espera: '"string"' },
      { codigo: "typeof edad", espera: '"number"' },
      { codigo: "typeof esAlumno", espera: '"boolean"' },
      { codigo: "puntos", espera: "15" },
    ],
  },
  {
    n: "2", titulo: "Operaciones y textos", fichero: "nivel02/operaciones.js",
    ejemplos: [
      { codigo: "doble(4)", espera: "8", tipo: "👀" },
      { codigo: 'tipoDe("hola")', espera: '"string"', tipo: "🔁" },
      { codigo: "conIva(100)", espera: "121" },
      { codigo: "esPar(7)", espera: "false" },
      { codigo: 'nombreCompleto("Ana", "López")', espera: '"Ana López"' },
      { codigo: 'iniciales("Ana", "López")', espera: '"A.L."' },
      { codigo: 'gritar("hola")', espera: '"HOLA!"' },
      { codigo: 'letrasDe("Ana", "López")', espera: "9" },
    ],
  },
  {
    n: "3", titulo: "Decisiones", fichero: "nivel03/decisiones.js",
    ejemplos: [
      { codigo: "esMayorDeEdad(17)", espera: "false", tipo: "👀" },
      { codigo: "mitad(7)", espera: "3.5", tipo: "🔁" },
      { codigo: "mayor(3, 8)", espera: "8" },
      { codigo: "signo(0)", espera: '"cero"' },
      { codigo: "[calificacion(4.9), calificacion(5), calificacion(7), calificacion(9)]", espera: '["suspenso", "aprobado", "notable", "sobresaliente"]' },
      { codigo: "puedeEntrar(16, true)", espera: "false" },
      { codigo: "[precioEntrada(8), precioEntrada(30), precioEntrada(70)]", espera: "[5, 9, 6]" },
      { codigo: 'esFinde("domingo")', espera: "true" },
    ],
  },
  {
    n: "4", titulo: "Bucles", fichero: "nivel04/bucles.js",
    ejemplos: [
      { codigo: "sumaHasta(4)", espera: "10", tipo: "👀" },
      { codigo: "valorAbsoluto(-7)", espera: "7", tipo: "🔁" },
      { codigo: "factorial(4)", espera: "24" },
      { codigo: "cuentaAtras(3)", espera: '"3 2 1 ¡Ya!"' },
      { codigo: "contarPares(10)", espera: "5" },
      { codigo: 'contarVocales("murcielago")', espera: "5" },
      { codigo: "tablaDel(2).split(\"\\n\").length", espera: "10" },
      { codigo: "vecesParaLlegar(1, 10)", espera: "4" },
    ],
  },
  {
    n: "5", titulo: "Funciones", fichero: "nivel05/funciones.js",
    ejemplos: [
      { codigo: "areaRectangulo(3, 4)", espera: "12", tipo: "👀" },
      { codigo: "sumaPares(6)", espera: "12", tipo: "🔁" },
      { codigo: "cuadrado(4)", espera: "16" },
      { codigo: "saludar()", espera: '"Hola, desconocido"' },
      { codigo: "hipotenusa(3, 4)", espera: "5" },
      { codigo: "aplicarDescuento(80, 25)", espera: "60" },
      { codigo: "redondear(12.3456)", espera: "12.35" },
      { codigo: "precioFinal(80, 25)", espera: "72.6" },
    ],
  },
  {
    n: "6", titulo: "Arrays", fichero: "nivel06/arrays.js",
    ejemplos: [
      { codigo: "ultimo([4, 5, 6])", espera: "6", tipo: "👀" },
      { codigo: "triple(4)", espera: "12", tipo: "🔁" },
      { codigo: "sumar([4, 1, 5])", espera: "10" },
      { codigo: "media([4, 6, 8])", espera: "6" },
      { codigo: "maximo([-5, -2])", espera: "-2" },
      { codigo: "contiene([1, 2, 3], 2)", espera: "true" },
      { codigo: "soloAprobados([7, 3, 5, 4])", espera: "[7, 5]" },
      { codigo: "alReves([1, 2, 3])", espera: "[3, 2, 1]" },
    ],
  },
  {
    n: "7", titulo: "Objetos", fichero: "nivel07/objetos.js",
    ejemplos: [
      { codigo: 'crearPersona("Ana", 20)', espera: '{ nombre: "Ana", edad: 20 }', tipo: "👀" },
      { codigo: "contarMayoresQue([3, 8, 10, 1], 5)", espera: "2", tipo: "🔁" },
      { codigo: 'crearProducto("Teclado", 25)', espera: '{ nombre: "Teclado", precio: 25, disponible: true }' },
      { codigo: 'presentar({ nombre: "Ana", edad: 20 })', espera: '"Me llamo Ana y tengo 20 años"' },
      { codigo: 'leerCampo({ nombre: "Ana", edad: 20 }, "edad")', espera: "20" },
      { codigo: 'const ana = { nombre: "Ana", edad: 20 };\n[cumplirAnios(ana).edad, ana.edad]', espera: "[21, 20]" },
      { codigo: 'rebajar({ nombre: "Ratón", precio: 15 }, 20)', espera: '{ nombre: "Ratón", precio: 0 }' },
      { codigo: 'describir({ nombre: "Ana", edad: 20 })', espera: '"nombre: Ana, edad: 20"' },
    ],
  },
  {
    n: "8", titulo: "Listas de objetos", fichero: "nivel08/listas.js",
    preparar: 'var tienda = [{ nombre: "Teclado", precio: 25, stock: 4, categoria: "periféricos" }, { nombre: "Ratón", precio: 12, stock: 0, categoria: "periféricos" }, { nombre: "Cable", precio: 8, stock: 10, categoria: "cables" }];',
    ejemplos: [
      { codigo: "nombres(tienda)", espera: '["Teclado", "Ratón", "Cable"]', tipo: "👀" },
      { codigo: "etiqueta(tienda[0])", espera: '"Teclado · 25 €"', tipo: "🔁" },
      { codigo: "nombres(baratos(tienda, 12))", espera: '["Ratón", "Cable"]' },
      { codigo: 'buscar(tienda, "Cable").precio', espera: "8" },
      { codigo: "valorDelAlmacen(tienda)", espera: "180" },
      { codigo: "etiquetas(tienda)", espera: '["Teclado · 25 €", "Ratón · 12 €", "Cable · 8 €"]' },
      { codigo: "conDescuento(tienda, 10).map((p) => p.precio)", espera: "[22.5, 10.8, 7.2]" },
      { codigo: "contarPorCategoria(tienda)", espera: "{ periféricos: 2, cables: 1 }" },
      { codigo: "nombres(ordenarPorPrecio(tienda))", espera: '["Cable", "Ratón", "Teclado"]' },
    ],
  },
  {
    n: "m1", titulo: "Mini-proyecto 1 · Mi colección", fichero: "mini1/coleccion.js",
    ejemplos: [
      { codigo: "coleccion.length >= 6", espera: "true" },
      { codigo: "titulos(coleccion)", espera: null },
      { codigo: "mejor(coleccion)", espera: null },
      { codigo: "mediaPuntuacion(coleccion)", espera: null },
      { codigo: "ficha(coleccion[0])", espera: null },
      { codigo: "resumen(coleccion)", espera: null },
    ],
  },
  {
    n: "9", titulo: "Clases", fichero: "nivel09/clases.js",
    ejemplos: [
      { codigo: "const c = new Contador();\nc.incrementar();\nc.incrementar();\nc.valor", espera: "2", tipo: "👀" },
      { codigo: 'new Producto("Teclado", 25)', espera: 'Producto { nombre: "Teclado", precio: 25 }' },
      { codigo: 'new Producto("Teclado", 25).conIva()', espera: "30.25" },
      { codigo: 'new Producto("Teclado", 25).descripcion()', espera: '"Teclado: 25 €"' },
      { codigo: 'const cuenta = new Cuenta("Ana");\ncuenta.ingresar(80);\n[cuenta.retirar(100), cuenta.retirar(30), cuenta.estado()]', espera: '[false, true, "Ana: 50 €"]' },
      { codigo: 'const l = new ListaCompra();\nl.agregar("pan");\nl.agregar("pan");\nl.cuantas()', espera: "1" },
    ],
  },
  {
    n: "10", titulo: "Herencia y privados", fichero: "nivel10/herencia.js",
    ejemplos: [
      { codigo: 'new Perro("Toby").presentarse()', espera: '"Soy Toby y digo Guau"', tipo: "👀" },
      { codigo: "new Rectangulo(3, 4).area()", espera: "12", tipo: "🔁" },
      { codigo: 'new Coche("Seat", 5).describir()', espera: '"Coche Seat de 5 puertas"' },
      { codigo: 'const moto = new Moto("Honda");\n[moto.ruedas(), moto.describir()]', espera: '[2, "Vehículo Honda (moto)"]' },
      { codigo: 'describirTodos([new Coche("Seat", 5), new Moto("Honda")])', espera: '["Coche Seat de 5 puertas", "Vehículo Honda (moto)"]' },
      { codigo: "const h = new Hucha();\nh.meter(10);\nh.meter(-5);\n[h.cuanto(), h.dinero]", espera: "[10, undefined]" },
    ],
  },
  {
    n: "11", titulo: "Errores", fichero: "nivel11/errores.js",
    ejemplos: [
      { codigo: "dividirOCero(1, 0)", espera: "0", tipo: "👀" },
      { codigo: "new Cuadrado(3).area()", espera: "9", tipo: "🔁" },
      { codigo: "raizCuadrada(-1)", espera: "💥" },
      { codigo: "raizOMensaje(-1)", espera: '"No hay raíz de un negativo"' },
      { codigo: 'crearUsuario("", 20)', espera: "💥" },
      { codigo: 'new ErrorDeStock("Sin stock").name', espera: '"ErrorDeStock"' },
      { codigo: 'vender({ nombre: "Ratón", stock: 5 }, 2)', espera: '{ nombre: "Ratón", stock: 3 }' },
      { codigo: 'intentarVender({ nombre: "Ratón", stock: 2 }, 5)', espera: '"Solo quedan 2"' },
    ],
  },
  {
    n: "12", titulo: "El DOM: pintar", fichero: "nivel12/pintar.js", escenario: true,
    ejemplos: [
      { codigo: 'ponerTitulo(escenario, "Mi tienda").outerHTML', espera: '"<h2>Mi tienda</h2>"', tipo: "👀" },
      { codigo: "validarPrecio(5)", espera: "5", tipo: "🔁" },
      { codigo: 'crearParrafo("<b>hola</b>").outerHTML', espera: '"<p>&lt;b&gt;hola&lt;/b&gt;</p>"' },
      { codigo: 'escenario.append(crearLista(["pan", "leche"]));\nescenario.querySelectorAll("li").length', espera: "2" },
      { codigo: 'pintarProductos(escenario, [{ nombre: "Teclado", precio: 25 }, { nombre: "Ratón", precio: 12 }]);\nescenario.querySelectorAll("article").length', espera: "2" },
      { codigo: 'resaltar(escenario, "h3")', espera: "2" },
    ],
  },
  {
    n: "13", titulo: "Eventos y formularios", fichero: "nivel13/eventos.js", escenario: true,
    html: '<form class="alta"><input name="nombre" placeholder="nombre"> <input name="precio" placeholder="precio"> <button>Añadir</button><p class="errores"></p></form><ul class="lista"></ul>',
    ejemplos: [
      { codigo: 'crearBoton("Borrar", "borrar").outerHTML', espera: '"<button type=\\"button\\" class=\\"borrar\\">Borrar</button>"', tipo: "🔁" },
      { codigo: 'validar({ nombre: "", precio: 0 })', espera: '["Falta el nombre", "El precio tiene que ser mayor que 0"]' },
      { codigo: 'conectarFormulario(escenario.querySelector("form"), escenario.querySelector(".lista"));\nborrarAlPulsar(escenario.querySelector(".lista"));\n"Ahora prueba el formulario de abajo ⬇"', espera: '"Ahora prueba el formulario de abajo ⬇"' },
    ],
  },
  {
    n: "14", titulo: "Guardar datos", fichero: "nivel14/guardar.js",
    ejemplos: [
      { codigo: "leerNombre()", espera: null, tipo: "👀" },
      { codigo: 'guardar("prueba", [1, 2]);\nlocalStorage.getItem("prueba")', espera: '"[1,2]"' },
      { codigo: 'cargar("prueba", [])', espera: "[1, 2]" },
      { codigo: 'localStorage.setItem("roto", "{roto");\ncargar("roto", [])', espera: "[]" },
      { codigo: "contarVisita()", espera: null },
      { codigo: 'const l = new ListaGuardada("compra");\nl.agregar("pan");\nnew ListaGuardada("compra").elementos().length > 0', espera: "true" },
    ],
  },
  {
    n: "m2", titulo: "Mini-proyecto 2 · Mi colección en la web", fichero: "mini2/app.js", app: true,
    ejemplos: [
      { codigo: 'new Coleccion("ejemplo", coleccion).categorias()', espera: null },
      { codigo: 'crearTarjeta(coleccion[0]).outerHTML', espera: null },
    ],
  },
];

export const cargarModulo = (fichero) => modulos[`../src/${fichero}`]?.();
export const textoDe = (fichero) => textos[`../src/${fichero}`]?.() ?? Promise.resolve("");
// La colección del mini-proyecto 1 (para el mini-proyecto 2)
export const cargarColeccion = async () => (await modulos["../src/mini1/coleccion.js"]?.())?.coleccion ?? [];

// Las predicciones salen del propio fichero: «p1: …, // expresión»
export function prediccionesDe(texto) {
  return [...texto.matchAll(/^\s*(p\d+):[^\n]*?,\s*\/\/\s*(.+?)(?:\s{2,}←.*)?$/gm)].map(([, clave, expresion]) => ({ clave, expresion: expresion.trim() }));
}
