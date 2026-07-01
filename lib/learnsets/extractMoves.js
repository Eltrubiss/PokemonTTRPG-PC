import { getBestVersion } from "./version.js";

export function extractMoves(pokemon, method) {

    const moves = [];

    for (const move of pokemon.moves) {

        const version = getBestVersion(
            move.version_group_details
        );

        if (!version) {
            continue;
        }

        if (
            version.move_learn_method.name !== method
        ) {
            continue;
        }

        if (method === "level-up") {

            moves.push({
                slug: move.move.name,
                nivel: Math.max(
                    1,
                    Math.round(version.level_learned_at / 5)
                )
            });

        } else {

            moves.push({
                slug: move.move.name
            });
        }
    }

    moves.sort((a, b) => {

        if (a.nivel !== b.nivel) {
            return a.nivel - b.nivel;
        }

        return a.slug.localeCompare(b.slug);

    });

    const vistos = new Set();
    const filtrados = [];

    for (const move of moves) {

        if (vistos.has(move.slug)) {
            continue;
        }

        vistos.add(move.slug);
        filtrados.push(move);

    }

    return filtrados;

}