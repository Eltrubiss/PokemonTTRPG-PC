import fs from "fs/promises";

async function loadJson(path) {

    return JSON.parse(

        await fs.readFile(path, "utf8")

    );

}

export async function loadDatabase() {
    const [

        pokemon,

        moves,

        learnsetsLevel,

        learnsetsTM,

        learnsetsEgg,

        learnsetsTutor

    ] = await Promise.all([

        loadJson("./data/generated/pokemon.json"),

        loadJson("./data/generated/moves.json"),

        loadJson("./data/generated/learnsets-level.json"),

        loadJson("./data/generated/learnsets-tm.json"),

        loadJson("./data/generated/learnsets-egg.json"),

        loadJson("./data/generated/learnsets-tutor.json")

    ]);

    const movesBySlug = new Map(
    moves.map(move => [move.slug, move])
    );

    const pokemonBySlug = new Map(
        pokemon.map(p => [p.slug, p])
    );

    const pokemonById = new Map(
        pokemon.map(p => [p.id, p])
    );

    return {

        pokemon,
        moves,

        learnsets: {

            level: learnsetsLevel,
            tm: learnsetsTM,
            egg: learnsetsEgg,
            tutor: learnsetsTutor

        },

        index: {

            pokemonBySlug,
            pokemonById,
            movesBySlug

        }

    };

}

export function getPokemon(db, slug) {
    return db.index.pokemonBySlug.get(slug);
}

export function getPokemonById(db, id) {
    return db.index.pokemonById.get(Number(id));
}

export function getMove(db, slug) {
    return db.index.movesBySlug.get(slug);
}

export function getLearnset(db, slug, method = "level") {
    return db.learnsets[method].find(
        pokemon => pokemon.slug === slug
    );
}

export function getPokemonBySlug(db, slug) {

    return db.index.pokemonBySlug.get(slug);

}