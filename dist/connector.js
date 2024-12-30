var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Connector_process, _Connector_transformer;
import { platform } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import { Transform } from "node:stream";
const __dirname = dirname(fileURLToPath(import.meta.url));
/** @type {Record<string, string>} */
const connectors = {
    "darwin-keynote": "connectors/connector-osx-kn5.sh",
    "darwin-keynote5": "connectors/connector-osx-kn5.sh",
    "darwin-keynote6": "connectors/connector-osx-kn6.sh",
    "darwin-powerpoint": "connectors/connector-osx-ppt2011.sh",
    "darwin-powerpoint2011": "connectors/connector-osx-ppt2011.sh",
    "darwin-powerpoint2016": "connectors/connector-osx-ppt2011.sh",
    "win32-powerpoint": "connectors/connector-win-ppt2010.bat",
    "win32-powerpoint2010": "connectors/connector-win-ppt2010.bat",
    "win32-powerpoint2013": "connectors/connector-win-ppt2010.bat",
};
/**
 * @typedef {Object} ConnectorResponse
 * @property {string} [error]
 * @property {any} [response]
 */
export class Connector {
    /**
     * @param {string} application
     */
    constructor(application) {
        /** @type {import('execa').ExecaChildProcess} */
        _Connector_process.set(this, void 0);
        /** @type {Transform} */
        _Connector_transformer.set(this, void 0);
        const id = `${platform()}-${application}`;
        const connectorPath = connectors[id];
        if (!connectorPath) {
            throw new Error(`Unsupported platform/application combination: ${id}`);
        }
        const filename = join(__dirname, connectorPath);
        __classPrivateFieldSet(this, _Connector_process, execa(filename, [], {
            stdio: ["pipe", "pipe", "inherit"],
            env: { CONNECTOR: "FIXME" },
            encoding: "utf8"
        }), "f");
        __classPrivateFieldSet(this, _Connector_transformer, new Transform({
            objectMode: true,
            transform(chunk, encoding, callback) {
                const data = chunk.trim();
                if (!data)
                    return callback();
                try {
                    callback(null, JSON.parse(data));
                }
                catch (err) {
                    callback(new Error(`Invalid JSON response: ${err instanceof Error ? err.message : "Unknown error"}`));
                }
            },
        }), "f");
        if (!__classPrivateFieldGet(this, _Connector_process, "f").stdout) {
            throw new Error("Process stdout is not available");
        }
        __classPrivateFieldGet(this, _Connector_process, "f").stdout.pipe(__classPrivateFieldGet(this, _Connector_transformer, "f"));
    }
    /**
     * @param {Object} request
     * @returns {Promise<any>}
     */
    async request(request) {
        return new Promise((resolve, reject) => {
            const handler = (/** @type {ConnectorResponse} */ response) => {
                if (response.error) {
                    reject(new Error(response.error));
                }
                else if ("response" in response) {
                    resolve(response.response);
                }
                else {
                    reject(new Error("Invalid response structure from connector"));
                }
            };
            __classPrivateFieldGet(this, _Connector_transformer, "f").once("data", handler);
            __classPrivateFieldGet(this, _Connector_transformer, "f").once("error", reject);
            if (!__classPrivateFieldGet(this, _Connector_process, "f").stdin) {
                reject(new Error("Process stdin is not available"));
                return;
            }
            __classPrivateFieldGet(this, _Connector_process, "f").stdin.write(JSON.stringify(request) + "\n");
        });
    }
    end() {
        __classPrivateFieldGet(this, _Connector_process, "f").kill();
    }
}
_Connector_process = new WeakMap(), _Connector_transformer = new WeakMap();
export default Connector;
