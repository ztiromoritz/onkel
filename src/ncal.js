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
    return moment().locale('de'); // TODO: from settings;
}

function center(str, width) {
    const spaces = width - str.length;
    const before = Math.floor(spaces / 2);
    const after = Math.ceil(spaces / 2);
    return sp(before) + str + sp(after);
}

function yearLine(layout, index) {
    const year = layout.yearBeforeRows[`${index}`];
    if (typeof(year) !== 'undefined') {
        return colors.inverse(center(`${year}`, layout.colCount * LINE_WIDTH + (layout.colCount - 1) * H_SPACE.length));
    }
    return false;
}
;

function monthLine(cell, layout) {
    const current = (typeof(cell.month) !== 'undefined') ? m().month(cell.month) : m();
    let str = current.format('MMMM');
    if (layout.yearInMonthTitle) {
        str = `${str} ${cell.year}`;
    }
    return center(str, LINE_WIDTH);
}

function dayLine(year) {
    return range(0, 6)
        .map(n => m().weekday(n).format('dd'))
        .map(str => (str.length === 1) ? ' ' + str : str)   // pad if short form is only one sign. For example AR
        // TODO: are there short forms with length>2
        .join(' ');
}

function* dateLines(cell, marker) {
    const {month, year} = cell;
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
        current.date(i);
        let str = "" + i;
        str = (str.length === 1) ? ` ${str}` : `${str}`;
        if (marker && marker(current.clone())) {
            str = colors.red(str);
        }
        result += str;
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


function Matrix(...rows) {
    rows.map2 = (cb) => {
        return rows.map(row => row.map(cell => cb(cell)));
    }
    return rows;
}

const parseYearArg = (str) => {
    const year = parseInt(str);
    if(isNaN(year)){
        throw new Error(`Year argument is not a year [${str}]`);
    }
    return year;
}
const parseMonthArg = (str) => {
    const month = parseInt(str);
    if(isNaN(month) || month < 1 || month > 12){
        throw new Error(`Month argument is is not in 1..12 [${str}]`);
    }
    return month - 1;
}

function getYearLayout(options) {
    const year = parseYearArg(options.args[0]);
    const columns = (options.columns > 0) ? options.columns : 3;
    const matrix = [];
    for (let month = 0; month < 12; month++) {
        let row;
        if (month % columns === 0) {
            row = [];
            matrix.push(row);
        }else{
            row = matrix[Math.floor(month/columns)];
        }
        row.push({year,month});
    }
    return {
        matrix,
        colCount : columns,
        rowCount :  matrix.length,
        yearInMonthTitle: false,
        yearBeforeRows: {"0": year}
    };
}

function getMonthLayout(year,month){
    const matrix = [[{year,month}]];
    return {
        matrix,
        colCount : 1,
        rowCount :  1,
        yearInMonthTitle: true,
        yearBeforeRows: {}
    };
}


function getLayout(options) {
    const args = options.args;
    let year, month;
    if (args.length === 0) {
        
        const year = moment().year();
        const month = moment().month();
        return getMonthLayout(year,month);
    } else if (args.length === 1) {
        return getYearLayout(options);
    } else if (args.length > 1) {
        const year = parseYearArg(options.args[1]);
        const month = parseMonthArg(options.args[0]);
        return getMonthLayout(year, month);
    }
    //
    // TODO: this is just example data
    //
    const matrix = Matrix(
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11])
        .map2(month => {
            return {month, year: 2019}
        });
    const layout = {
        matrix,
        colCount: 4,
        rowCount: matrix.length,
        yearInMonthTitle: false,
        yearBeforeRows: {"0": 2019}
    };
    return layout;
}


function getMarker(options) {
    if (typeof(options.highlights) === 'string') {
        const dates = options.highlights.split(',').map(str => moment(str));
        return (aMoment) => !!dates.find(m => m.isSame(aMoment, 'day'))
    }
    return (aMoment) => false;
};


ncal.exec = function (options, out) {


    const ln = (str) => {
        if (str) {
            out.write(`${str}\n`)
        }
    };
    const marker = getMarker(options);
    const layout = getLayout(options);

    layout.matrix.map((matrixLine, index) => {
        ln(yearLine(layout, index));
        ln(matrixLine.map(cell => monthLine(cell, layout)).join(H_SPACE));
        ln(matrixLine.map(cell => dayLine()).join(H_SPACE));
        const iterators = matrixLine.map(cell => dateLines(cell, marker));
        for (let l = 0; l < MAX_DATE_LINES; l++) {
            const line = iterators
                .map(it => it.next())
                .map(next => next.done ? EMPTY_LINE : next.value)
                .join(H_SPACE);
            ln(line);
        }
        ln();
    });


};


module.exports = ncal;