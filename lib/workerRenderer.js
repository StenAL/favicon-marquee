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
