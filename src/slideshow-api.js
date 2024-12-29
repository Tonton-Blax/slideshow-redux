import { Connector } from './connector.js';

/**
 * @typedef {Object} SlideState
 * @property {string} state - Current state of the slideshow ('viewing'|'editing'|'started'|'closed')
 * @property {number} position - Current slide position
 * @property {number} slides - Total number of slides
 */

/**
 * @typedef {Object} SlideInfo
 * @property {string[]} titles - Array of slide titles
 * @property {string[]} notes - Array of slide notes
 */

/**
 * Main Slideshow control class
 */
export class Slideshow {
    /** @type {Connector} */
    #connector;

    /**
     * @param {string} application - Application name ('powerpoint'|'keynote')
     */
    constructor(application) {
        this.#connector = new Connector(application);
    }

    /**
     * Internal method for handling requests
     * @internal
     * @param {Object} request - Request object
     * @returns {Promise<any>}
     */
    #request(request) {
        return this.#connector.request(request);
    }

    /**
     * End the connection with the presentation application
     */
    end() {
        this.#connector.end();
    }

    /**
     * Get current slideshow state
     * @returns {Promise<SlideState>}
     */
    stat() {
        return this.#request({ command: 'STAT' });
    }

    /**
     * Get slideshow information
     * @returns {Promise<SlideInfo>}
     */
    info() {
        return this.#request({ command: 'INFO' });
    }

    /**
     * Boot the presentation application
     * @returns {Promise<'OK'>}
     */
    boot() {
        return this.#request({ command: 'BOOT' });
    }

    /**
     * Quit the presentation application
     * @returns {Promise<'OK'>}
     */
    quit() {
        return this.#request({ command: 'QUIT' });
    }

    /**
     * Open a presentation file
     * @param {string} filename - Path to the presentation file
     * @returns {Promise<'OK'>}
     */
    open(filename) {
        return this.#request({ command: `OPEN ${filename}` });
    }

    /**
     * Close the current presentation
     * @returns {Promise<'OK'>}
     */
    close() {
        return this.#request({ command: 'CLOSE' });
    }

    /**
     * Start the slideshow
     * @returns {Promise<'OK'>}
     */
    start() {
        return this.#request({ command: 'START' });
    }

    /**
     * Stop the slideshow
     * @returns {Promise<'OK'>}
     */
    stop() {
        return this.#request({ command: 'STOP' });
    }

    /**
     * Pause the slideshow
     * @returns {Promise<'OK'>}
     */
    pause() {
        return this.#request({ command: 'PAUSE' });
    }

    /**
     * Resume the slideshow
     * @returns {Promise<'OK'>}
     */
    resume() {
        return this.#request({ command: 'RESUME' });
    }

    /**
     * Go to first slide
     * @returns {Promise<'OK'>}
     */
    first() {
        return this.#request({ command: 'FIRST' });
    }

    /**
     * Go to last slide
     * @returns {Promise<'OK'>}
     */
    last() {
        return this.#request({ command: 'LAST' });
    }

    /**
     * Go to specific slide
     * @param {number} slideNumber - Slide number to go to
     * @returns {Promise<'OK'>}
     */
    goto(slideNumber) {
        return this.#request({ command: `GOTO ${slideNumber}` });
    }

    /**
     * Go to previous slide
     * @returns {Promise<'OK'>}
     */
    prev() {
        return this.#request({ command: 'PREV' });
    }

    /**
     * Go to next slide
     * @returns {Promise<'OK'>}
     */
    next() {
        return this.#request({ command: 'NEXT' });
    }
}

export default Slideshow;

