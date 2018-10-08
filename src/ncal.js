const moment = require("moment");
const colors = require('colors/safe');
const ncal = {};

//                 "Mo Di Mi Do Fr Sa So"
const EMPTY_LINE = "                    ";

const LINE_WIDTH = EMPTY_LINE.length;

const MAX_DATE_LINES = 6;

// Space between Month blocks
const H_SPACE = "  ";

function range(from, to) {
    const len = to - from + 1;
    return [...Array(len).keys()].map(i => i + from);
}

function mod(x, n) {
    return ((x % n) + n) % n;
}

function sp(count) {
    return ' '.repeat(count);
}

function m() {
    return moment().locale('en'); // TODO: from settings;
}


function monthLine(month) {
    const current = (typeof(month) !== 'undefined') ? m().month(month) : m();
    const str = current.format('MMMM');
    const spaces = LINE_WIDTH - str.length;
    const before = Math.floor(spaces / 2);
    const after = Math.ceil(spaces / 2);
    return sp(before) + str + sp(after);

}

function dayLine() {
    return range(0, 6)
        .map(n => m().weekday(n).format('dd'))
        .join(' ');
}

function* dateLines(month, year) {
    let current = m();
    if (typeof(month) !== 'undefined') {
        current = current.month(month);
    }
    if (typeof(year) !== 'undefined') {
        current = current.year(year);
    }
    const firstWeekday = m().weekday(0).day();
    const firstWeekdayOfMonth = current.date(1).day();
    const offset = mod(firstWeekdayOfMonth - firstWeekday, 7);
    let result = '';
    result += sp(offset * 3);
    const daysInMonth = current.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
        const str = "" + i;
        result += (str.length === 1) ? ` ${i}` : `${i}`;
        if ((i + offset) % 7 === 0) {
            yield result;
            result = '';
        } else {
            result += ' ';
        }
    }
    result += sp((7 - (daysInMonth + offset) % 7) * 3 - 1);
    yield result;
}


ncal.exec = function (options) {

    // Single month example
    /*
    console.log(monthLine());
    console.log(dayLine());
    for (let line of dateLines()) {
        console.log(line);
    }
    */

    // 12 month example
    const matrix = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [9, 10, 11]
    ];

    matrix.map(matrixLine => {
        console.log(matrixLine.map(month => monthLine(month)).join(H_SPACE));
        console.log(matrixLine.map(month => dayLine()).join(H_SPACE));
        const iterators = matrixLine.map(month => dateLines(month));
        for (let l = 0; l < MAX_DATE_LINES; l++) {
            const line = iterators
                .map(it => it.next())
                .map(next => next.done ? EMPTY_LINE : next.value)
                .join(H_SPACE);
            console.log(line);
        }
        console.log();
    });


    /*
    console.log(dateLines(0));
    console.log(dateLines(1));
    console.log(dateLines(2));
    console.log(dateLines(3));
    console.log(dateLines(4));
    */

};


module.exports = ncal;