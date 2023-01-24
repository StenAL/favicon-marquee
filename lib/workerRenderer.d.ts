/// <reference types="web" />
import { FaviconMarqueeParameters, Renderer } from "./types.js";
export declare class WorkerRenderer implements Renderer {
    private readonly favicon;
    private readonly parameters;
    private readonly worker;
    constructor(parameters: FaviconMarqueeParameters, favicon: HTMLLinkElement);
    start(): void;
    stop(): void;
}
