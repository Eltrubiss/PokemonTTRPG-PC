import { configureBrowserPlatform } from "../src/platform/browser/index.js";
import {
    exists,
    read,
    remove,
    write
} from "../src/storage/storage.js";

const localData = new Map();
const fetchedUrls = [];

globalThis.localStorage = {
    getItem(key) {
        return localData.has(key) ? localData.get(key) : null;
    },
    setItem(key, value) {
        localData.set(key, String(value));
    },
    removeItem(key) {
        localData.delete(key);
    }
};

globalThis.fetch = async url => {
    fetchedUrls.push(String(url));

    return {
        ok: true,
        status: 200,
        text: async () => "Static OK"
    };
};

configureBrowserPlatform({
    assetBaseUrl: "/PokemonTTRPG-PC/"
});

await write("data/saves/browser-test.json", "Saved OK");
console.log(await exists("data/saves/browser-test.json"));
console.log(await read("data/saves/browser-test.json"));

await remove("data/saves/browser-test.json");
console.log(await exists("data/static.json"));
console.log(await read("data/static.json"));
console.log(fetchedUrls.join(","));