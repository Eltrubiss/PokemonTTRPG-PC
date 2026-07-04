import { joinPath } from "../storage/paths.js";

export const DATA_PATH = "data";

export const GENERATED_PATH = joinPath(
    DATA_PATH,
    "generated"
);

export const MANUAL_PATH = joinPath(
    DATA_PATH,
    "manual"
);

export const SAVES_PATH = joinPath(
    DATA_PATH,
    "saves"
);