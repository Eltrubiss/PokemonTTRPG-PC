import { randomChoice } from "../utils/random.js";

export function resolveAbility(
    species,
    {
        hidden = false
    } = {}

) {
    const pool = [ ...species.habilidades.normales ];

    if ( hidden && species.habilidades.oculta ) {
        pool.push( ...species.habilidades.oculta  );
    }

    return randomChoice(pool);

}