const ncal = require('./src/ncal.js');
const options = require('commander');
const pkg = require('./package.json');


// Note that -h is not supported
options
    .usage('[options] <<month> year>')
    .version(pkg.version, '-v, --version')
    .option('-l, --locale <locale>',  'Select a locale.')
    .option('-L, --listLocales',  'List available locales.')
    .option('-y, --year', 'Display a calendar for the specified year.' )
    .option('-h, --noHighlights', 'No highlights at all. (Overrides -H).')
    .option('-H, --highlights [dates]', 'Comma separated lists of dates to highlight. This does not affect which month and year is shown.')
    .option('-c, --columns <number>', 'Number of month per row', parseInt)
    .parse(process.argv);


//console.log(options.args)

ncal.exec(options, process.stdout);


