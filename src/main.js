import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="app-shell">
    <section class="panel">
      <p class="eyebrow">RetroStock</p>
      <h1>Gestor de inventario y ventas</h1>
      <p class="subtitle">
        Control del stock, registro de ventas y seguimiento del catálogo retro.
      </p>
      <div class="stats">
        <article>
          <span>Productos</span>
          <strong>128</strong>
        </article>
        <article>
          <span>Ventas</span>
          <strong>42</strong>
        </article>
        <article>
          <span>Alertas</span>
          <strong>3</strong>
        </article>
      </div>
    </section>
  </main>
`
