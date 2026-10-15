const crearElemento = (etiqueta, texto) => {
  const elemento = document.createElement(etiqueta);

  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
};

export function crearVista(app, vistaRapida) {
  const contenido = crearElemento('main');
  const titulo = crearElemento('h1', 'RetroStock');
  const introduccion = crearElemento(
    'p',
    'Busca por ID o por título parcial para localizar un juego del catálogo.',
  );
  const form = crearElemento('form');
  form.id = 'search-form';

  const label = crearElemento('label', 'Criterio de búsqueda');
  label.htmlFor = 'search-input';

  const input = crearElemento('input');
  input.id = 'search-input';
  input.name = 'search';
  input.type = 'text';
  input.placeholder = 'Buscar producto';
  input.autocomplete = 'off';

  const boton = crearElemento('button', 'Buscar');
  boton.type = 'submit';

  form.append(label, input, boton);

  const status = crearElemento('div');
  status.id = 'search-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  const results = crearElemento('div');
  results.id = 'results';

  const tituloCatalogo = crearElemento('h2', 'Vista rápida del catálogo');
  const listaRapida = crearElemento('pre', vistaRapida);

  contenido.append(
    titulo,
    introduccion,
    form,
    status,
    results,
    tituloCatalogo,
    listaRapida,
  );
  app.replaceChildren(contenido);

  return { form, input, status, results };
}

export function mostrarError(vista, mensaje, totalBusquedas) {
  vista.status.textContent = `${mensaje} (Búsquedas: ${totalBusquedas})`;

  const ayuda = crearElemento(
    'p',
    'Prueba con un ID válido o con una palabra del título, por ejemplo: «Mario».',
  );
  vista.results.replaceChildren(ayuda);
}

export function mostrarProducto(
  vista,
  producto,
  precioVenta,
  mensaje,
  totalBusquedas,
) {
  vista.status.textContent = `${mensaje} (Búsquedas: ${totalBusquedas})`;

  const articulo = crearElemento('article');
  const titulo = crearElemento('h2', `ID ${producto.id} - ${producto.titulo}`);
  const detalles = crearElemento('ul');
  const campos = [
    ['Plataforma', producto.plataforma],
    ['Categoría', producto.categoria],
    ['Estado', producto.conservacion],
    ['Precio base', `${producto.precioBase.toFixed(2)} €`],
    ['Precio de venta', `${precioVenta.toFixed(2)} €`],
    ['Stock', `${producto.stock} unidades`],
  ];

  for (const [nombre, valor] of campos) {
    detalles.append(crearElemento('li', `${nombre}: ${valor}`));
  }

  articulo.append(titulo, detalles);
  vista.results.replaceChildren(articulo);
}
