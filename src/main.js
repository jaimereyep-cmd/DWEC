import { catalogo } from './catalogo.js';
import { filtrarStockBajo, filtrarPorCategoria } from "./negocio.js";
import { listarProductos } from "./vistas.js";

let catalogoActual = catalogo;

const bajos = filtrarStockBajo(catalogoActual);

alert(
  bajos.length > 0
    ? listarProductos(bajos)
    : "No hay productos con stock bajo"
);

const MENU_PRINCIPAL = `RETROSTOCK
1. Ver catálogo
2. Buscar producto
3. Registrar una venta
4. Reponer stock
5. Informe de caja
6. Salir`;

const MENU_CATALOGO = `VER CATÁLOGO
1. Todo el catálogo
2. Filtrar por categoría
3. Solo productos con stock bajo`;

const gestionarCatalogo = () => {
  const opcion = prompt(MENU_CATALOGO)?.trim();

  switch (opcion) {
    case "1":
      alert(listarProductos(catalogoActual));
      break;
    case "2": {
      const categoria = prompt("¿Qué categoría?")?.trim();
      const filtrados = filtrarPorCategoria(catalogoActual, categoria);
      alert(
        filtrados.length > 0
          ? listarProductos(filtrados)
          : "No hay productos en esa categoría"
      );
      break;
    }
    case "3": {
      const bajos = filtrarStockBajo(catalogoActual);
      alert(
        bajos.length > 0
          ? listarProductos(bajos)
          : "No hay productos con stock bajo"
      );
      break;
    }
    default:
      alert("Opción no válida");
  }
};

let continuar = true;

while (continuar) {
  const opcion = prompt(MENU_PRINCIPAL)?.trim();

  switch (opcion) {
    case "1":
      gestionarCatalogo();
      break;
    case "6":
      continuar = false;
      alert("Hasta pronto");
      break;
    default:
      alert("Opción no válida");
  }
}