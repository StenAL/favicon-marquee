// Currently, when any values are imported using normal 'import { x } from "y"' code, TypeScript generates ESM code for this file.
// Since Firefox does not support ESM workers, nothing can be imported like normal.
// TODO when Firefox starts supporting ESM workers (https://stackoverflow.com/a/45578811, expected March 2023):
//  1. Import the types like normal
//  2. Create a "module" type worker in main.ts
//  3. Stop duplicating the CanvasDrawer class code, instead import it and CANVAS_SIZE from canvasPainter.ts
//  4. Use enum values for OffscreenCanvasRenderer's state

type Renderer = import("./types").Renderer;
type DataMessage = import("./types").DataMessage;
type FaviconMarqueeParameters = import("./types").FaviconMarqueeParameters;
type State = import("./types").State;
type Message = import("./types").Message;

const CANVAS_SIZE = 256;

class CanvasPainter {
    private readonly text: string;
    private readonly color: string;
    private readonly stepSize: number;
    private readonly font: string;
    private readonly marginBottom: number;
    private readonly background?: string;
    private readonly textWidth: number;

    private pixelsScrolled: number;
    private renderingContext: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

    public constructor(
        {
            text = "SCROLLING TEXT",
            font = '"Arial", sans-serif',
            color = "green",
            step = 0.75,
            marginBottom = 0,
            background,
        }: FaviconMarqueeParameters,
        renderingContext: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D
    ) {
        this.text = text;
        this.color = color;
        this.stepSize = step;
        this.font = font;
        this.marginBottom = marginBottom;
        this.background = background;

        this.pixelsScrolled = 0;
        this.renderingContext = renderingContext;
        this.renderingContext.font = CANVAS_SIZE + "px " + this.font;
        this.textWidth = Math.ceil(this.renderingContext.measureText(this.text).width);
    }

    public step(): void {
        if (this.background) {
            this.renderingContext.fillStyle = this.background;
            this.renderingContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        } else {
            this.renderingContext.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }

        this.pixelsScrolled = (this.pixelsScrolled + this.stepSize) % (this.textWidth + 2 * CANVAS_SIZE);

        this.renderingContext.fillStyle = this.color;
        const widthOffset = -1 * this.pixelsScrolled + CANVAS_SIZE; // negation of pixelsScrolled because canvas scrolls left-to-right
        // then add CANVAS_SIZE to begin rendering with blank canvas
        this.renderingContext.fillText(this.text, widthOffset, CANVAS_SIZE - this.marginBottom);
    }
}

class OffscreenCanvasRenderer implements Renderer {
    private readonly canvas: OffscreenCanvas;
    private readonly canvasDrawer: CanvasPainter;
    private state: State;

    public constructor(parameters: FaviconMarqueeParameters) {
        this.canvas = new OffscreenCanvas(CANVAS_SIZE, CANVAS_SIZE);
        const renderingContext = this.canvas.getContext("2d");
        if (renderingContext === null) {
            throw new Error(
                "Error getting 2D rendering context from canvas. This browser does not support FaviconMarquee"
            );
        }
        this.canvasDrawer = new CanvasPainter(parameters, renderingContext);
        this.state = 0;
    }

    public start(): void {
        if (this.state == 1) {
            return;
        }
        this.state = 1;

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
        this.state = 0;
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
