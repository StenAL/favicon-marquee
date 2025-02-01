import { FaviconMarqueeParameters } from "./types.js";

export const CANVAS_SIZE = 256;

export class CanvasPainter {
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
            step = 1,
            marginBottom = 0,
            background,
        }: FaviconMarqueeParameters,
        renderingContext: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D,
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
