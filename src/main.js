import { catalogo } from './catalogo.js';
import {
  buscarProducto,
  crearContadorBusquedas,
  formatearLista,
  getPrecioVenta,
} from './negocio.js';
import { crearVista, mostrarError, mostrarProducto } from './vista.js';
import './style.css';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('No se encontró el contenedor principal de la aplicación.');
}

const vista = crearVista(app, formatearLista(catalogo.slice(0, 3)));
const contarBusquedas = crearContadorBusquedas();

const renderizarResultado = (criterio) => {
  const resultado = buscarProducto(catalogo, criterio);
  const totalBusquedas = contarBusquedas();

  if (!resultado.encontrado) {
    mostrarError(vista, resultado.mensaje, totalBusquedas);
    return;
  }

  mostrarProducto(
    vista,
    resultado.producto,
    getPrecioVenta(resultado.producto),
    resultado.mensaje,
    totalBusquedas,
  );
};

vista.form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderizarResultado(vista.input.value);
});

renderizarResultado('Mario');
