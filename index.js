#!/usr/bin/env node
const ncal = require('./src/ncal.js');
const options = require('commander');
const pkg = require('./package.json');


options
    .name('onkel')
    .description('A commandline calendar inspired by tools like cal, pal and ncal.')
    .usage('[options] <<month> year>')
    .version(pkg.version, '-v, --version')
    .option('-l, --locale <locale>',  'Select a locale.')
    .option('-L, --listLocales',  'List available locales.')
    .option('-y, --year', 'Display a calendar for the specified year.' )
    .option('-n, --noHighlights', 'No highlights at all. (Overrides -H).')
    .option('-H, --highlights [dates]', 'Comma separated lists of dates to highlight. This does not affect which month and year is shown.')
    .option('-c, --columns <number>', 'Number of month per row', parseInt)
    .parse(process.argv);

ncal.exec(options, process.stdout);


