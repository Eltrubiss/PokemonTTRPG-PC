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

function getBrowserAssetBaseUrl() {
    if (typeof document !== "undefined" && document.baseURI) {
        return new URL("./", document.baseURI).pathname;
    }

    if (typeof location !== "undefined") {
        return new URL("./", location.href).pathname;
    }

    return "/";
}

if (typeof window !== "undefined" || hasBrowserStorage()) {
    configureBrowserPlatform({
        assetBaseUrl: getBrowserAssetBaseUrl()
    });
} else {
    configureNodePlatform();
}
