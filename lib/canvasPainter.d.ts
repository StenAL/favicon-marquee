import { FaviconMarqueeParameters } from "./types.js";
export declare const CANVAS_SIZE = 256;
export declare class CanvasPainter {
    private readonly text;
    private readonly color;
    private readonly stepSize;
    private readonly font;
    private readonly marginBottom;
    private readonly background?;
    private readonly textWidth;
    private pixelsScrolled;
    private renderingContext;
    constructor({ text, font, color, step, marginBottom, background, }: FaviconMarqueeParameters, renderingContext: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D);
    step(): void;
}
