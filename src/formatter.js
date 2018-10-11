const colors = require('colors/safe');


const TYPES = {
    "colors": {
        headline: str => colors.inverse(str),
        marked: str => colors.white.bgMagenta(str)
    },

    // unicode only formatter using diacritical marks
    "unicode": {
        headline: str => str.split('').map(c => (c!==' ')?`${c}\u0332`:c).join(''),
        marked: str => str.split('').map(c => (c!==' ')?`${c}\u0332`:c).join('')
    },

    "empty": {
        headline: str => str,
        marked: str => str
    }
};


module.exports = (function () {
    let current = TYPES.colors;

    const formatter = {};
    formatter.setType = (str) => {
        current = TYPES[str] || TYPES.colors;
    }

    formatter.headline = (str) => current.headline(str);
    formatter.marked = (str) => current.marked(str);

    return formatter;
})();