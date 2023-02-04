export const CANVAS_SIZE = 256;
export class CanvasPainter {
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
