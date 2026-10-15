import { calcularPrecioFinal } from './negocio.js';
import { catalogo } from './catalogo.js';

const bajos = filtrarStockBajo(catalogoActual);

alert(
  bajos.length > 0
    ? listarProductos(bajos)
    : "No hay productos con stock bajo"
);