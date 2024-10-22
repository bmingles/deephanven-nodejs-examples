import path from "node:path";
import { loadModules } from "@deephaven/jsapi-nodejs";

const __dirname = import.meta.dirname;
// @ts-ignore
globalThis.self = globalThis;
// @ts-ignore
globalThis.window = globalThis;

const tmpDir = path.join(__dirname, "..", "tmp");

// Download jsapi `ESM` files from DH Community server.
const dhc = await loadModules({
  serverUrl: new URL("http://localhost:10000"),
  serverPaths: ["jsapi/dh-core.js", "jsapi/dh-internal.js"],
  download: true,
  storageDir: tmpDir,
  sourceModuleType: "esm",
});
