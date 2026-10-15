import { tieneStockBajo } from './negocio.js';

export const formatearProducto = (producto) => {
  const { titulo, plataforma, stock } = producto;
  const aviso = tieneStockBajo(producto) ? "¡¡¡Stock bajo!!!" : "";
  return `${titulo} (${plataforma}) - Stock: ${stock} ${aviso}`;
};

export const listarProductos = (productos) =>
  productos.map(formatearProducto).join("\n");