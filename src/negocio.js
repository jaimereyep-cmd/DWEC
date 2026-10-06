export function getPrecioVenta(producto) {
  const { precioBase, conservacion } = producto;
  let factor;

  switch (conservacion) {
    case 'nuevo-precintado':
      factor = 1.25;
      break;
    case 'usado-como-nuevo':
      factor = 1;
      break;
    case 'usado-caja-danada':
      factor = 0.85;
      break;
    case 'solo-cartucho':
      factor = 0.7;
      break;
    default:
      factor = 1;
  }

  return Number((precioBase * factor).toFixed(2));
}

export function crearContadorBusquedas() {
  let contador = 0;

  return () => {
    contador += 1;
    return contador;
  };
}

export const formatearProducto = function (producto) {
  const precioVenta = getPrecioVenta(producto);
  return `${producto.id}. ${producto.titulo} · ${producto.plataforma} · ${producto.categoria} · ${precioVenta.toFixed(2)} € · Stock: ${producto.stock}`;
};

export function formatearLista(productos = [], ...extras) {
  const lineas = productos.map((producto) => formatearProducto(producto));

  if (extras.length > 0) {
    lineas.push(extras.join(' '));
  }

  return lineas.join('\n');
}

export function buscarProducto(productos = [], criterio = '') {
  const valor = String(criterio).trim();

  if (!valor) {
    return {
      encontrado: false,
      mensaje: 'Debes introducir un id o un texto para buscar.',
    };
  }

  const idBuscado = Number.parseInt(valor, 10);
  const producto = productos.find((item) => {
    if (!Number.isNaN(idBuscado) && item.id === idBuscado) {
      return true;
    }

    return item.titulo.toLowerCase().includes(valor.toLowerCase());
  });

  if (!producto) {
    return {
      encontrado: false,
      mensaje: `No se ha encontrado ningún producto con "${valor}".`,
    };
  }

  const indice = productos.findIndex((item) => item.id === producto.id);

  return {
    encontrado: true,
    producto,
    indice,
    mensaje: `${producto.titulo} encontrado en la posición ${indice + 1}.`,
  };
}

export function resumenBusqueda(productos = [], criterio = '', ...extras) {
  const resultado = buscarProducto(productos, criterio);

  if (!resultado.encontrado) {
    return resultado.mensaje;
  }

  const textoExtra = extras.length > 0 ? ` ${extras.join(' ')}` : '';
  return `${resultado.mensaje}${textoExtra}`;
}
