import { FaviconMarqueeParameters, Renderer } from "./types.js";
export declare class CanvasRenderer implements Renderer {
    private readonly favicon;
    private readonly canvas;
    private readonly canvasDrawer;
    private state;
    constructor(parameters: FaviconMarqueeParameters, favicon: HTMLLinkElement);
    start(): void;
    /**
     * Stop the marquee. It can be restarted again using {@link start}
     */
    stop(): void;
}
