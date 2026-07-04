import { getLearnset } from "../../core/database.js";

export function resolveMoves(
    db,
    speciesSlug,
    form,
    level
) {

    const learnset = getLearnset(
        db,
        speciesSlug
    );

    if (!learnset)
        return [];

    const data =
        learnset.formas?.[form]
        ?? learnset;

    return data.moves
        .filter(
            move => move.nivel <= level
        )
        .slice(-4)
        .map(
            move => move.slug
        );

}