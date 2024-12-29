import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Slideshow } from '../src/slideshow-api.js';

describe('Slideshow', () => {
    /** @type {Slideshow} */
    let slideshow;

    beforeEach(() => {
        // Mock the connector to avoid actual PowerPoint interactions
        vi.mock('../src/connector.js', () => ({
            Connector: class MockConnector {
                async request(cmd) {
                    return cmd.command === 'STAT' 
                        ? { state: 'closed', position: 1, slides: 10 }
                        : 'OK';
                }
                end() {}
            }
        }));
        
        slideshow = new Slideshow('powerpoint');
    });

    afterEach(() => {
        slideshow.end();
        vi.clearAllMocks();
    });

    it('should initialize with powerpoint', () => {
        expect(slideshow).toBeInstanceOf(Slideshow);
    });

    it('should get slideshow state', async () => {
        const state = await slideshow.stat();
        expect(state).toHaveProperty('state', 'closed');
        expect(state).toHaveProperty('position', 1);
        expect(state).toHaveProperty('slides', 10);
    });

    it('should execute slideshow commands', async () => {
        await expect(slideshow.boot()).resolves.toBe('OK');
        await expect(slideshow.open('test.pptx')).resolves.toBe('OK');
        await expect(slideshow.start()).resolves.toBe('OK');
        await expect(slideshow.goto(2)).resolves.toBe('OK');
        await expect(slideshow.stop()).resolves.toBe('OK');
        await expect(slideshow.close()).resolves.toBe('OK');
        await expect(slideshow.quit()).resolves.toBe('OK');
    });
});