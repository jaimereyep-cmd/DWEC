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

## Estructura básica

```text
.
├── index.html
├── src/
│   ├── main.js
│   └── style.css
├── eslint.config.mjs
├── package.json
├── README.md
└── .gitignore
```
