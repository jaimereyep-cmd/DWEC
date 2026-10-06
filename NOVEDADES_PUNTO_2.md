# Qué faltaba del punto 2: búsqueda de producto

Había una parte del proyecto de RetroStock que aún no estaba implementada: la funcionalidad de buscar productos.

## Lo que se añadió

- Se definió la lógica de negocio para buscar un videojuego por id o por título parcial.
- La búsqueda usa `find()` y `findIndex()` para localizar el elemento y la posición exacta dentro del catálogo.
- Si no existe ninguna coincidencia, la aplicación devuelve un mensaje claro en lugar de dejar `undefined` por consola.
- Se añadió una vista sencilla en la interfaz para introducir el criterio de búsqueda y mostrar el resultado con sus datos principales.
- Se incorporó una función para calcular el precio de venta según el estado del producto y la Tabla A del enunciado.

## Archivo principal nuevo

- `src/negocio.js`: centraliza la lógica de cálculo y búsqueda.

## Qué estaba faltando antes

Antes solo existía una maqueta visual básica con cifras de ejemplo y sin conexión real con el catálogo ni con la lógica del negocio. El proyecto no tenía:

- un buscador funcional,
- validación de producto encontrado/no encontrado,
- una estructura de datos reutilizable,
- ni una capa de negocio separada para la búsqueda y el cálculo de precios.

Con esta entrega, el punto 2 queda resuelto y el proyecto ya puede buscar productos reales dentro del catálogo de RetroStock.
