class FaviconMarquee {
    constructor(params) {
        this.size = params.size ?? 32;
        this.text = params.text ?? "SCROLLING TEXT";
        this.color = params.color ?? "green";
        this.step = params.step ?? 0.5;
        this.font = params.font ?? "Arial, sans-serif";
        this.marginBottom = params.marginBottom ?? 0;
        this.background = params.background;
        this.pixelsScrolled = 0;
        this.redraws = 0; // counts how many times the same canvas has been used for drawing the favicon
                          // needed because Firefox slows down horribly when reusing the same canvas too many times
    }

    start(interval = 1000 / 24) {
        this.favicon = document.createElement("link");
        this.favicon.type = "image/jpeg";
        this.favicon.rel = "shortcut icon";
        document.head.appendChild(this.favicon);
        this.createCanvas();
        this.interval = setInterval(() => this.draw(), interval);
    }

    stop() {
        clearInterval(this.interval);
    }

    /**
     * A new canvas is created on every render since on FireFox reusing the old canvas
     * comes with massive CPU usage creep which results in 100% CPU usage and
     * the website being unusable after ~15 minutes of running
     */
    createCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.canvas.hidden = true;

        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = this.size + "px " + this.font;
        this.textWidth = Math.ceil(this.ctx.measureText(this.text).width);
    }

    draw() {
        if (this.redraws === 500) { // make a new canvas every 500 redraws
            // this number is high enough to avoid frequent garbage collection
            // but low enough to avoid Firefox performance problems
            this.createCanvas();
            this.redraws = 0;
        }

        if (this.background) {
            this.ctx.fillStyle = this.background;
            this.ctx.rect(0, 0, this.size, this.size);
            this.ctx.fill();
        } else {
            this.ctx.clearRect(0, 0, this.size, this.size);
        }

        this.pixelsScrolled += this.step;
        if (this.pixelsScrolled > this.textWidth + 2 * this.size) {
            // 2 * this.size to begin and end with blank canvas
            this.pixelsScrolled = 0; // loop around
        }

        const canvasWidthOffset = -1 * this.pixelsScrolled + this.size; // negation of pixelsScrolled because canvas scrolls left-to-right
                                                                        // add this.size to begin rendering with blank canvas

        this.ctx.fillStyle = this.color;
        this.ctx.fillText(
            this.text,
            canvasWidthOffset,
            this.size - this.marginBottom
        );

        this.favicon.href = this.canvas.toDataURL("image/png", 0.3);
        this.redraws++;
    }
}

export default FaviconMarquee;
