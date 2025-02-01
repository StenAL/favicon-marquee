import { CanvasPainter } from "./canvasPainter.js";
import { DataMessage, FaviconMarqueeParameters, Message, Renderer, State } from "./types.js";

const CANVAS_SIZE = 256;

class OffscreenCanvasRenderer implements Renderer {
    private readonly canvas: OffscreenCanvas;
    private readonly canvasDrawer: CanvasPainter;
    private state: State;

    public constructor(parameters: FaviconMarqueeParameters) {
        this.canvas = new OffscreenCanvas(CANVAS_SIZE, CANVAS_SIZE);
        const renderingContext = this.canvas.getContext("2d");
        if (renderingContext === null) {
            throw new Error(
                "Error getting 2D rendering context from canvas. This browser does not support FaviconMarquee",
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

        const render = async () => {
            if (this.state === 1) {
                this.canvasDrawer.step();
                const dataUrl = await this.getDataUrl();
                this.handleDataUrl(dataUrl);
                requestAnimationFrame(render);
            }
        };
        render().catch((e) => console.log("Failed to render FaviconMarquee:", e));
    }

    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    public stop(): void {
        this.state = State.Stopped;
    }

    private async getDataUrl(): Promise<string> {
        const blob = await this.canvas.convertToBlob({ type: "image/png" });
        const p = new Promise<string>((resolve) => {
            const fileReader = new FileReader();
            fileReader.addEventListener("loadend", () => {
                if (fileReader.readyState !== FileReader.DONE || typeof fileReader.result !== "string") {
                    throw new Error("Error converting OffscreenCanvas to data URL");
                }
                resolve(fileReader.result);
            });
            fileReader.readAsDataURL(blob);
        });
        return await p;
    }

    private handleDataUrl(dataUrl: string) {
        const message: DataMessage = {
            type: "data",
            payload: {
                url: dataUrl,
            },
        };
        self.postMessage(message);
    }
}

let renderer: OffscreenCanvasRenderer | undefined;
self.onmessage = (e: MessageEvent<Message>) => {
    const type = e.data.type;
    switch (type) {
        case "start":
            const { parameters } = e.data.payload;
            if (!renderer) {
                renderer = new OffscreenCanvasRenderer(parameters);
            }
            renderer.start();
            break;
        case "stop":
            if (renderer) {
                renderer.stop();
            }
            break;
        default:
            throw new Error(`Error: Worker should not receive any messages except "start" and "stop"; got ${type}`);
    }
};
