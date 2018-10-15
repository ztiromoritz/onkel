const fs = require('fs');
const path = require('path');
const moment = require("moment");
const {spaces, center} = require('./string.js');
const formatter = require('./formatter.js');

const listLocales = (writeLine) => {
    const cols = 10;
    const colWidth = 9
    writeLine(formatter.headline(center('Locales', cols * colWidth)));
    const locales = fs.readdirSync(path.resolve(__dirname,'../node_modules/moment/locale'))
        .map(filename => filename.replace(/\.[^/.]+$/, ""));
    let line = '';
    for (let i = 0; i < locales.length; i++) {
        if (i % cols === 0) {
            writeLine(line);
            line = '';
        }
        line += locales[i].padEnd(colWidth);
    }
    writeLine(line);

};

const setLocale = (options) => {
    if (typeof(options.locale) === 'string') {
        moment.locale(options.locale);
    }else{
        moment.locale('en');
    }
}

module.exports = {listLocales, setLocale};