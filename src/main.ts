import { FaviconMarqueeParameters, Mode, Renderer } from "./types.js";
import { CanvasRenderer } from "./canvasRenderer.js";
import { WorkerRenderer } from "./workerRenderer.js";

/**
 * A scrolling favicon for your website.
 * How to use:
 * 1. Initialize using the constructor
 *     const faviconMarquee = new FaviconMarquee();
 * 2. Call its start method
 *     faviconMarquee.start();
 */
export class FaviconMarquee {
    private readonly favicon: HTMLLinkElement;
    private readonly renderer: Renderer;

    constructor(parameters: FaviconMarqueeParameters) {
        let favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
        if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }
        favicon.type = "image/png";
        this.favicon = favicon;

        const mode = "OffscreenCanvas" in window ? Mode.Worker : Mode.Canvas;
        if (mode === Mode.Worker) {
            this.renderer = new WorkerRenderer(parameters, this.favicon);
        } else {
            this.renderer = new CanvasRenderer(parameters, this.favicon);
        }
    }

    public start(): void {
        this.renderer.start();
    }

    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    public stop(): void {
        this.renderer.stop();
    }
}

export default FaviconMarquee;
