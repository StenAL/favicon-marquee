## 2.2.0
- The default step size is now 1 instead of 0.75
  - Subjectively, this makes scrolling feel less sluggish.
- Added a new `fontSize` parameter to control the size of the text

## 2.1.0
- Use ESM worker for OffscreenCanvas worker renderer
    - This enabled removing some duplicate code which decreases (uncompressed) bundle size from 29 kB to 18.6 kB

## 2.0.0
- Render OffscreenCanvas in a web worker instead of the main thread
- Don't create new link elements each time the canvas is started
- Reuse existing favicon link element if one exists

## 1.3.0
- Fix resource leak in canvas drawing code
- Use OffscreenCanvas for drawing the canvas if available
- Remove size parameter
- Emit ES2022 code from TypeScript