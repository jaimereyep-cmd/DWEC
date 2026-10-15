# RetroStock

Proyecto de JavaScript vanilla creado con Vite.

## Organización del código

El código se divide por responsabilidades:

| Archivo           | Responsabilidad                                                  |
| ----------------- | ---------------------------------------------------------------- |
| `src/catalogo.js` | Datos iniciales de los videojuegos.                              |
| `src/negocio.js`  | Búsqueda, cálculo de precios y otras reglas de negocio.          |
| `src/vista.js`    | Creación y actualización de los elementos de la interfaz.        |
| `src/main.js`     | Conecta los datos, la lógica y la vista; gestiona el formulario. |
| `index.html`      | Documento que carga la aplicación.                               |

La separación evita concentrar la aplicación en `main.js`: las reglas de negocio no dependen del DOM y la vista no decide cómo buscar ni cómo calcular el precio. `main.js` coordina las partes.

## Ejecución

```bash
npm install
npm run dev
```

## ESLint y Prettier

```bash
npm run lint
npm run format
```

`npm run format` aplica Prettier; `npm run lint` ejecuta ESLint.
