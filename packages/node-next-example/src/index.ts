import path from 'node:path'
import { loadModules } from '@deephaven/jsapi-nodejs'
import type * as DhType from '@deephaven/jsapi-types'

const __dirname = import.meta.dirname
// @ts-ignore
globalThis.self = globalThis
// @ts-ignore
globalThis.window = globalThis

const tmpDir = path.join(__dirname, '..', 'tmp')

const serverUrl = new URL('http://localhost:10000')

// Download jsapi `ESM` files from DH Community server.
const { default: dhc } = await loadModules<{ default: typeof DhType }>({
  serverUrl,
  serverPaths: ['jsapi/dh-core.js', 'jsapi/dh-internal.js'],
  download: true,
  storageDir: tmpDir,
  sourceModuleType: 'esm',
})

const client = new dhc.CoreClient(serverUrl.href)
const authConfig = await client.getAuthConfigValues()

// Log supported auth types
console.log(
  'Auth handlers:',
  authConfig.map(([, type]) => type),
)
process.exit(0)
