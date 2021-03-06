# favicon-marquee

![Scrolling text example 1](https://i.imgur.com/o3f9cWL.gif)

![Scrolling text example 2](https://i.imgur.com/OFJRjuK.gif)

> A <10 kB JavaScript class with no dependencies that adds an animated scrolling
> favicon to your website.
> See the [demo](https://laane.xyz/favicon/example1.html).

This package is transpiled and polyfilled to be pre-ES6 compatible which means it
works on all modern browsers

## Install

You can either [download](https://github.com/StenAL/favicon-marquee/archive/master.zip)
the whole project or install it via npm or yarn:

```
$ npm install favicon-marquee
$ yarn add favicon-marquee
```

## Usage

favicon-marquee can be bundled with all major build tools

```
import FaviconMarquee from "favicon-marquee";
```

or loaded using a script tag and used as a global variable

```
<script type="text/javascript" src="path/to/lib/main.js">
// a CDN can also be used
<script src="https://cdn.jsdelivr.net/npm/favicon-marquee@1.1.2/lib/main.js"></script>
```

Now that FaviconMarquee is accessible, you can use it by running the following code

```
const marquee = new FaviconMarquee({
    text: 'easy!",
    font: '"Comic Sans MS", sans-serif',
});
marquee.start();
```

This will start the marquee in your current tab with the text `easy!`

FaviconMarquee can be customized by passing the following the properties
to its constructor, although sensible defaults are provided:

`text` - text to be displayed in the favicon. This can be any unicode character
including emojis, cyrillic, hangul, etc.  
`font` - font of the text. This can be any valid CSS `font-family` value  
`color` - color of the text to be displayed. Can be any valid CSS `color` value  
`background` - color of the marquee's background. Transparent by default. Can be
any valid CSS `color` value  
`step` - specifies how many pixels the marquee scrolls each render. This can be used
to speed up or slow down the text  
`size` - size of the canvas used to render the marquee's text. A larger size results in
a more detailed picture but might cause performance issues  
`marginBottom` - the text rendered is displayed at the bottom of the favicon. This
can optionally be used to add some margin to the bottom to center the text instead

These properties must be wrapped in an object before passing them to the constructor.

Additionally, a number can be passed into the `start` to control how often (in ms) the
marquee is re-rendered.

```
const marquee = new FaviconMarquee({
    text: 'Different text',
    color: '#323330',
    size: 48,
    step: 0.5,
    background: "#F0DB4F",
    marginBottom: 3,
});
marquee.start(1000/30); // renders at 30 fps
```
`marquee.stop()` can be used to stop the marquee at any time, after which it can be restarted again with `marquee.start()`.
## Contributing and Issues

Contributions are always welcome. Anyone can open issues and
pull requests on [GitHub](https://github.com/StenAL/favicon-marquee)

## License

This project is licensed under the [MIT license](https://github.com/StenAL/favicon-marquee/blob/master/LICENSE)
