import { platform } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { Transform } from 'node:stream';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {Record<string, string>} */
const connectors = {
    "darwin-keynote":        "connectors/osx/kn5.sh",
    "darwin-keynote5":       "connectors/osx/kn5.sh",
    "darwin-keynote6":       "connectors/osx/kn6.sh",
    "darwin-powerpoint":     "connectors/osx/ppt2011.sh",
    "darwin-powerpoint2011": "connectors/osx/ppt2011.sh",
    "darwin-powerpoint2016": "connectors/osx/ppt2011.sh",
    "win32-powerpoint":      "connectors/win/ppt2010.bat",
    "win32-powerpoint2010":  "connectors/win/ppt2010.bat",
    "win32-powerpoint2013":  "connectors/win/ppt2010.bat"
};

/**
 * @typedef {Object} ConnectorResponse
 * @property {string} [error]
 * @property {any} [response]
 */

export class Connector {
    /** @type {import('execa').ExecaChildProcess} */
    #process;
    /** @type {Transform} */
    #transformer;

    /**
     * @param {string} application
     */
    constructor(application) {
        const id = `${platform()}-${application}`;
        const connectorPath = connectors[id];
        
        if (!connectorPath) {
            throw new Error(`Unsupported platform/application combination: ${id}`);
        }

        const filename = join(__dirname, connectorPath);
        
        this.#process = execa(filename, [], {
            stdio: ['pipe', 'pipe', 'inherit'],
            env: { CONNECTOR: 'FIXME' }
        });

        this.#transformer = new Transform({
            objectMode: true,
            transform(chunk, encoding, callback) {
                const data = chunk.toString().trim();
                if (!data) return callback();
                try {
                    callback(null, JSON.parse(data));
                } catch (err) {
                    callback(new Error(`Invalid JSON response: ${err instanceof Error ? err.message : 'Unknown error'}`));
                }
            }
        });

        if (!this.#process.stdout) {
            throw new Error('Process stdout is not available');
        }
        this.#process.stdout.pipe(this.#transformer);
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
                } else if ('response' in response) {
                    resolve(response.response);
                } else {
                    reject(new Error('Invalid response structure from connector'));
                }
            };

            this.#transformer.once('data', handler);
            this.#transformer.once('error', reject);

            if (!this.#process.stdin) {
                reject(new Error('Process stdin is not available'));
                return;
            }
            this.#process.stdin.write(JSON.stringify(request) + '\n');
        });
    }

    end() {
        this.#process.kill();
    }
}

export default Connector;