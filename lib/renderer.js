import { State } from "./types.js";
const CANVAS_SIZE = 256;
class CanvasDrawer {
    text;
    color;
    stepSize;
    font;
    marginBottom;
    background;
    textWidth;
    pixelsScrolled;
    renderingContext;
    constructor({ text = "SCROLLING TEXT", font = '"Arial", sans-serif', color = "green", step = 0.75, marginBottom = 0, background, }, renderingContext) {
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
    step() {
        if (this.background) {
            this.renderingContext.fillStyle = this.background;
            this.renderingContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
        else {
            this.renderingContext.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
        this.pixelsScrolled = (this.pixelsScrolled + this.stepSize) % (this.textWidth + 2 * CANVAS_SIZE);
        this.renderingContext.fillStyle = this.color;
        const widthOffset = -1 * this.pixelsScrolled + CANVAS_SIZE; // negation of pixelsScrolled because canvas scrolls left-to-right
        // then add CANVAS_SIZE to begin rendering with blank canvas
        this.renderingContext.fillText(this.text, widthOffset, CANVAS_SIZE - this.marginBottom);
    }
}
export class CanvasRenderer {
    favicon;
    canvas;
    canvasDrawer;
    state;
    constructor(parameters, favicon) {
        this.favicon = favicon;
        this.canvas = document.createElement("canvas");
        this.canvas.width = CANVAS_SIZE;
        this.canvas.height = CANVAS_SIZE;
        this.canvas.hidden = true;
        const renderingContext = this.canvas.getContext("2d");
        if (renderingContext === null) {
            throw new Error("Error getting 2D rendering context from canvas. This browser does not support FaviconMarquee");
        }
        this.canvasDrawer = new CanvasDrawer(parameters, renderingContext);
        this.state = State.Stopped;
    }
    start() {
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
    stop() {
        this.state = State.Stopped;
    }
}
export class WorkerRenderer {
    favicon;
    parameters;
    worker;
    constructor(parameters, favicon) {
        this.worker = new Worker(new URL("./worker.js", import.meta.url));
        this.parameters = parameters;
        this.favicon = favicon;
        this.worker.onmessage = (e) => {
            const type = e.data.type;
            switch (type) {
                case "data":
                    this.favicon.href = e.data.payload.url;
                    break;
                default:
                    throw new Error(`Error: Main thread should not receive any messages except "data"; got ${type}`);
            }
        };
    }
    start() {
        const startMessage = {
            type: "start",
            payload: {
                parameters: this.parameters,
            },
        };
        this.worker.postMessage(startMessage);
    }
    stop() {
        const stopMessage = { type: "stop" };
        this.worker.postMessage(stopMessage);
    }
}
