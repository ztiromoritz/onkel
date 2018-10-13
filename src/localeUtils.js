const fs = require('fs');
const moment = require("moment");
const {spaces, center, padRight} = require('./stringUtils.js');
const formatter = require('./formatter.js');

const listLocales = (writeLine) => {
    const cols = 10;
    const colWidth = 9
    writeLine(formatter.headline(center('Locales', cols * colWidth)));
    const locales = fs.readdirSync('./node_modules/moment/locale')
        .map(filename => filename.replace(/\.[^/.]+$/, ""));
    let line = '';
    for (let i = 0; i < locales.length; i++) {
        if (i % cols === 0) {
            writeLine(line);
            line = '';
        }
        line += padRight(locales[i], colWidth);
    }

};

const setLocale = (options) => {
    if (typeof(options.locale) === 'string') {
        moment.locale(options.locale);
    }
}

module.exports = {listLocales, setLocale};