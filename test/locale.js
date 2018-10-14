const assert = require('assert');
const {setLocale, listLocales} = require('../src/locale.js');
const fs = require('fs');

describe('locale', () => {
    it('listLocales', () => {
        let result = '';
        listLocales((str)=>result+=str+'\n');
        const lines = result.split('\n');
        const title = lines[0];
        const locales = lines.slice(1).join('').trim().replace(/  +/g, ' ').split(' ');
        const files = fs.readdirSync('./node_modules/moment/locale');
        assert.equal(locales.length, files.length);
    });
});
