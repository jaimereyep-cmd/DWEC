import { catalogo } from './catalogo.js'
import {
  buscarProducto,
  crearContadorBusquedas,
  formatearLista,
  getPrecioVenta,
} from './negocio.js'

const app = document.querySelector('#app')
const contarBusquedas = crearContadorBusquedas()

app.innerHTML = `
  <main>
    <h1>RetroStock</h1>
    <p>Busca por id o por título parcial para localizar un juego del catálogo.</p>

    <form id="search-form">
      <label for="search-input">Criterio de búsqueda</label>
      <input
        id="search-input"
        name="search"
        type="text"
        placeholder="Buscar producto"
        autocomplete="off"
      />
      <button type="submit">Buscar</button>
    </form>

    <div id="search-status"></div>
    <div id="results"></div>

    <h2>Vista rápida del catálogo</h2>
    <pre>${formatearLista(catalogo.slice(0, 3), 'Ejemplo de resultados')}</pre>
  </main>
`

const form = document.querySelector('#search-form')
const input = document.querySelector('#search-input')
const status = document.querySelector('#search-status')
const results = document.querySelector('#results')

const renderResultado = (criterio) => {
  const resultado = buscarProducto(catalogo, criterio)
  const totalBusquedas = contarBusquedas()

  if (!resultado.encontrado) {
    status.textContent = `${resultado.mensaje} (Búsquedas: ${totalBusquedas})`
    results.innerHTML = `
      <p>Prueba con un id válido o con una palabra del título, por ejemplo: "Mario".</p>
    `
    return
  }

  const producto = resultado.producto
  const precioVenta = getPrecioVenta(producto)

  status.textContent = `${resultado.mensaje} (Búsquedas: ${totalBusquedas})`
  results.innerHTML = `
    <article>
      <h2>ID ${producto.id} - ${producto.titulo}</h2>
      <ul>
        <li>Plataforma: ${producto.plataforma}</li>
        <li>Categoría: ${producto.categoria}</li>
        <li>Estado: ${producto.conservacion}</li>
        <li>Precio base: ${producto.precioBase.toFixed(2)} €</li>
        <li>Precio de venta: ${precioVenta.toFixed(2)} €</li>
        <li>Stock: ${producto.stock} unidades</li>
      </ul>
    </article>
  `
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderResultado(input.value)
})

renderResultado('Mario')
