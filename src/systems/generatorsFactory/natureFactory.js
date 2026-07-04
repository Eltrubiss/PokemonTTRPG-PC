import { randomChoice } from "../utils/random.js";

export function resolveNature(db) {
    const nature = randomChoice(
        db.natures
    );

    return nature.slug;

}