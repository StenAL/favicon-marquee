function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FaviconMarquee = /*#__PURE__*/function () {
  function FaviconMarquee(params) {
    var _params$size, _params$text, _params$color, _params$step, _params$font, _params$marginBottom;

    _classCallCheck(this, FaviconMarquee);

    this.size = (_params$size = params.size) !== null && _params$size !== void 0 ? _params$size : 32;
    this.text = (_params$text = params.text) !== null && _params$text !== void 0 ? _params$text : "SCROLLING TEXT";
    this.color = (_params$color = params.color) !== null && _params$color !== void 0 ? _params$color : "green";
    this.step = (_params$step = params.step) !== null && _params$step !== void 0 ? _params$step : 0.5;
    this.font = (_params$font = params.font) !== null && _params$font !== void 0 ? _params$font : "Arial, sans-serif";
    this.marginBottom = (_params$marginBottom = params.marginBottom) !== null && _params$marginBottom !== void 0 ? _params$marginBottom : 0;
    this.background = params.background;
    this.pixelsScrolled = 0;
  }

  _createClass(FaviconMarquee, [{
    key: "start",
    value: function start() {
      var _this = this;

      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000 / 24;
      this.favicon = document.createElement('link');
      this.favicon.type = 'image/jpeg';
      this.favicon.rel = 'shortcut icon';
      document.head.appendChild(this.favicon);
      setInterval(function () {
        return _this.draw();
      }, interval);
    }
  }, {
    key: "createCanvas",

    /**
     * A new canvas is created on every render since (on Chrome) reusing the old canvas
     * comes with massive CPU usage creep which results in 100% CPU usage and
     * the website being unusable after ~15 minutes of running
     */
    value: function createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      this.canvas.hidden = true;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.font = this.size + "px " + this.font;
      this.textWidth = Math.ceil(this.ctx.measureText(this.text).width);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.createCanvas();

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

      var canvasWidthOffset = -1 * this.pixelsScrolled + this.size; // negation of pixelsScrolled because canvas scrolls left-to-right
      // add this.size to begin rendering with blank canvas

      this.ctx.fillStyle = this.color;
      this.ctx.fillText(this.text, canvasWidthOffset, this.size - this.marginBottom);
      this.favicon.href = this.canvas.toDataURL('image/png', 0.3);
    }
  }]);

  return FaviconMarquee;
}();

export default FaviconMarquee;