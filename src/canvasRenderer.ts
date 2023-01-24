import { FaviconMarqueeParameters, Renderer, State } from "./types.js";
import { CanvasPainter, CANVAS_SIZE } from "./canvasPainter.js";

export class CanvasRenderer implements Renderer {
    private readonly favicon: HTMLLinkElement;
    private readonly canvas: HTMLCanvasElement;
    private readonly canvasDrawer: CanvasPainter;
    private state: State;

    constructor(parameters: FaviconMarqueeParameters, favicon: HTMLLinkElement) {
        this.favicon = favicon;
        this.canvas = document.createElement("canvas");
        this.canvas.width = CANVAS_SIZE;
        this.canvas.height = CANVAS_SIZE;
        this.canvas.hidden = true;
        const renderingContext = this.canvas.getContext("2d");
        if (renderingContext === null) {
            throw new Error(
                "Error getting 2D rendering context from canvas. This browser does not support FaviconMarquee"
            );
        }
        this.canvasDrawer = new CanvasPainter(parameters, renderingContext);
        this.state = State.Stopped;
    }

    public start(): void {
        if (this.state == State.Running) {
            return;
        }
        this.state = State.Running;

        const render = () => {
            if (this.state === 1) {
                this.canvasDrawer.step();
                this.favicon.href = this.canvas.toDataURL("image/png");
                requestAnimationFrame(render);
            }
        };
        render();
    }

    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    public stop(): void {
        this.state = State.Stopped;
    }
}
