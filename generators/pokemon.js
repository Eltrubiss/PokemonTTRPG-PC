import fs from "fs/promises";
import { buildStats } from "../lib/pokemon/stats.js";
import { buildTypes } from "../lib/pokemon/types.js";
import { buildAbilities } from "../lib/pokemon/abilities.js";
import { createPokemon } from "../lib/pokemon/builder.js";
import { getSpanishName } from "../lib/translator.js";
import { buildEvolutions } from "../lib/pokemon/evolutions.js";
import registry from "../lib/registry.js";

import {
    getPokemonList,
    getPokemon,
    getSpecies,
    getEvolution
} from "../lib/api.js";


export async function buildPokemon() {

    console.log("Descargando Pokémon...\n");

    const lista = await getPokemonList();
    const pokemon = [];

    for (const entry of lista.results) {

        console.log(entry.name);
        try {

            const poke = await getPokemon(entry.url);

            const species = await getSpecies(poke.species.url);
            const evolutionData = await getEvolution(
                species.evolution_chain.url
            );

            const evoluciones = buildEvolutions(
                evolutionData.chain,
                poke.name
            );

            const nombre = getSpanishName(
                species.names,
                poke.name
            );

            const tipos = await buildTypes(
                poke.types
            );

            const {
                normales,
                oculta
            } = await buildAbilities(
                poke.abilities
            );

            const stats = buildStats(
                poke.stats
            )

            pokemon.push(
                createPokemon({
                    poke,
                    nombre,
                    tipos,
                    habilidades:normales,
                    habilidadOculta:oculta,
                    evoluciones,
                    stats,
                    species
                })
            );

            const actual = pokemon[pokemon.length - 1];

            if (!registry.bySpecies.has(species.name)) {

                registry.bySpecies.set(
                    species.name,
                    []
                );

            }

            registry.bySpecies
                .get(species.name)
                .push(actual);

        }

        catch (err) {

            console.error(err.message);

        }

    }

    for (const poke of pokemon) {

        registry.byId.set(
            poke.id,
            poke
        );

        registry.bySlug.set(
            poke.slug,
            poke
        );

    }

    for (const poke of pokemon) {
        for (const evolucion of poke.evoluciones) {

            let destino = registry.bySlug.get(
                evolucion.slug
            );

            if (!destino) {
                const formas = registry.bySpecies.get(
                    evolucion.slug
                );
                if (formas?.length > 0) {
                    destino = formas[0];
                }
            }

            if (destino) {
                evolucion.id = destino.id;
                evolucion.nombre = destino.nombre;

            } else {

                console.warn(
                    `No se encontró la evolución "${evolucion.slug}" para ${poke.nombre}`
                );
            }
        }
    }
    
    pokemon.sort((a, b) => a.id - b.id);

    await fs.mkdir("./data", { recursive: true });

    await fs.writeFile(
        "./data/generated/pokemon.json",
        JSON.stringify(pokemon, null, 2),
        "utf8"
    );

    console.log(`\n✔ ${pokemon.length} Pokémon generados.`);

}