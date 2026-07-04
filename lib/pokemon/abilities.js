export async function buildAbilities( abilitiesData ) {
    const normales = [];
    const oculta = [];

    for (const habilidad of abilitiesData) {
        const slug =
            habilidad.ability.name;

        if (habilidad.is_hidden) {
            oculta.push(slug);
        } else {
            normales.push(slug);
        }
    }

    return {
        normales,
        oculta
    };

}