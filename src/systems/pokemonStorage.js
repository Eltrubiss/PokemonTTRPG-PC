import fs from "fs/promises";
import path from "path";
import { SAVES_PATH } from "../core/paths.js";

function getPokemonPath( slot,uid ) {
    return path.join(
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

    await fs.mkdir(
        path.dirname(file),
        { recursive: true }
    );

    await fs.writeFile(
        file,
        JSON.stringify(
            pokemon,
            null,
            2
        ),

        "utf8"

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
        await fs.readFile(
            file,
            "utf8"
        );

    return JSON.parse(text);

}

export async function pokemonExists(
    slot,
    uid
) {

    try {

        await fs.access(
            getPokemonPath(
                slot,
                uid
            )
        );

        return true;

    } catch {

        return false;

    }

}