# EMC Captiva License Decoder

This tool is used to decode and summarize EMC Captiva license files. The idea, concept, and functionality came from my dad, Jim Smith. You can see it running (hopefully) at [decoder.kevinjs.com](http://decoder.kevinjs.com).

Obligatory list of libraries, tools, etc:

- [React](https://facebook.github.io/react/)
- [material-ui](http://www.material-ui.com/)
- [Babel](http://babeljs.io/)
- [Webpack](https://webpack.github.io)
- [react-transform](https://github.com/gaearon/babel-plugin-react-transform) 2.0.0 with the [react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre) Babel preset
- [eslint](http://eslint.org/) with [Airbnb's config](https://github.com/airbnb/javascript) (plus some of my own changes)

I took the approach of componentizing everything as much as I could, making many tiny modules instead of fewer large modules. I also tried to keep the codebase as functional and mutation-free as possible.

## Screenshot

![Summary Page](https://github.com/ksmithbaylor/emc-captiva-license-decoder/raw/master/screenshot.png)
