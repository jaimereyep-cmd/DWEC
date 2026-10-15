

//Calcular precio de venta
const precio_estado = {
    "nuevo-precintado": 1.25,
    "usado-como-nuevo": 1.0,
    "usado-caja-danada": 0.85,
    "solo-cartucho": 0.7,
};

export const calcularPrecioVenta = (precioBase, estado) => {
    const multiplicador = precio_estado[estado];
    return precioBase * multiplicador;
};

export const calcularDescuentoVolumen = (cantidad) => {
    if (cantidad >= 4) return 0.1; // 10% de descuento
    if (cantidad >= 2) return 0.05; // 5% de descuento
    return 0; // Sin descuento
};

const redondearPrecio = (precio) => Math.round(precio * 100) / 100;

export const calcularPrecioFinal = (precioBase, estado, cantidad) => {
    const precioVenta = calcularPrecioVenta(precioBase, estado);
    const descuentoVolumen = calcularDescuentoVolumen(cantidad);
    const precioConDescuento = precioVenta - (precioVenta * descuentoVolumen);
    return redondearPrecio(precioConDescuento);
};

export const venderProducto = (productos, id, cantidad) =>
    producto.map((producto) =>
        producto.id === id
            ? { ...producto, stock: producto.stock - cantidad }
            : producto
    );

export const reponerStock = (productos, id, cantidad) =>
  productos.map((producto) =>
    producto.id === id
      ? { ...producto, stock: producto.stock + cantidad }
      : producto
  );

const UMBRAL_STOCK_BAJO = 3;

export const tieneStockBajo = (producto) => producto.stock < UMBRAL_STOCK_BAJO;