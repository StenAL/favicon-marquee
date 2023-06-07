## 2.0.0
- Render OffscreenCanvas in a web worker instead of the main thread
- Don't create new link elements each time the canvas is started
- Reuse existing favicon link element if one exists

## 1.3.0
- Fix resource leak in canvas drawing code
- Use OffscreenCanvas for drawing the canvas if available
- Remove size parameter
- Emit ES2022 code from TypeScript