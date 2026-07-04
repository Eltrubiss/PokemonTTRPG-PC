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
        abilities,
        learnsetsLevel,
        learnsetsTM,
        learnsetsEgg,
        learnsetsTutor,
        natures

    ] = await Promise.all([

        loadJson("./data/generated/pokemon.json"),
        loadJson("./data/generated/moves.json"),
        loadJson("./data/generated/abilities.json"),
        loadJson("./data/generated/learnsets-level.json"),
        loadJson("./data/generated/learnsets-tm.json"),
        loadJson("./data/generated/learnsets-egg.json"),
        loadJson("./data/generated/learnsets-tutor.json"),
        loadJson("./data/manual/natures.json")

    ]);

    const movesBySlug = new Map(
    moves.map(move => [move.slug, move])
    );

    const abilitiesBySlug = new Map(
    abilities.map(ability => [ability.slug, ability])
    );

    const pokemonBySlug = new Map(
        pokemon.map(p => [p.slug, p])
    );

    const pokemonById = new Map(
        pokemon.map(p => [p.id, p])
    );
    const naturesBySlug = new Map(
        natures.map(nature => [nature.slug, nature])
    );

    return {

        pokemon,
        moves,
        natures,
        abilities,

        learnsets: {

            level: learnsetsLevel,
            tm: learnsetsTM,
            egg: learnsetsEgg,
            tutor: learnsetsTutor

        },

        index: {

            pokemonBySlug,
            pokemonById,
            movesBySlug,
            abilitiesBySlug,
            naturesBySlug

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

export function getAbility(db, slug){
    return db.index.abilitiesBySlug.get(slug);

}

export function getLearnset(db, slug, method = "level") {
    return db.learnsets[method].find(
        pokemon => pokemon.slug === slug
    );
    
}

export function getPokemonBySlug(db, slug) {

    return db.index.pokemonBySlug.get(slug);

}

export function getNature(db, slug) {

    return db.index.naturesBySlug.get(slug);

}