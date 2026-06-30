import { getAbility } from "../api.js";
import { getSpanishName } from "../translator.js";

export async function buildAbilities(abilitiesData) {

    const normales = [];
    const oculta = [];

    for (const habilidad of abilitiesData) {

        const abilityData = await getAbility(
            habilidad.ability.url
        );
        const nombre = getSpanishName(
            abilityData.names,
            habilidad.ability.name
        );
        if (habilidad.is_hidden) {
            oculta.push(nombre);
        } else {
            normales.push(nombre);
        }
    }

    return {
        normales,
        oculta
    };
}