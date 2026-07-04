import fs from "/fs/promises";

export async function read(path) {
    return fs.readFile(path, "utf8");
}

export async function write(path, data) {
    return fs.writeFile(path, data, "utf8");
}

export async function exists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export async function mkdir(path) {
    return fs.mkdir(path, { recursive: true });
}

export async function remove(path) {
    return fs.rm(path, { recursive: true, force: true });
}
