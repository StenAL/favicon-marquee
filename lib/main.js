var State;
(function (State) {
    State[State["Stopped"] = 0] = "Stopped";
    State[State["Running"] = 1] = "Running";
})(State || (State = {}));
/**
 * A scrolling favicon for your website.
 * How to use:
 * 1. Initialize using the constructor
 *     const faviconMarquee = new FaviconMarquee();
 * 2. Call its start method
 *     faviconMarquee.start();
 */
export class FaviconMarquee {
    static CANVAS_SIZE = 256;
    text;
    color;
    step;
    font;
    marginBottom;
    background;
    pixelsScrolled;
    state;
    favicon;
    canvas;
    ctx;
    textWidth;
    constructor({ text = "SCROLLING TEXT", font = '"Arial", sans-serif', color = "green", step = 0.75, marginBottom = 0, background, }) {
        this.text = text;
        this.color = color;
        this.step = step;
        this.font = font;
        this.marginBottom = marginBottom;
        this.background = background;
        this.pixelsScrolled = 0;
        this.state = State.Stopped;
    }
    start() {
        if (!this.favicon) {
            let favicon = document.querySelector("link[rel~='icon']");
            if (!favicon) {
                favicon = document.createElement("link");
                favicon.rel = "icon";
                document.head.appendChild(favicon);
            }
            favicon.type = "image/jpeg";
            this.favicon = favicon;
        }
        this.state = State.Running;
        this.createCanvas();
        const render = async () => {
            if (this.state === State.Running) {
                await this.draw();
                requestAnimationFrame(render);
            }
        };
        render().catch(e => console.log("Failed to render FaviconMarquee:", e));
    }
    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    stop() {
        this.state = State.Stopped;
    }
    async draw() {
        if (this.ctx === undefined ||
            this.textWidth === undefined ||
            this.favicon === undefined ||
            this.canvas === undefined) {
            throw new Error("Error: uninitialized member variables -- have you called the start() function?");
        }
        if (this.background) {
            this.ctx.fillStyle = this.background;
            this.ctx.fillRect(0, 0, FaviconMarquee.CANVAS_SIZE, FaviconMarquee.CANVAS_SIZE);
        }
        else {
            this.ctx.clearRect(0, 0, FaviconMarquee.CANVAS_SIZE, FaviconMarquee.CANVAS_SIZE);
        }
        this.pixelsScrolled += this.step;
        if (this.pixelsScrolled > this.textWidth + 2 * FaviconMarquee.CANVAS_SIZE) {
            // 2 * CANVAS_SIZE to begin and end with blank canvas
            this.pixelsScrolled = 0; // loop around
        }
        const canvasWidthOffset = -1 * this.pixelsScrolled + FaviconMarquee.CANVAS_SIZE; // negation of pixelsScrolled because canvas scrolls left-to-right
        // add CANVAS_SIZE to begin rendering with blank canvas
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(this.text, canvasWidthOffset, FaviconMarquee.CANVAS_SIZE - this.marginBottom);
        let dataUrl;
        if (this.canvas instanceof OffscreenCanvas) {
            const blob = await this.canvas.convertToBlob({ type: "image/png" });
            const p = new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.addEventListener("loadend", () => {
                    if (fileReader.readyState !== FileReader.DONE || typeof fileReader.result !== "string") {
                        throw new Error("Error converting canvas to OffscreenCanvas");
                    }
                    resolve(fileReader.result);
                });
                fileReader.readAsDataURL(blob);
            });
            dataUrl = await p;
        }
        else {
            dataUrl = this.canvas.toDataURL("image/png");
        }
        this.favicon.href = dataUrl;
    }
    createCanvas() {
        let renderingContext;
        if (window.OffscreenCanvas) {
            this.canvas = new OffscreenCanvas(FaviconMarquee.CANVAS_SIZE, FaviconMarquee.CANVAS_SIZE);
            renderingContext = this.canvas.getContext("2d");
        }
        else {
            this.canvas = document.createElement("canvas");
            this.canvas.width = FaviconMarquee.CANVAS_SIZE;
            this.canvas.height = FaviconMarquee.CANVAS_SIZE;
            this.canvas.hidden = true;
            renderingContext = this.canvas.getContext("2d");
        }
        if (renderingContext === null) {
            throw new Error("Error getting 2D rendering context from canvas. This browser does not support FaviconMarquee");
        }
        this.ctx = renderingContext;
        this.ctx.font = FaviconMarquee.CANVAS_SIZE + "px " + this.font;
        this.textWidth = Math.ceil(this.ctx.measureText(this.text).width);
    }
}
export default FaviconMarquee;
