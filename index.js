#!/usr/bin/env node
const onkel = require('./src/onkel.js');
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
    .option('-t, --textOnly', 'No color escape sequences.')
    .option('-n, --noHighlights', 'No highlights at all. (Overrides -H).')
    .option('-H, --highlights [dates]', 'Comma separated lists of dates to highlight. This does not affect which month and year is shown.')
    .option('-c, --columns <number>', 'Number of month per row', parseInt)
    .option('-A, --after <number>', 'Display the number of months after the current month.', parseInt)
    .option('-B, --before <number>', 'Display the number of months before the current month.', parseInt)
    .option('-3', 'Display the previous, current and next month surrounding today.')
    .parse(process.argv);

try {
    onkel(options, process.stdout);
}catch(e){
    console.error((e.message)?e.message:e);
    process.exit(1);
}

