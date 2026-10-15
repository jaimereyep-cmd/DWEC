# RetroStock

Aplicación web de inventario para una tienda de videojuegos retro. Está creada con JavaScript vanilla y Vite; no utiliza frameworks de interfaz ni un servidor de datos.

## Funcionalidad actual

- Catálogo de ejemplo con 12 videojuegos.
- Búsqueda por ID o por una parte del título, sin distinguir mayúsculas de minúsculas.
- Mensajes para búsquedas vacías o sin resultados.
- Cálculo del precio según el estado de conservación.
- Contador de búsquedas y ficha del producto encontrado.

El catálogo vive en memoria. Las ventas, la reposición y la persistencia de datos todavía no están implementadas.

## Requisitos

- Node.js y npm.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal (normalmente `http://localhost:5173`).

## Comprobaciones

```bash
npm run lint
npm run format:check
npm run build
```

`npm run format` aplica el formato de Prettier a los archivos del proyecto.

## Docker

También se puede iniciar con Docker Compose:

```bash
docker compose up --build
```

La aplicación queda disponible en `http://localhost:5173`. Para detenerla:

```bash
docker compose down
```

## Organización del código

La aplicación se divide por responsabilidades para que los datos, las reglas del negocio, la interfaz y la coordinación no dependan de un único archivo:

| Archivo           | Responsabilidad                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `src/catalogo.js` | Datos iniciales de los videojuegos: ID, título, plataforma, categoría, precio base, conservación y stock.      |
| `src/negocio.js`  | Reglas independientes del navegador: precio de venta, contador de búsquedas, búsqueda y formato de resultados. |
| `src/vista.js`    | Creación y actualización de los elementos HTML que ve el usuario.                                              |
| `src/main.js`     | Punto de entrada: conecta el catálogo, la lógica de negocio y la vista; escucha el envío del formulario.       |
| `src/style.css`   | Estilos de la interfaz.                                                                                        |
| `index.html`      | Documento HTML inicial que carga la aplicación.                                                                |

### Recorrido de una búsqueda

1. `main.js` escucha el envío del formulario y evita que la página se recargue.
2. La búsqueda se delega a `buscarProducto`, en `negocio.js`, usando los datos de `catalogo.js`.
3. `main.js` actualiza el contador y calcula el precio de venta mediante la lógica de negocio.
4. `vista.js` muestra el error o la ficha del producto; no decide cómo buscar ni cómo calcular precios.

Esta separación facilita cambiar la presentación sin reescribir las reglas, y probar las funciones de negocio sin necesitar el DOM.

## Lógica del precio

El precio de venta se obtiene multiplicando el precio base por el factor asociado al estado:

| Estado                | Factor |
| --------------------- | -----: |
| Nuevo precintado      |   1,25 |
| Usado como nuevo      |      1 |
| Usado con caja dañada |   0,85 |
| Solo cartucho         |   0,70 |

El resultado se redondea a dos decimales.

## Flujo de ramas

El desarrollo de RetroStock se integró desde `feature/retrostock-completa` en `main` mediante una fusión explícita. La rama de funcionalidad se conserva para que el historial muestre el trabajo integrado.
