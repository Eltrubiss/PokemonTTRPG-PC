import { setStorageAdapter } from "../../storage/storage.js";
import * as nodeStorage from "./nodeStorage.js";

export function configureNodePlatform() {
    setStorageAdapter(nodeStorage);
}

export { nodeStorage };