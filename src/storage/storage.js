const requiredMethods = [
    "read",
    "write",
    "exists",
    "mkdir",
    "remove"
];

let adapter = null;

function assertAdapter(candidate) {
    for (const method of requiredMethods) {
        if (typeof candidate?.[method] !== "function") {
            throw new Error(
                `StorageAdapter inválido: falta el método ${method}()`
            );
        }
    }
}

function getAdapter() {
    if (!adapter) {
        throw new Error(
            "StorageAdapter no configurado. Registra una plataforma antes de usar el motor."
        );
    }

    return adapter;
}

export function setStorageAdapter(candidate) {
    assertAdapter(candidate);
    adapter = candidate;
}

export function getStorageAdapter() {
    return getAdapter();
}

export async function read(path) {
    return getAdapter().read(path);
}

export async function write(path, data) {
    return getAdapter().write(path, data);
}

export async function exists(path) {
    return getAdapter().exists(path);
}

export async function mkdir(path) {
    return getAdapter().mkdir(path);
}

export async function remove(path) {
    return getAdapter().remove(path);
}