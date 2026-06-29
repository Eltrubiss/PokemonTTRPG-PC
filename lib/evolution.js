export function buscarEvoluciones(chain, pokemonActual) {

    if (chain.species.name !== pokemonActual) {

        for (const siguiente of chain.evolves_to) {

            const resultado = buscarEvoluciones(
                siguiente,
                pokemonActual
            );

            if (resultado.length > 0)
                return resultado;

        }

        return [];

    }

    return chain.evolves_to;

}