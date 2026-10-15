import { catalogo } from './catalogo.js';
import { filtrarStockBajo, filtrarPorCategoria } from "./negocio.js";
import { listarProductos } from "./vistas.js";

import {
  buscarProducto,
  calcularPrecioFinal,
  redondearPrecio,
  venderProducto,
} from "./negocio.js";
import { formatearProducto, formatearEuros } from "./vistas.js";

let catalogoActual = catalogo;
let ventasSesion = [];

const gestionarBusqueda = () => {
  const texto = prompt("Id o título del producto:")?.trim();

  if (!texto) {
    alert("No has introducido ningún producto");
    return;
  }

  const producto = buscarProducto(catalogoActual, texto);

  alert(
    producto
      ? formatearProducto(producto)
      : `No se ha encontrado ningún producto para "${texto}"`
  );
};

const gestionarVenta = () => {
  const texto = prompt("Id o título del producto a vender:")?.trim();

  if (!texto) {
    alert("No has introducido ningún producto");
    return;
  }

  const producto = buscarProducto(catalogoActual, texto);

  if (!producto) {
    alert(`No se ha encontrado ningún producto para "${texto}"`);
    return;
  }

  const { id, titulo, precioBase, estado, stock } = producto;
  const cantidad = Number(prompt(`¿Cuántas unidades de "${titulo}"? (stock: ${stock})`));

  if (!Number.isInteger(cantidad) || cantidad <= 0) {
    alert("La cantidad debe ser un número entero mayor que 0");
  } else if (cantidad > stock) {
    alert(`Stock insuficiente: solo quedan ${stock} unidades`);
  } else {
    const precioUnitario = calcularPrecioFinal(precioBase, estado, cantidad);
    const total = redondearPrecio(precioUnitario * cantidad);

    catalogoActual = venderProducto(catalogoActual, id, cantidad);
    ventasSesion = [...ventasSesion, { id, titulo, cantidad, total }];

    alert(
      `Venta registrada\nPrecio unitario: ${formatearEuros(precioUnitario)}\nTotal: ${formatearEuros(total)}\nStock restante: ${stock - cantidad}`
    );
  }
};

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
    case "2":
      gestionarBusqueda();
      break;
    case "3":
      gestionarVenta();
      break;
    case "6":
      continuar = false;
      alert("Hasta pronto");
      break;
    default:
      alert("Opción no válida");
  }
}
