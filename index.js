#!/usr/bin/env node
const onkel = require('./src/onkel.js');
const options = require('commander');
const pkg = require('./package.json');


options
    .name('onkel')
    .description('A commandline calendar inspired by tools like cal, pal and ncal.')
    .usage('[options] <<month> year>')
    .version(pkg.version, '-v, --version', 'ppp')
    .option('-l, --locale <locale>',  'select a locale')
    .option('-L, --listLocales',  'list available locales')
    .option('-y, --year', 'display a calendar for the specified year' )
    .option('-t, --textOnly', 'disable ANSI escape sequence for colors')
    .option('-n, --noHighlights', 'no highlights at all (Overrides -H)')
    .option('-H, --highlights [dates]', 'comma separated lists of dates to highlight')
    .option('-c, --columns <number>', 'number of month per row', parseInt)
    .option('-A, --after <number>', 'display the number of months after the current month', parseInt)
    .option('-B, --before <number>', 'display the number of months before the current month', parseInt)
    .option('-3', 'display the previous, current and next month surrounding today.')
    .parse(process.argv);

try {
    onkel(options, process.stdout);
}catch(e){
    console.error((e.message)?e.message:e);
    process.exit(1);
}

