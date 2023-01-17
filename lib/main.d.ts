/**
 * Optional parameters to customize {@link FaviconMarquee}
 */
export interface FaviconMarqueeParameters {
    /**
     * Text to be displayed in the favicon. This can be any unicode characters
     * including emojis, cyrillic, hangul, etc.
     * Default: "SCROLLING TEXT"
     */
    text?: string;
    /**
     * Font of the text. This can be any valid CSS `font-family` value.
     * Default: '"Arial", sans-serif'
     */
    font?: string;
    /**
     * Color of the text to be displayed. Can be any valid CSS `color` value.
     * Default: "green"
     */
    color?: string;
    /**
     * Specifies how many pixels the marquee scrolls each render. This can be used
     * to speed up or slow down the text's scrolling.
     * Default: 0.5
     */
    step?: number;
    /**
     * Size of the canvas used to render the marquee's text. A larger size results in
     * a more detailed picture but might cause performance issues.
     * Default: 32
     */
    size?: number;
    /**
     * The text is rendered at the bottom of the favicon. This option
     * can be used to add some margin to the bottom to center the text instead.
     * Default: 0
     */
    marginBottom?: number;
    /**
     * The background color of the text. Can be any valid CSS `color` value.
     * Default: undefined (transparent, color of browser's tab background)
     */
    background?: string;
}
/**
 * A scrolling favicon for your website.
 * How to use:
 * 1. Initialize using the constructor
 *     const faviconMarquee = new FaviconMarquee();
 * 2. Call its start method
 *     faviconMarquee.start();
 */
export declare class FaviconMarquee {
    private readonly size;
    private readonly text;
    private readonly color;
    private readonly step;
    private readonly font;
    private readonly marginBottom;
    private readonly background?;
    private pixelsScrolled;
    private interval?;
    private favicon?;
    private canvas?;
    private ctx?;
    private textWidth?;
    constructor({ text, font, color, step, size, marginBottom, background, }: FaviconMarqueeParameters);
    /**
     * Start the marquee at 24 FPS. The refresh interval can be configured using the interval parameter.
     * Higher FPS may result in performance issues on low-powered devices.
     */
    start(interval?: number): void;
    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    stop(): void;
    private draw;
    private createCanvas;
}
export default FaviconMarquee;