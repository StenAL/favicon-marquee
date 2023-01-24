export var Mode;
(function (Mode) {
    /**
     * Marquee is rendered by web worker on an OffscreenCanvas in another thread
     */
    Mode[Mode["Worker"] = 0] = "Worker";
    /**
     * Marquee is rendered on a regular canvas in the main thread
     */
    Mode[Mode["Canvas"] = 1] = "Canvas";
})(Mode || (Mode = {}));
export var State;
(function (State) {
    State[State["Stopped"] = 0] = "Stopped";
    State[State["Running"] = 1] = "Running";
})(State || (State = {}));
