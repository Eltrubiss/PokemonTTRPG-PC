let fsPromises = null;

async function getFileSystem() {
    fsPromises ??= import("node:fs/promises");
    return fsPromises;
}

export async function read(path) {
    const fs = await getFileSystem();
    return fs.readFile(path, "utf8");
}

export async function write(path, data) {
    const fs = await getFileSystem();
    return fs.writeFile(path, data, "utf8");
}

export async function exists(path) {
    const fs = await getFileSystem();

    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export async function mkdir(path) {
    const fs = await getFileSystem();
    return fs.mkdir(path, { recursive: true });
}

export async function remove(path) {
    const fs = await getFileSystem();
    return fs.rm(path, { recursive: true, force: true });
}
