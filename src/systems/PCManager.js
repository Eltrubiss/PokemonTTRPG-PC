import fs from "fs/promises";
import path from "path";
import { BOX_SIZE } from "../core/constants.js";
import { SAVES_PATH } from "../core/paths.js";
import { loadPokemon } from "./pokemonStorage.js";

function getPCPath(slot) {

    return path.join(
        SAVES_PATH,
        slot,
        "pc.json"
    );
}

function createDefaultPC() {

    return {
        currentBox: 0,
        boxes: [{
                name: "Caja 1",
                pokemon: []

            }]
    };

}

export async function loadPC(slot) {

    const file = getPCPath(slot);
    try {

        const text = await fs.readFile(
            file,
            "utf8"
        );

        return JSON.parse(text);

    } catch {
        const pc = createDefaultPC();
        await fs.mkdir(
            path.dirname(file),
            { recursive: true }
        );

        await fs.writeFile(
            file,
            JSON.stringify(
                pc,
                null,
                2
            ),
            "utf8"
        );

        return pc;
    }
}

export async function savePC( slot, pc ) {

    const file = getPCPath(slot);

    await fs.mkdir(
        path.dirname(file),
        { recursive: true }
    );

    await fs.writeFile(
        file,
        JSON.stringify(
            pc,
            null,
            2
        ),
        "utf8"
    );
}

export async function addPokemon( slot, uid ) {

    const pc = await loadPC(
        slot
    );

    for (const box of pc.boxes) {
        if ( box.pokemon.includes(uid) ) {
            return false;
        }

        if ( box.pokemon.length < BOX_SIZE ) {
            box.pokemon.push(uid);
            await savePC(
                slot,
                pc
            );

            return true;
        }
    }

    pc.boxes.push({
        name: `Caja ${pc.boxes.length + 1}`,
        pokemon: [ uid ]

    });

    await savePC(
        slot,
        pc
    );

    return true;

}

export async function getBox( slot, box = 0 ) {
    const pc = await loadPC(slot);
    const currentBox = pc.boxes[box];

    if (!currentBox) {
        return [];
    }

    return await Promise.all(
        currentBox.pokemon.map(
            uid => loadPokemon(
                slot,
                uid
            )
        )
    );
}