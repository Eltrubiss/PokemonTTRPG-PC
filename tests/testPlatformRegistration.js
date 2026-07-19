import assert from "node:assert/strict";
import "../src/platform/browser/register.js";
import { read } from "../src/storage/storage.js";

const contents = await read("./package.json");
assert.match(contents, /"name": "pokemonttrpg-pc"/);
console.log("Platform registration works in Node.");
