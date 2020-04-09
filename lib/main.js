var FaviconMarquee =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar FaviconMarquee = /*#__PURE__*/function () {\n  function FaviconMarquee(params) {\n    var _params$size, _params$text, _params$color, _params$step, _params$font, _params$marginBottom;\n\n    _classCallCheck(this, FaviconMarquee);\n\n    this.size = (_params$size = params.size) !== null && _params$size !== void 0 ? _params$size : 32;\n    this.text = (_params$text = params.text) !== null && _params$text !== void 0 ? _params$text : \"SCROLLING TEXT\";\n    this.color = (_params$color = params.color) !== null && _params$color !== void 0 ? _params$color : \"green\";\n    this.step = (_params$step = params.step) !== null && _params$step !== void 0 ? _params$step : 0.5;\n    this.font = (_params$font = params.font) !== null && _params$font !== void 0 ? _params$font : \"Arial, sans-serif\";\n    this.marginBottom = (_params$marginBottom = params.marginBottom) !== null && _params$marginBottom !== void 0 ? _params$marginBottom : 0;\n    this.background = params.background;\n    this.pixelsScrolled = 0;\n  }\n\n  _createClass(FaviconMarquee, [{\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000 / 24;\n      this.favicon = document.createElement('link');\n      this.favicon.type = 'image/jpeg';\n      this.favicon.rel = 'shortcut icon';\n      document.head.appendChild(this.favicon);\n      setInterval(function () {\n        return _this.draw();\n      }, interval);\n    }\n  }, {\n    key: \"createCanvas\",\n\n    /**\r\n     * A new canvas is created on every render since (on Chrome) reusing the old canvas\r\n     * comes with massive CPU usage creep which results in 100% CPU usage and\r\n     * the website being unusable after ~15 minutes of running\r\n     */\n    value: function createCanvas() {\n      this.canvas = document.createElement('canvas');\n      this.canvas.width = this.size;\n      this.canvas.height = this.size;\n      this.canvas.hidden = true;\n      this.ctx = this.canvas.getContext('2d');\n      this.ctx.font = this.size + \"px \" + this.font;\n      this.textWidth = Math.ceil(this.ctx.measureText(this.text).width);\n    }\n  }, {\n    key: \"draw\",\n    value: function draw() {\n      this.createCanvas();\n\n      if (this.background) {\n        this.ctx.fillStyle = this.background;\n        this.ctx.rect(0, 0, this.size, this.size);\n        this.ctx.fill();\n      } else {\n        this.ctx.clearRect(0, 0, this.size, this.size);\n      }\n\n      this.pixelsScrolled += this.step;\n\n      if (this.pixelsScrolled > this.textWidth + 2 * this.size) {\n        // 2 * this.size to begin and end with blank canvas\n        this.pixelsScrolled = 0; // loop around\n      }\n\n      var canvasWidthOffset = -1 * this.pixelsScrolled + this.size; // negation of pixelsScrolled because canvas scrolls left-to-right\n      // add this.size to begin rendering with blank canvas\n\n      this.ctx.fillStyle = this.color;\n      this.ctx.fillText(this.text, canvasWidthOffset, this.size - this.marginBottom);\n      this.favicon.href = this.canvas.toDataURL('image/png', 0.3);\n    }\n  }]);\n\n  return FaviconMarquee;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (FaviconMarquee);\n\n//# sourceURL=webpack://FaviconMarquee/./src/main.js?");

/***/ })

/******/ })["default"];