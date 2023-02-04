type Renderer = import("./types").Renderer;
type DataMessage = import("./types").DataMessage;
type FaviconMarqueeParameters = import("./types").FaviconMarqueeParameters;
type State = import("./types").State;
type Message = import("./types").Message;
declare const CANVAS_SIZE = 256;
declare class CanvasPainter {
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
declare class OffscreenCanvasRenderer implements Renderer {
    private readonly canvas;
    private readonly canvasDrawer;
    private state;
    constructor(parameters: FaviconMarqueeParameters);
    start(): void;
    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    stop(): void;
    private getDataUrl;
    private handleDataUrl;
}
declare let renderer: OffscreenCanvasRenderer | undefined;
