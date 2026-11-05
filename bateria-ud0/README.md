# DWEC · Batería 0: programar desde cero

**Opcional** y **no cuenta para la nota**. Es para aprender a programar desde el principio, a tu ritmo: de
`console.log` a una aplicación web que recuerda sus datos. Con esto tienes la base de las prácticas.

Todo va con `docker compose`: Node y Vite van dentro del contenedor y en tu ordenador no se instala nada más.

```bash
docker compose run --rm web npm install            # 1 vez, con internet
docker compose run --rm web npm run comprobar 0    # comprueba el nivel 0 (cambia el número por tu nivel)
docker compose run --rm web npm run ejecutar 0     # ejecuta tu programa del nivel 0 y enseña lo que muestra
docker compose run --rm web npm run probar "2 + 3" # ejecuta un trozo de código y enseña lo que da
docker compose run --rm web npm run comprobar      # todos los niveles, con el resumen
docker compose up                                  # la página en http://localhost:5173 (Ctrl+C para pararla)
```

1. Lee la explicación de cada nivel en la web de DWEC: **Practicar → Batería 0 · Programar desde cero**.
2. Haz los ejercicios de `src/nivel00`, `src/nivel01`… **en orden**. Cada fichero te dice qué hacer.
3. Cada vez que un ejercicio salga en verde, **guárdalo en Git** con un commit que empiece por su número:

   ```bash
   git add .
   git commit -m "N3.2: signo con if, else if y else"
   git push
   ```

4. ¿Atascado? Primero `npm run comprobar N` (te da una pista 💡 en cada ejercicio). Después, las pistas plegadas de
   la web («🆘 ¿Atascado?»). Y si sigues sin verlo, pregunta en clase: **atascarse es parte de aprender**.
5. Al terminar, contesta `respuestas.md`.
