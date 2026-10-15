//Calcular precio de venta
const precio_estado = {
    "nuevo-precintado": 1.25,
    "usado-como-nuevo": 1.0,
    "usado-caja-danada": 0.85,
    "solo-cartucho": 0.7,
};

const calcularPrecioVenta = (precioBase, estado) => {
    const multiplicador = precio_estado[estado];
    return precioBase * multiplicador;
};