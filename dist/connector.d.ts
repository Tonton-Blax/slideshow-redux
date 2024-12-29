/**
 * @typedef {Object} ConnectorResponse
 * @property {string} [error]
 * @property {any} [response]
 */
export class Connector {
    /**
     * @param {string} application
     */
    constructor(application: string);
    /**
     * @param {Object} request
     * @returns {Promise<any>}
     */
    request(request: any): Promise<any>;
    end(): void;
    #private;
}
export default Connector;
export type ConnectorResponse = {
    error?: string;
    response?: any;
};
