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
var _Slideshow_instances, _Slideshow_connector, _Slideshow_request;
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
    /**
     * @param {string} application - Application name ('powerpoint'|'keynote')
     */
    constructor(application) {
        _Slideshow_instances.add(this);
        /** @type {Connector} */
        _Slideshow_connector.set(this, void 0);
        __classPrivateFieldSet(this, _Slideshow_connector, new Connector(application), "f");
    }
    /**
     * End the connection with the presentation application
     */
    end() {
        __classPrivateFieldGet(this, _Slideshow_connector, "f").end();
    }
    /**
     * Get current slideshow state
     * @returns {Promise<SlideState>}
     */
    stat() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'STAT' });
    }
    /**
     * Get slideshow information
     * @returns {Promise<SlideInfo>}
     */
    info() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'INFO' });
    }
    /**
     * Boot the presentation application
     * @returns {Promise<'OK'>}
     */
    boot() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'BOOT' });
    }
    /**
     * Quit the presentation application
     * @returns {Promise<'OK'>}
     */
    quit() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'QUIT' });
    }
    /**
     * Open a presentation file
     * @param {string} filename - Path to the presentation file
     * @returns {Promise<'OK'>}
     */
    open(filename) {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: `OPEN ${filename}` });
    }
    /**
     * Close the current presentation
     * @returns {Promise<'OK'>}
     */
    close() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'CLOSE' });
    }
    /**
     * Start the slideshow
     * @returns {Promise<'OK'>}
     */
    start() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'START' });
    }
    /**
     * Stop the slideshow
     * @returns {Promise<'OK'>}
     */
    stop() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'STOP' });
    }
    /**
     * Pause the slideshow
     * @returns {Promise<'OK'>}
     */
    pause() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'PAUSE' });
    }
    /**
     * Resume the slideshow
     * @returns {Promise<'OK'>}
     */
    resume() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'RESUME' });
    }
    /**
     * Go to first slide
     * @returns {Promise<'OK'>}
     */
    first() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'FIRST' });
    }
    /**
     * Go to last slide
     * @returns {Promise<'OK'>}
     */
    last() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'LAST' });
    }
    /**
     * Go to specific slide
     * @param {number} slideNumber - Slide number to go to
     * @returns {Promise<'OK'>}
     */
    goto(slideNumber) {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: `GOTO ${slideNumber}` });
    }
    /**
     * Go to previous slide
     * @returns {Promise<'OK'>}
     */
    prev() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'PREV' });
    }
    /**
     * Go to next slide
     * @returns {Promise<'OK'>}
     */
    next() {
        return __classPrivateFieldGet(this, _Slideshow_instances, "m", _Slideshow_request).call(this, { command: 'NEXT' });
    }
}
_Slideshow_connector = new WeakMap(), _Slideshow_instances = new WeakSet(), _Slideshow_request = function _Slideshow_request(request) {
    return __classPrivateFieldGet(this, _Slideshow_connector, "f").request(request);
};
export default Slideshow;
