/*!
**  slideshow -- Observe and Control Slideshow Applications
**  Copyright (c) 2014-2023 Dr. Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License (MPL), version 2.0. If a copy of the MPL was not distributed
**  with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
**
**  File:     slideshow-api.d.ts
**  Purpose:  Application Programming Interface (API) Definition
**  Language: TypeScript
*/

/**
 * Slideshow state information
 */
export interface SlideState {
    /** Current state of the slideshow ('viewing'|'editing'|'started'|'closed') */
    state: string;
    /** Current slide position */
    position: number;
    /** Total number of slides */
    slides: number;
}

/**
 * Slideshow content information
 */
export interface SlideInfo {
    /** Array of slide titles */
    titles: string[];
    /** Array of slide notes */
    notes: string[];
}

/**
 * Main Slideshow control class
 */
export class Slideshow {
    /**
     * Creates a new Slideshow instance
     * @param application - Application name ('powerpoint'|'keynote')
     */
    constructor(application: string);

    /**
     * Get current slideshow state
     */
    stat(): Promise<SlideState>;

    /**
     * Get slideshow information
     */
    info(): Promise<SlideInfo>;

    /**
     * Boot the presentation application
     */
    boot(): Promise<'OK'>;

    /**
     * Quit the presentation application
     */
    quit(): Promise<'OK'>;

    /**
     * Open a presentation file
     * @param filename - Path to the presentation file
     */
    open(filename: string): Promise<'OK'>;

    /**
     * Close the current presentation
     */
    close(): Promise<'OK'>;

    /**
     * Start the slideshow
     */
    start(): Promise<'OK'>;

    /**
     * Stop the slideshow
     */
    stop(): Promise<'OK'>;

    /**
     * Pause the slideshow
     */
    pause(): Promise<'OK'>;

    /**
     * Resume the slideshow
     */
    resume(): Promise<'OK'>;

    /**
     * Go to first slide
     */
    first(): Promise<'OK'>;

    /**
     * Go to last slide
     */
    last(): Promise<'OK'>;

    /**
     * Go to specific slide
     * @param slideNumber - Slide number to go to
     */
    goto(slideNumber: number): Promise<'OK'>;

    /**
     * Go to previous slide
     */
    prev(): Promise<'OK'>;

    /**
     * Go to next slide
     */
    next(): Promise<'OK'>;

    /**
     * End the connection with the presentation application
     */
    end(): void;
}

export default Slideshow; 