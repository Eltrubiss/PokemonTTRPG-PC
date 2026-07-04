import { exists, mkdir, read, write } from "../storage/storage.js";
import { dirname, joinPath } from "../storage/paths.js";
import { SAVES_PATH } from "../core/paths.js";

function getPokemonPath( slot,uid ) {
    return joinPath(
        SAVES_PATH,
        slot,
        "pokemon",
        `${uid}.json`
    );
}

export async function savePokemon( slot,pokemon ) {

    const file = getPokemonPath(
        slot,
        pokemon.uid
    );

    await mkdir(
        dirname(file)
    );

    await write(
        file,
        JSON.stringify(
            pokemon,
            null,
            2
        )
    );

}

export async function loadPokemon(
    slot,
    uid
) {

    const file = getPokemonPath(
        slot,
        uid
    );

    const text =
        await read(
            file
        );

    return JSON.parse(text);

}

export async function pokemonExists(
    slot,
    uid
) {
    return exists(
        getPokemonPath(
            slot,
            uid
        )
    );
}