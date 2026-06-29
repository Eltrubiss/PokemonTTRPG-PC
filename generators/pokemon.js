import fs from "fs/promises";
import { getSpanishName } from "../lib/translator.js";
import { buscarEvoluciones } from "../lib/evolution.js";

import {
    getPokemonList,
    getPokemon,
    getSpecies,
    getType,
    getAbility,
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

            const siguientesEvoluciones = buscarEvoluciones(
                evolutionData.chain,
                poke.name
            );

        const evoluciones = [];

        for (const siguiente of siguientesEvoluciones) {

            const detalle = siguiente.evolution_details[0];

            const evolucion = {

                id: null,

                slug: siguiente.species.name,

                name: siguiente.species.name,

                metodo: "Especial",

                nivel: null,

                requisito: null

            };

            if (detalle) {

                if (detalle.min_level) {

                    evolucion.metodo = "Nivel";

                    evolucion.nivel = Math.max(
                        1,
                        Math.round(detalle.min_level / 5)
                    );

                }

                else if (detalle.trigger?.name === "trade") {

                    evolucion.metodo = "Intercambio";

                }

                else if (detalle.trigger?.name === "use-item") {

                    evolucion.metodo = "Piedra";

                    evolucion.requisito =
                        detalle.item?.name ?? null;

                }

            }

            evoluciones.push(evolucion);

        }
            const nombre = getSpanishName(
                species.names,
                poke.name
            );

            // Tipos

            const tipos = [];

            for (const tipo of poke.types) {

                const typeData = await getType(tipo.type.url);

                const nombreTipo = getSpanishName(                   typeData.names,
                    typeData.names,
                    tipo.type.name
                    );
                
                tipos.push(nombreTipo);

            }

            // Habilidades

            const habilidades = [];

            const habilidadOculta = [];

            for (const habilidad of poke.abilities) {

                const abilityData = await getAbility(habilidad.ability.url);

                const nombreHabilidad = getSpanishName(
                    abilityData.names,
                    habilidad.ability.name
                    );

                if (habilidad.is_hidden)
                    habilidadOculta.push(nombreHabilidad);
                else
                    habilidades.push(nombreHabilidad);

            }

            // Stats

            const stats = {};

            for (const stat of poke.stats) {

                switch (stat.stat.name) {

                    case "hp":
                        stats.hp = stat.base_stat;
                        break;

                    case "attack":
                        stats.atk = stat.base_stat;
                        break;

                    case "defense":
                        stats.def = stat.base_stat;
                        break;

                    case "special-attack":
                        stats.sp_atk = stat.base_stat;
                        break;

                    case "special-defense":
                        stats.sp_def = stat.base_stat;
                        break;

                    case "speed":
                        stats.speed = stat.base_stat;
                        break;

                }

            }
            const nombre = getSpanishName(
                species.names,
                poke.name
            );

            pokemon.push({

                id: poke.id,
                slug: poke.name,
                nombre,
                tipo: tipos,
                habilidades,
                habilidad_oculta: habilidadOculta,
                stat_base: stats,
                evoluciones

            });

        }

        catch (err) {

            console.error(err.message);

        }

    }
    const pokemonPorSlug = new Map();

    for (const poke of pokemon) {

        pokemonPorSlug.set(
            poke.slug,
            poke
        );

    }
    for (const poke of pokemon) {

        for (const evolucion of poke.evoluciones) {

            const destino = pokemonPorSlug.get(
                evolucion.slug
            );

            if (!destino) {

                console.warn(
                    `No se encontró la evolución "${evolucion.slug}" para ${poke.nombre}`
                );

                continue;
            }
            evolucion.id = destino.id;

            evolucion.name = destino.name;

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