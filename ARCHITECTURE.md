# Objetivos

El proyecto tiene tres responsabilidades.

1. Obtener información de PokéAPI.
2. Traducirla al español.
3. Adaptarla al sistema del TTRPG.

# Estructura de datos

generated/

Datos obtenidos directamente de PokéAPI.

Nunca deben modificarse manualmente.

manual/

Contiene modificaciones específicas del TTRPG.

Nunca son sobrescritas.

dist/

Resultado final.

Es la única carpeta utilizada por la página web.

# Slugs

Todos los enlaces internos utilizan slugs.

Los IDs solo se utilizan para mantener compatibilidad con PokéAPI.

Nunca deben utilizarse como referencia entre archivos.

# Sistema de parches

El proyecto nunca modifica datos generados.

Toda modificación realizada para el TTRPG vive en manual/.

El compilador fusiona ambos mundos para generar dist/.

# Reglas del código

Toda la lógica reutilizable vive en lib/.

Los builders únicamente descargan y construyen datos.

Nunca contienen lógica específica del TTRPG.

# Reglas de nomenclatura

Variables del dominio:

nombre

tipo

habilidades

evoluciones

En español.

Variables técnicas:

Map

Promise

fetch

registry

En inglés.
