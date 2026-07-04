import { randomChoice } from "../utils/random.js";
import { getNature } from "../../core/database.js";

export function resolveTrait(
    db,
    natureSlug
) {

    const nature = getNature(
        db,
        natureSlug
    );

    if (!nature)
        return null;

    return randomChoice(
        nature.rasgos
    ).slug;

}