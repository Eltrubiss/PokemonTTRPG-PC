const STORAGE_PREFIX = "pokemon-ttrpg-pc";

let assetBaseUrl = "/";

function normalizePath(path) {
    return String(path).replace(/^\.\//, "").replace(/\\/g, "/");
}

function normalizeBaseUrl(baseUrl) {
    const value = String(baseUrl || "/");
    return value.endsWith("/") ? value : `${value}/`;
}

function getKey(path) {
    return `${STORAGE_PREFIX}:${normalizePath(path)}`;
}

function getAssetUrl(path) {
    const normalized = normalizePath(path);

    if (/^[a-z][a-z\d+.-]*:/i.test(normalized) || normalized.startsWith("/")) {
        return normalized;
    }

    return `${assetBaseUrl}${normalized}`;
}

export function configureBrowserStorage(options = {}) {
    assetBaseUrl = normalizeBaseUrl(
        options.assetBaseUrl ?? "/"
    );
}


export async function read(path) {
    const normalized = normalizePath(path);
    const saved = globalThis.localStorage.getItem(
        getKey(normalized)
    );

    if (saved !== null) {
        return saved;
    }

    const url = getAssetUrl(normalized);
    const response = await globalThis.fetch(url);

    if (!response.ok) {
        throw new Error(
            `No se pudo leer ${normalized} desde "${url}: HTTP ${response.status}`
        );
    }

    return response.text();
}

export async function write(path, data) {
    globalThis.localStorage.setItem(
        getKey(path),
        data
    );
}

export async function exists(path) {
    const normalized = normalizePath(path);

    if (globalThis.localStorage.getItem(getKey(normalized)) !== null) {
        return true;
    }

    try {
        const response = await globalThis.fetch(
            getAssetUrl(normalized),
            { method: "HEAD" }
        );

        return response.ok;
    } catch {
        return false;
    }
}

export async function mkdir() {
    return undefined;
}

export async function remove(path) {
    globalThis.localStorage.removeItem(
        getKey(path)
    );
}
