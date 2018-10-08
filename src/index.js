const ncal = require('./ncal.js');
const options = require('commander');

options
    .version("0.0.1")
    .parse(process.argv);


ncal.exec(options);


