/**
 * A scrolling favicon for your website.
 * How to use:
 * 1. Initialize using the constructor
 *     const faviconMarquee = new FaviconMarquee();
 * 2. Call its start method
 *     faviconMarquee.start();
 */
export class FaviconMarquee {
    constructor({ text = "SCROLLING TEXT", font = '"Arial", sans-serif', color = "green", step = 0.5, size = 32, marginBottom = 0, background, }) {
        this.text = text;
        this.size = size;
        this.color = color;
        this.step = step;
        this.font = font;
        this.marginBottom = marginBottom;
        this.background = background;
        this.pixelsScrolled = 0;
    }
    /**
     * Start the marquee at 24 FPS. The refresh interval can be configured using the interval parameter.
     * Higher FPS may result in performance issues on low-powered devices.
     */
    start(interval = 1000 / 24) {
        this.favicon = document.createElement("link");
        this.favicon.type = "image/jpeg";
        this.favicon.rel = "shortcut icon";
        document.head.appendChild(this.favicon);
        this.createCanvas();
        this.interval = setInterval(() => this.draw(), interval);
    }
    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    stop() {
        clearInterval(this.interval);
        this.interval = undefined;
    }
    draw() {
        if (this.ctx === undefined ||
            this.textWidth === undefined ||
            this.favicon === undefined ||
            this.canvas === undefined) {
            throw new Error("Error: uninitialized member variables -- have you called the start() function?");
        }
        if (this.background) {
            this.ctx.fillStyle = this.background;
            this.ctx.fillRect(0, 0, this.size, this.size);
        }
        else {
            this.ctx.clearRect(0, 0, this.size, this.size);
        }
        this.pixelsScrolled += this.step;
        if (this.pixelsScrolled > this.textWidth + 2 * this.size) {
            // 2 * this.size to begin and end with blank canvas
            this.pixelsScrolled = 0; // loop around
        }
        const canvasWidthOffset = -1 * this.pixelsScrolled + this.size; // negation of pixelsScrolled because canvas scrolls left-to-right
        // add this.size to begin rendering with blank canvas
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, canvasWidthOffset, this.size - this.marginBottom);
        this.favicon.href = this.canvas.toDataURL("image/png", 0.3);
    }
    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.canvas.hidden = true;
        const renderingContext = this.canvas.getContext("2d");
        if (renderingContext === null) {
            throw new Error("Error getting 2D rendering context from canvas. This browser does not support FaviconMarquee");
        }
        this.ctx = renderingContext;
        this.ctx.font = this.size + "px " + this.font;
        this.textWidth = Math.ceil(this.ctx.measureText(this.text).width);
    }
}
export default FaviconMarquee;
