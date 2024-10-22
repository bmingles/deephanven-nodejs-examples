import path from "node:path";

// @ts-ignore
globalThis.self = globalThis;
// @ts-ignore
globalThis.window = globalThis;

import { loadModules } from "@deephaven/jsapi-nodejs";

const tmpDir = path.join(__dirname, "..", "tmp");

async function main() {
  // Download jsapi `ESM` files from DH Community server and export as `CJS` module.
  const dhc = await loadModules({
    serverUrl: new URL("http://localhost:10000"),
    serverPaths: ["jsapi/dh-core.js", "jsapi/dh-internal.js"],
    download: true,
    storageDir: tmpDir,
    sourceModuleType: "esm",
    targetModuleType: "cjs", // transpile to CommonJS
  });
}

main();
