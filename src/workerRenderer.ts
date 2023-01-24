import { FaviconMarqueeParameters, Message, Renderer, StartMessage, StopMessage } from "./types.js";

export class WorkerRenderer implements Renderer {
    private readonly favicon: HTMLLinkElement;
    private readonly parameters: FaviconMarqueeParameters;
    private readonly worker: Worker;

    constructor(parameters: FaviconMarqueeParameters, favicon: HTMLLinkElement) {
        this.worker = new Worker(new URL("./worker.js", import.meta.url));
        this.parameters = parameters;
        this.favicon = favicon;
        this.worker.onmessage = (e: MessageEvent<Message>) => {
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

    public start(): void {
        const startMessage: StartMessage = {
            type: "start",
            payload: {
                parameters: this.parameters,
            },
        };
        this.worker.postMessage(startMessage);
    }

    public stop(): void {
        const stopMessage: StopMessage = { type: "stop" };
        this.worker.postMessage(stopMessage);
    }
}
