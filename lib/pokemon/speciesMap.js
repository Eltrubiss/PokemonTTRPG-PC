import {
    getPokemonList,
    getPokemon,
    getSpecies
} from "../api.js";

export async function buildSpeciesMap() {
    const lista = await getPokemonList();
    const speciesMap = new Map();

    for (const entry of lista.results) {
        console.log(entry.name);

        try {
            const pokemon = await getPokemon(entry.url);
            const species = await getSpecies(pokemon.species.url);
            const speciesSlug = species.name;

            if (!speciesMap.has(speciesSlug)) {
                speciesMap.set(speciesSlug, {
                        slug: speciesSlug,
                        species,
                        base: null,
                        forms: []
                    }
                );
            }

            const group = speciesMap.get(speciesSlug);
            if (pokemon.is_default) {
                group.base = pokemon;
            }
            group.forms.push(pokemon);
        }
        catch (err) {
            console.error(
                entry.name,
                err.message
            );
        }
    }

    for (const group of speciesMap.values()) {

        if (!group.base) {

            console.warn(
                `La especie ${group.slug} no tiene forma base.`
            );

        }

    }

    return speciesMap;

}