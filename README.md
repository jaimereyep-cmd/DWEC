# RetroStock

Gestor de inventario y ventas para una tienda de videojuegos retro.

## Descripción

RetroStock es una aplicación de consola en JavaScript para gestionar el stock, registrar ventas y consultar el estado del catálogo de una tienda de videojuegos clásicos.

## Tecnologías

- JavaScript
- Vite
- ESLint
- Prettier

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Compilación

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Docker

### Ejecutar con Docker Compose

```bash
docker compose up --build
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

### Detener el contenedor

```bash
docker compose down
```

## Ver la web

Para abrir la aplicación en el navegador, ejecuta:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Luego visita:

```text
http://localhost:5173
```

## Funcionalidad añadida

El proyecto ya incluye la parte del punto 2 correspondiente a la búsqueda de productos:

- búsqueda por id o por título parcial,
- mensajes claros si no existe el producto,
- cálculo del precio de venta según el estado del juego,
- vista de resultado con la información principal del producto.

## Estructura básica

```text
.
├── index.html
├── src/
│   ├── catalogo.js
│   ├── main.js
│   ├── negocio.js
│   └── style.css
├── NOVEDADES_PUNTO_2.md
├── eslint.config.mjs
├── package.json
├── README.md
└── .gitignore
```
