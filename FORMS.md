# Forms.js

`forms.js` centraliza todas las reglas relacionadas con las formas de los Pokémon.

Su objetivo es que la lógica sobre las formas exista en un único lugar del proyecto, evitando repartir reglas entre la Factory, el Combate, el PC o el Editor de Pokémon.

---

# Tipos de formas

Cada especie pertenece a una de las siguientes categorías.

## Fixed

La especie posee una única forma permanente.

No requiere ninguna regla especial y utiliza la forma `"normal"`.

### Ejemplos

* Pikachu
* Charizard
* Lucario

---

## Determined

La forma se determina automáticamente utilizando un atributo del propio Pokémon.

No existe una elección por parte del jugador.

Actualmente el único atributo utilizado es el sexo.

### Ejemplos

* Meowstic
  * Macho → normal
  * Hembra → female
* Oinkologne
  * Macho → normal
  * Hembra → female

---

## Choice

La especie posee varias formas permanentes.

La forma se elige una única vez (por el Director de Juego, el jugador o aleatoriamente al generar un Pokémon salvaje).

Una vez elegida, no vuelve a cambiar automáticamente.

### Ejemplos

* Lycanroc
* Wormadam

---

## Switch

La especie puede alternar libremente entre varias formas permanentes.

La aplicación puede ofrecer un botón para cambiar entre ellas.

No depende del combate.

### Ejemplos

* Rotom
* Giratina
* Shaymin
* Hoopa

---

## Mutable

La especie cambia automáticamente de forma debido a una mecánica del juego.

El jugador no selecciona manualmente la forma.

Generalmente estos cambios ocurren durante el combate.

### Ejemplos

* Aegislash
* Wishiwashi
* Morpeko
* Palafin
* Minior

---

## Temporary

Transformaciones temporales que no modifican permanentemente al Pokémon.

Estas formas nunca deben guardarse en el SaveManager.

### Ejemplos

* Mega Evolución
* Gigamax
* Teracristalización

---

# Responsabilidades de forms.js

`forms.js` únicamente describe cómo funcionan las formas.

No debe:

* decidir una forma aleatoria;
* ejecutar reglas del combate;
* modificar Pokémon.

Su única responsabilidad es describir el comportamiento de las formas de cada especie.

---

# Responsabilidades de otros sistemas

## Pokémon Factory

* Crear Pokémon.
* Elegir aleatoriamente una forma cuando corresponda.
* Resolver las reglas de creación.

## Sistema de Combate

* Gestionar los cambios automáticos de las formas mutables.
* Aplicar y eliminar transformaciones temporales.

## PC / Editor de Pokémon

* Mostrar las formas disponibles.
* Permitir cambiar las formas intercambiables.

## Director de Juego

* Elegir las formas permanentes cuando la historia lo requiera (por ejemplo, la evolución de Rockruff a Lycanroc).

---

# Filosofía del proyecto

Las reglas sobre las formas pertenecen a `forms.js`.

Las decisiones pertenecen a los sistemas que utilizan esas reglas.

De esta manera, toda la aplicación consulta una única fuente de información y cada módulo mantiene una única responsabilidad.
