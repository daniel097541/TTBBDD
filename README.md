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
* **CONSULTA 3: ¿Quién es el personaje más poderoso?:** ``Dame el héroe con más poderes``

* **CONSULTA 5: ¿Quién nos salvará del coronavirus?:** ``Busca todos los personajes que tienen DOCTOR en el nombre``
* **CONSULTA 6: Las chicas son guerreras:** ``Busca todos los personajes femeninos ordenados por la cantidad de poderes que tienen``
* **CONSULTA 7: Malos héroes:** ``Busca todos los heroes que hayan sido villanos en un crossover``


* **Buscador de villanos:** ``Busca todos los villanos que comparten comic con un personaje``


* **Mejor héroe vs mejor villano:** ``¿Quién ganaría si el villano mas poderoso se enfrentase al heroe mas poderoso?``
* **Couple goals:** ``¿Quién es el personaje que más se ha encontrado con un héroe?``
* **Amigos para siempre:** ``Dame los amigos (misma alineacion) que tiene un personaje en un comic``

* **El comic de los vigorexicos:** ``Saca de una muestra aleatoria de 1000 comics, el que tiene los personajes con mas fuerza``

#### COMPLEJAS
* **CONSULTA 4: ¿Quién es el héroe con mejores estadísticas?:** ``Dame el héroe con mejores estadísticas de un comic``

### RANKING QUERIES
* **Top 10: Los personajes con más poderes:** ``Top 5 de personajes con más número de poderes ``
* **Top 10: Las chicas más populares:** ``Top 10 de personajes femeninos con más apariciones``
* **Top 5: Los héroes más populares:** ``Top 5 de héroes con más apariciones``
* **Top 5: Los villanos más populares:** ``Top 5 de villanos con más apariciones``
* **Top 5: Ni héroes ni villanos más populares:** ``Top 5 de personajes con alignment neutro con más apariciones``


### METADATA QUERIES
* **Número de personajes:** ``Número de personajes en BD ``
* **Número de comics:** ``Número de comics en BD``
* **Número de personajes con "crossover" info:** ``Número de personajes que no tienen el campo crossover vacío``
* **Número de personajes con "info" info:** ``Número de personajes que tienen información extra en el campo info``
* **Número de personajes con "powers" info:** ``Número de personajes que tienen información sobre sus poderes``
* **Número de personajes con "stats" info:** ``Número de personajes que tienen información sobre sus características de batalla``
* **Promedio de poderes por personaje:** ``Media de número de poderes por personajes``
* **Promedio de apariciones por personaje:** ``Media de número de apariciones por personaje``

