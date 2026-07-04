import { createPokemon }
from "../src/models/pokemon.js";

const pikachu = createPokemon(
    "pikachu",
    {
        nivel: 5,
        sexo: "M",
        habilidad: "static",
        movimientos: [
            "thundershock",
            "growl"
        ]
    }
);

console.log(pikachu);