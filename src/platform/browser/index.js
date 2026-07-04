import { setStorageAdapter } from "../../storage/storage.js";
import * as browserStorage from "./browserStorage.js";

export function configureBrowserPlatform(options = {}) {
    browserStorage.configureBrowserStorage(options);
    setStorageAdapter(browserStorage);
}

export { browserStorage };