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
     * Default: 0.75
     */
    step?: number;
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

enum State {
    Stopped,
    Running
}

/**
 * A scrolling favicon for your website.
 * How to use:
 * 1. Initialize using the constructor
 *     const faviconMarquee = new FaviconMarquee();
 * 2. Call its start method
 *     faviconMarquee.start();
 */
export class FaviconMarquee {
    private static readonly CANVAS_SIZE = 256;
    private readonly text: string;
    private readonly color: string;
    private readonly step: number;
    private readonly font: string;
    private readonly marginBottom: number;
    private readonly background?: string;

    private pixelsScrolled: number;
    private state: State
    private favicon?: HTMLLinkElement;
    private canvas?: HTMLCanvasElement | OffscreenCanvas;
    private ctx?: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    private textWidth?: number;

    constructor({
        text = "SCROLLING TEXT",
        font = '"Arial", sans-serif',
        color = "green",
        step = 0.75,
        marginBottom = 0,
        background,
    }: FaviconMarqueeParameters) {
        this.text = text;
        this.color = color;
        this.step = step;
        this.font = font;
        this.marginBottom = marginBottom;
        this.background = background;
        this.pixelsScrolled = 0;
        this.state = State.Stopped;
    }

    public start(): void {
        this.state = State.Running
        this.favicon = document.createElement("link");
        this.favicon.type = "image/jpeg";
        this.favicon.rel = "shortcut icon";
        document.head.appendChild(this.favicon);
        this.createCanvas();
        const render = async () => {
            if (this.state === State.Running) {
                await this.draw()
                requestAnimationFrame(render)
            }
        }
        render().catch(e => console.log("Failed to render FaviconMarquee:", e));
    }

    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    public stop(): void {
        this.state = State.Stopped;
    }

    private async draw(): Promise<void> {
        if (
            this.ctx === undefined ||
            this.textWidth === undefined ||
            this.favicon === undefined ||
            this.canvas === undefined
        ) {
            throw new Error("Error: uninitialized member variables -- have you called the start() function?");
        }
        if (this.background) {
            this.ctx.fillStyle = this.background;
            this.ctx.fillRect(0, 0, FaviconMarquee.CANVAS_SIZE, FaviconMarquee.CANVAS_SIZE);
        } else {
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
            const p = new Promise<string>((resolve) => {
                const fileReader = new FileReader();
                fileReader.addEventListener("loadend", () => {
                    if (fileReader.readyState !== FileReader.DONE || typeof fileReader.result !== "string") {
                        throw new Error("Error converting canvas to OffscreenCanvas");
                    }
                    resolve(fileReader.result);
                })
                fileReader.readAsDataURL(blob);
            })
            dataUrl = await p;
        } else {
            dataUrl = this.canvas.toDataURL("image/png");
        }
        this.favicon.href = dataUrl;
    }

    private createCanvas(): void {
        let renderingContext: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;
        if (window.OffscreenCanvas) {
            this.canvas = new OffscreenCanvas(FaviconMarquee.CANVAS_SIZE, FaviconMarquee.CANVAS_SIZE);
            renderingContext = this.canvas.getContext("2d")
        } else {
            this.canvas = document.createElement("canvas");
            this.canvas.width = FaviconMarquee.CANVAS_SIZE;
            this.canvas.height = FaviconMarquee.CANVAS_SIZE;
            this.canvas.hidden = true;
            renderingContext = this.canvas.getContext("2d");
        }

        if (renderingContext === null) {
            throw new Error(
                "Error getting 2D rendering context from canvas. This browser does not support FaviconMarquee"
            );
        }
        this.ctx = renderingContext;
        this.ctx.font = FaviconMarquee.CANVAS_SIZE + "px " + this.font;
        this.textWidth = Math.ceil(this.ctx.measureText(this.text).width);
    }
}

export default FaviconMarquee;
