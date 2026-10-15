## Organización del código

Separé el proyecto en cuatro ficheros dentro de `src/`, cada uno con una
única responsabilidad:

- `catalogo.js`: contiene solo los datos (`catalogoInicial`). Está aislado
  porque es la fuente de datos y nunca se modifica.
- `negocio.js`: reglas de negocio. Incluye las Tablas A, B y C, el cálculo
  del precio final, y las funciones de venta y reposición. No imprime nada
  ni sabe cómo se muestra la información.
- `vistas.js`: funciones que convierten datos en texto para mostrar
  (por ejemplo, formatear una línea de producto con su aviso de stock bajo).
- `main.js`: menú, bucle principal y estado de la sesión. Solo coordina
  los otros módulos.

### Por qué esta separación

- **Cambios localizados:** si cambia un porcentaje de las tablas, solo toco
  `negocio.js`. Si cambia el formato del listado, solo `vistas.js`.
- **Una única fuente de verdad:** los valores de las tablas están en
  constantes, no repartidos por el código.
- **Inmutabilidad:** `catalogoInicial` nunca se modifica. Cada venta o
  reposición devuelve un array nuevo, y `main.js` guarda el catálogo
  actual en una variable que se reasigna.
- **Facilidad para probar:** las funciones de `negocio.js` reciben datos y
  devuelven datos, así que se pueden probar de forma aislada.

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
