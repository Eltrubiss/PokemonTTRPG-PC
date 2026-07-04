import fs from "fs/promises";
import { buildSpeciesMap } from "../lib/pokemon/speciesMap.js";
import { buildStats } from "../lib/pokemon/stats.js";
import { buildTypes } from "../lib/pokemon/types.js";
import { buildAbilities } from "../lib/pokemon/abilities.js";
import { createPokemon } from "../lib/pokemon/builder.js";
import { getSpanishName } from "../lib/translator.js";
import { buildEvolutions } from "../lib/pokemon/evolutions.js";
import registry from "../lib/registry.js";
import {   
    getFormSlug,
    getFormName,
    isTemporaryForm
} from "../lib/pokemon/forms.js";
import {
    getEvolution
} from "../lib/api.js";


export async function buildPokemon() {

    console.log("Descargando Pokémon...\n");

    const speciesMap = await buildSpeciesMap();
    const pokemon = [];
    
    for (const group of speciesMap.values()){
        const baseRaw = group.base;

        if (!baseRaw) {
            console.warn(
                `La especie ${group.species.name} no tiene forma base.`
            );
            continue;
        }
        const evolutionData = await getEvolution(
            group.species.evolution_chain.url
        );
        const evoluciones = buildEvolutions(
            evolutionData.chain,
            group.species.name
        );
        const nombre = getSpanishName(
            group.species.names,
            baseRaw.name
        );
        const tipos = await buildTypes(
            baseRaw.types
        );
        const {
            normales,
            oculta
        } = await buildAbilities(
            baseRaw.abilities
        );
        const stats = buildStats(
            baseRaw.stats
        )
        const actual = createPokemon({
            poke: getSpanishName(
                group.species.names,
                baseRaw.name
            ),
            id: baseRaw.id,
            slug: group.species.name,
            nombre,
            tipos,
            habilidades:normales,
            habilidadOculta:oculta,
            evoluciones,
            stats,
            species:group.species
        })
        actual.forma = getFormSlug(
            group.species.name,
            baseRaw.name
        );
        for (const formRaw of group.forms) {
            const tipos = await buildTypes(
                formRaw.types
            );

            const {
                normales,
                oculta
            } = await buildAbilities(
                formRaw.abilities
            );

            const stats = buildStats(
                formRaw.stats
            );
            const pokemonlug = getFormSlug(
                group.species.name,
                formRaw.name
            );

            actual.formas[pokemonlug] = {

                id: formRaw.id,

                slug: pokemonlug,

                nombre: getFormName(
                    group.species.name,
                    pokemonlug),

                tipo: tipos,

                habilidades: {

                    normales,

                    oculta

                },

                stat_base: stats

            };
        }

        pokemon.push(actual);

        if (!registry.bySpecies.has(group.species.name)) {

            registry.bySpecies.set(
                group.species.name,
                []
            );

        }

        registry.bySpecies
            .get(group.species.name)
            .push(actual);

    }

    console.log("\n================================");
    console.log("Species agrupadas:", speciesMap.size);
    console.log("================================");


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