export function createPokemon({

    poke,
    slug,
    nombre,
    tipos,
    habilidades,
    habilidadOculta,
    evoluciones,
    stats,
    species

}) {
    return {
        id: poke.id,
        slug: slug ?? poke.name,
        nombre,
        tipo: tipos,
        habilidades: {
            normales: habilidades,
            oculta: habilidadOculta
        },
        genero: {
            macho:
                species.gender_rate === -1
                    ? null
                    : ((8 - species.gender_rate) / 8) * 100,
            hembra:
                species.gender_rate === -1
                    ? null
                    : (species.gender_rate / 8) * 100
        },
        formas: {},
        evoluciones,
        stat_base: stats

    };

}