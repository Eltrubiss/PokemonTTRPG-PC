export function joinPath(...parts) {
    return parts
        .filter(part => part !== undefined && part !== null && part !== "")
        .map(part => String(part).replace(/^\/+|\/+$/g, ""))
        .filter(part => part.length > 0)
        .join("/");
}

export function dirname(path) {
    const normalized = String(path).replace(/\\/g, "/");
    const index = normalized.lastIndexOf("/");

    if (index === -1) {
        return ".";
    }

    return normalized.slice(0, index);
}
