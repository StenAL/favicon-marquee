import { FaviconMarqueeParameters } from "./types.js";
/**
 * A scrolling favicon for your website.
 * How to use:
 * 1. Initialize using the constructor
 *     const faviconMarquee = new FaviconMarquee();
 * 2. Call its start method
 *     faviconMarquee.start();
 */
export declare class FaviconMarquee {
    private readonly favicon;
    private readonly renderer;
    constructor(parameters: FaviconMarqueeParameters);
    start(): void;
    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    stop(): void;
}
export default FaviconMarquee;
