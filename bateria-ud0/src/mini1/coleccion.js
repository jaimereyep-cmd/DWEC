// ═══════════════════════════════════════════════════════════════════════════════════════════
//  🏁 MINI-PROYECTO 1 · Mi colección
//  Explicación: web de DWEC → Practicar → Batería 0 → Mini-proyecto 1
//  Comprobar: docker compose run --rm web npm run comprobar m1        Ejecutar: npm run ejecutar m1
// ═══════════════════════════════════════════════════════════════════════════════════════════
// Tu colección de lo que TÚ quieras: videojuegos, series, canciones, jugadores, zapatillas, recetas…
// Juntas todo lo de los niveles 1 a 8. El comprobador prueba tus funciones con SUS datos, así que el tema da igual.
// Este fichero es tuyo: lo usarás otra vez en el mini-proyecto 2, para hacer la página web de tu colección.

// ✍️ M1.1 · Tus datos: al menos 6 elementos y al menos 2 categorías distintas. Cada elemento, con esta forma EXACTA:
//           { nombre: "texto", categoria: "texto", anio: número, puntuacion: número de 0 a 10 }
export const coleccion = [
  // { nombre: "…", categoria: "…", anio: 2020, puntuacion: 8 },
];

// ✍️ M1.2 · titulos(lista): los nombres de todos los elementos, en el mismo orden.

// ✍️ M1.3 · deCategoria(lista, categoria): solo los elementos de esa categoría.

// ✍️ M1.4 · mejor(lista): el elemento con la puntuación más alta (si hay empate, el primero). Si la lista está vacía, undefined.

// ✍️ M1.5 · mediaPuntuacion(lista): la media de las puntuaciones, redondeada a 1 decimal. Vacía → 0.
//           Redondear a 1 decimal: Math.round(x * 10) / 10

// ✍️ M1.6 · ficha(elemento): "Hades (2020) · acción · ★ 10"

// ✍️ M1.7 · resumen(lista): un objeto con el total de elementos, cuántos hay por categoría y la media. USA tus funciones.
//           → { total: 6, porCategoria: { construcción: 2, deportes: 2, acción: 2 }, media: 8 }

// Para verla: docker compose run --rm web npm run ejecutar m1
// (cuando tengas hecha ficha, quita las // de la línea de abajo)
// for (const e of coleccion) console.log(ficha(e));
