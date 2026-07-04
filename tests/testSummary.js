import { getBox } from "../src/systems/PCManager.js";

const pokemon = await getBox(
    "slot1"
);

console.log(
    JSON.stringify(
        pokemon,
        null,
        2
    )
);