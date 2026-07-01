import cache from "./cache.js";

const API = "https://pokeapi.co/api/v2";

// ---------- MOVIMIENTOS ----------

export async function getMoveList() {
    const response = await fetch(`${API}/move?limit=10000`);

    if (!response.ok)
        throw new Error("No se pudo obtener la lista de movimientos.");

    return response.json();
}

export async function getMove(url) {
    const response = await fetch(url);

    if (!response.ok)
        throw new Error(`Error descargando movimiento.`);

    return response.json();
}

// ---------- POKÉMON ----------

export async function getPokemonList() {
    const response = await fetch(`${API}/pokemon?limit=10000`);

    if (!response.ok)
        throw new Error("No se pudo obtener la lista de Pokémon.");

    return response.json();
}

export async function getPokemon(url) {
    const response = await fetch(url);

    if (!response.ok)
        throw new Error("No se pudo descargar un Pokémon.");

    return response.json();
}

export async function getSpecies(url){

    if(cache.species.has(url)){

        return cache.species.get(url);

    }

    const response = await fetch(url);

    if(!response.ok)
        throw new Error("Error descargando especie.");

    const data = await response.json();

    cache.species.set(url,data);

    return data;

}

export async function getEvolution(url){

    if(cache.evolutions.has(url)){

        return cache.evolutions.get(url);

    }

    const response = await fetch(url);

    if(!response.ok)
        throw new Error("Error descargando evolución.");

    const data = await response.json();

    cache.evolutions.set(url,data);

    return data;

}

export async function getType(url){

    if(cache.type.has(url)){

        return cache.type.get(url);

    }

    const response = await fetch(url);

    if(!response.ok)
        throw new Error("Error descargando tipo.");

    const data = await response.json();

    cache.type.set(url,data);

    return data;

}

export async function getAbility(url){

    if(cache.abilities.has(url)){

        return cache.abilities.get(url);

    }

    const response = await fetch(url);

    if(!response.ok)
        throw new Error("Error descargando habilidad.");

    const data = await response.json();

    cache.abilities.set(url,data);

    return data;

}

export async function getAbilityList() {

    const response = await fetch(
        `${API}/ability?limit=10000`
    );

    if (!response.ok)
        throw new Error(
            "No se pudo obtener la lista de habilidades."
        );

    return response.json();

}