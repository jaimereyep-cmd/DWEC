import { tienesStockBajo } from './negocio.js';

export const formatearProducto = (producto) => {
  const { titulo, plataforma, categoria, precioBase, conservacion, stock } = producto;
  const aviso = tienesStockBajo(producto) ? "¡¡¡Stock bajo!!!" : "";
  return `${titulo} (${plataforma}) - Stock: ${stock} ${aviso}`;
};