import { configureBrowserPlatform } from "./index.js";
import { configureNodePlatform } from "../node/index.js";

function hasBrowserStorage() {
    const storage = globalThis.localStorage;

    return Boolean(
        storage &&
        typeof storage.getItem === "function" &&
        typeof storage.setItem === "function" &&
        typeof storage.removeItem === "function"
    );
}

if (typeof window !== "undefined" || hasBrowserStorage()) {
    configureBrowserPlatform();
} else {
    configureNodePlatform();
}
