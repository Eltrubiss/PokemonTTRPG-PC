const API = "https://pokeapi.co/api/v2";

export async function getMoveList() {
    const response = await fetch(`${API}/move?limit=10000`);

    if (!response.ok)
        throw new Error("No se pudo obtener la lista de movimientos.");

    return response.json();
}

export async function getMove(id) {
    const response = await fetch(`${API}/move/${id}`);

    if (!response.ok)
        throw new Error(`Error descargando movimiento ${id}`);

    return response.json();
}

export async function getType(url) {
    const response = await fetch(url);

    if (!response.ok)
        throw new Error("Error descargando tipo.");

    return response.json();
}