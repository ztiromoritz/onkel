const colors = require('colors/safe');


const TYPES = {
    "color": {
        headline: str => colors.inverse(str),
        marked: str => colors.inverse(str)
    },

    // unicode only formatter using diacritical marks
    "underline": {
        headline: str => str.split('').map(c => (c!==' ')?`${c}\u0332`:c).join(''),
        marked: str => str.split('').map(c => (c!==' ')?`${c}\u0332`:c).join('')
    },

    "none": {
        headline: str => str,
        marked: str => str
    }
};


module.exports = (function () {
    let current = TYPES.colors;

    const formatter = {};
    const setType = (str) => {
        current = TYPES[str];
    }

    formatter.configure = (options) => {
        if (options.decoration === 'underline') {
            setType('underline');
        } else if (options.decoration === 'none'){
            setType('none');
        } else {
            setType('color');
        }
    }

    formatter.headline = (str) => current.headline(str);
    formatter.marked = (str) => current.marked(str);

    return formatter;
})();