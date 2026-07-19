const { read } = await import("../src/storage/storage.js");

const fetchedUrls = [];

globalThis.window = {};
globalThis.document = {
    baseURI: "https://example.com/PokemonTTRPG-PC/index.html"
};
globalThis.localStorage = {
    getItem() {
        return null;
    },
    setItem() {},
    removeItem() {}
};
globalThis.fetch = async url => {
    fetchedUrls.push(String(url));

    return {
        ok: true,
        status: 200,
        text: async () => "ok"
    };
};

await import("../src/platform/browser/register.js");
await read("data/saves/slot1/pc.json");

if (fetchedUrls[0] !== "/PokemonTTRPG-PC/data/saves/slot1/pc.json") {
    throw new Error(`URL inesperada: ${fetchedUrls[0]}`);
}

console.log(fetchedUrls[0]);
