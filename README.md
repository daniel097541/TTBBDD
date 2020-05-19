# TTBBDD
Práctica de Tecnologías de Bases de Datos. Grupo 6.


# Preview de la practica
http://ec2-15-236-90-35.eu-west-3.compute.amazonaws.com:3000/#/home

## HOW TO

Partiendo siempre de la raíz del proyecto.

* **Instalar dependencias:**: `npm run full-install`
* **Levantar backend**: `npm run start-backend`
* **Levantar frontend**: `npm run start-frontend`
* **Correr script de volcado de datos en mongo**: `npm run dump-data`

## QUERIES

### GENERAL QUERIES
#### SENCILLAS
* **CONSULTA 1: ¿Quién es el más gordo?:** ``Dame el personaje mas gordo de todos``
* **CONSULTA 2: ¿Quién es el más alto?:** ``Dame el personaje mas alto de todos``
* **CONSULTA 3: ¿Quién es el héroe más poderoso?:** ``Dame el héroe con más poderes``
* **CONSULTA 4: ¿Quién nos salvará del coronavirus?:** ``Busca todos los personajes que tienen DOCTOR en el nombre``
* **CONSULTA 5: Las chicas más populares:** ``Top 10 de personajes femeninos con más apariciones``
* **CONSULTA 6: Las chicas son guerreras:** ``Busca todos los personajes femeninos ordenados por la cantidad de poderes que tienen``
* **CONSULTA 7: Malos héroes:** ``Busca todos los heroes que hayan sido villanos en un crossover``
* **CONSULTA 8: El villano más listo:** ``Busca al personaje villano con más puntos de inteligencia``
* **CONSULTA 9: El héroe más tonto:** ``Busca al personaje héroe con menos puntos de inteligencia``
* **CONSULTA 10: Los más poderosos:** ``Top 10 de personajes más poderosos``
* **CONSULTA 11: Los que más aparecen por alignment:** ``Top 5 de personajes que más apariciones tienen separados por su alignment``

#### COMPLEJAS
* **CONSULTA 12: ¿Quién es el héroe con mejores estadísticas del cómic?:** ``Dado un comic, busca el héroe con mejores estadísticas``
* **CONSULTA 13: El comic de los vigoréxicos:** ``De una muestra aleatoria de 1000 comics, obtiene el cómic que tiene los héroes más fuertes`` 
* **CONSULTA 14: Buscador de villanos:** ``Busca todos los villanos que comparten comic con un personaje``


### METADATA QUERIES
* **Número de personajes:** ``Número de personajes en BD ``
* **Número de comics:** ``Número de comics en BD``
* **Número de personajes con "crossover" info:** ``Número de personajes que no tienen el campo crossover vacío``
* **Número de personajes con "info" info:** ``Número de personajes que tienen información extra en el campo info``
* **Número de personajes con "powers" info:** ``Número de personajes que tienen información sobre sus poderes``
* **Número de personajes con "stats" info:** ``Número de personajes que tienen información sobre sus características de batalla``
* **Promedio de poderes por personaje:** ``Media de número de poderes por personajes``
* **Promedio de apariciones por personaje:** ``Media de número de apariciones por personaje``

