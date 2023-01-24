/**
 * Optional parameters to customize {@link FaviconMarqueeRenderer}
 */
export interface FaviconMarqueeParameters {
    /**
     * Text to be displayed in the favicon. This can be any unicode characters
     * including emojis, cyrillic, hangul, etc.
     * Default: "SCROLLING TEXT"
     */
    text?: string;
    /**
     * Font of the text. This can be any valid CSS `font-family` value.
     * Default: '"Arial", sans-serif'
     */
    font?: string;
    /**
     * Color of the text to be displayed. Can be any valid CSS `color` value.
     * Default: "green"
     */
    color?: string;
    /**
     * Specifies how many pixels the marquee scrolls each render. This can be used
     * to speed up or slow down the text's scrolling.
     * Default: 0.75
     */
    step?: number;
    /**
     * The text is rendered at the bottom of the favicon. This option
     * can be used to add some margin to the bottom to center the text instead.
     * Default: 0
     */
    marginBottom?: number;
    /**
     * The background color of the text. Can be any valid CSS `color` value.
     * Default: undefined (transparent, color of browser's tab background)
     */
    background?: string;
}
export declare enum Mode {
    /**
     * Marquee is rendered by web worker on an OffscreenCanvas in another thread
     */
    Worker = 0,
    /**
     * Marquee is rendered on a regular canvas in the main thread
     */
    Canvas = 1
}
export interface Renderer {
    start: () => void;
    stop: () => void;
}
export declare enum State {
    Stopped = 0,
    Running = 1
}
export type MessageType = "start" | "stop" | "data";
export interface MessageBase {
    type: MessageType;
    payload?: unknown;
}
export interface StartMessage extends MessageBase {
    type: "start";
    payload: {
        parameters: FaviconMarqueeParameters;
    };
}
export interface DataMessage extends MessageBase {
    type: "data";
    payload: {
        url: string;
    };
}
export interface StopMessage extends MessageBase {
    type: "stop";
    payload?: undefined;
}
export type Message = StartMessage | DataMessage | StopMessage;
