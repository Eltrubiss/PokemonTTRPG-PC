import "../src/platform/node/register.js";
import path from "path";
import {
    exists,
    mkdir,
    read,
    remove,
    write
} from "../src/storage/storage.js";

const dir = path.join(
    "data",
    "tmp",
    "storage-test"
);
const file = path.join(
    dir,
    "sample.txt"
);

await remove(dir);
console.log(await exists(file));

await mkdir(dir);
await write(file, "Storage OK");

console.log(await exists(file));
console.log(await read(file));

await remove(dir);
console.log(await exists(file));
