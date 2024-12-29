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
    constructor(application: string);
    /**
     * End the connection with the presentation application
     */
    end(): void;
    /**
     * Get current slideshow state
     * @returns {Promise<SlideState>}
     */
    stat(): Promise<SlideState>;
    /**
     * Get slideshow information
     * @returns {Promise<SlideInfo>}
     */
    info(): Promise<SlideInfo>;
    /**
     * Boot the presentation application
     * @returns {Promise<'OK'>}
     */
    boot(): Promise<"OK">;
    /**
     * Quit the presentation application
     * @returns {Promise<'OK'>}
     */
    quit(): Promise<"OK">;
    /**
     * Open a presentation file
     * @param {string} filename - Path to the presentation file
     * @returns {Promise<'OK'>}
     */
    open(filename: string): Promise<"OK">;
    /**
     * Close the current presentation
     * @returns {Promise<'OK'>}
     */
    close(): Promise<"OK">;
    /**
     * Start the slideshow
     * @returns {Promise<'OK'>}
     */
    start(): Promise<"OK">;
    /**
     * Stop the slideshow
     * @returns {Promise<'OK'>}
     */
    stop(): Promise<"OK">;
    /**
     * Pause the slideshow
     * @returns {Promise<'OK'>}
     */
    pause(): Promise<"OK">;
    /**
     * Resume the slideshow
     * @returns {Promise<'OK'>}
     */
    resume(): Promise<"OK">;
    /**
     * Go to first slide
     * @returns {Promise<'OK'>}
     */
    first(): Promise<"OK">;
    /**
     * Go to last slide
     * @returns {Promise<'OK'>}
     */
    last(): Promise<"OK">;
    /**
     * Go to specific slide
     * @param {number} slideNumber - Slide number to go to
     * @returns {Promise<'OK'>}
     */
    goto(slideNumber: number): Promise<"OK">;
    /**
     * Go to previous slide
     * @returns {Promise<'OK'>}
     */
    prev(): Promise<"OK">;
    /**
     * Go to next slide
     * @returns {Promise<'OK'>}
     */
    next(): Promise<"OK">;
    #private;
}
export default Slideshow;
export type SlideState = {
    /**
     * - Current state of the slideshow ('viewing'|'editing'|'started'|'closed')
     */
    state: string;
    /**
     * - Current slide position
     */
    position: number;
    /**
     * - Total number of slides
     */
    slides: number;
};
export type SlideInfo = {
    /**
     * - Array of slide titles
     */
    titles: string[];
    /**
     * - Array of slide notes
     */
    notes: string[];
};
