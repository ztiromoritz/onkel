const moment = require("moment");

const parseYearArg = (str) => {
    const year = parseInt(str);
    if (isNaN(year)) {
        throw new Error(`Year argument is not a year [${str}]`);
    }
    return year;
}

const parseMonthArg = (str) => {
    const month = parseInt(str);
    if (isNaN(month) || month < 1 || month > 12) {
        throw new Error(`Month argument is is not in 1..12 [${str}]`);
    }
    return month - 1;
}

const getYearLayout = (options, yearOverride) => {
    const year = (typeof yearOverride !== 'undefined') ? parseYearArg(yearOverride) : parseYearArg(options.args[0]);
    const columns = (options.columns > 0) ? options.columns : 3;
    const matrix = [];
    for (let month = 0; month < 12; month++) {
        let row;
        if (month % columns === 0) {
            row = [];
            matrix.push(row);
        } else {
            row = matrix[Math.floor(month / columns)];
        }
        row.push({year, month});
    }
    const yearTitleRows = [];
    yearTitleRows[0] = year;
    return {
        matrix,
        yearTitleRows,
        colCount: columns,
        rowCount: matrix.length,
        yearInMonthTitle: false
    };
}

const getMonthLayout = (year, month) => {
    const matrix = [[{year, month}]];
    return {
        matrix,
        colCount: 1,
        rowCount: 1,
        yearInMonthTitle: true,
        yearTitleRows: []
    };
}


const getLayoutRange = (options, from, to) => {
    const fromMoment = moment().month(from.month).year(from.year);
    const toMoment = moment().month(to.month).year(to.year);
    const current = fromMoment.clone();
    const count = toMoment.diff(fromMoment, 'month');
    const columns = (options.columns > 0) ? options.columns : 3;
    const matrix = [];
    for (let month = 0; month <= count; month++) {
        let row;
        if (month % columns === 0) {
            row = [];
            matrix.push(row);
        } else {
            row = matrix[Math.floor(month / columns)];
        }
        row.push({year: current.year(), month: current.month()});
        current.add(1, 'month');
    }
    return {
        matrix,
        yearTitleRows: [],
        colCount: columns,
        rowCount: matrix.length,
        yearInMonthTitle: true
    };
};

const getLayoutWithContext = (options, before, after) => {

    const year = moment().year();
    const month = moment().month();
    const current = moment().month(month).year(year).subtract(before, 'month');
    const count = before + after + 1;
    const entries = [];
    for (let i = 0; i < count; i++) {
        entries.push({year: current.year(), month: current.month()})
        current.add(1, 'month');
    }

    // if the first year reaches the column count there are yearTitleRows
    const matrix = [entries];


    return {
        matrix,
        colCount: count,
        rowCount: 1,
        yearInMonthTitle: true,
        yearTitleRows: []
    };
};


/**
 * Creates a layout model.
 * Example
 * {
 *    // Month to show ordered in rows and columns
 *    // month - in entry has to go from 0 to 11,
 *    // year - has to be set on every entry
 *    // Rows can have arbitrary length
 *    matrix: [
 *      [{month: 0, year: 2019}], [{month: 1, year: 2019}], [{month: 2, year: 2019}], [{month: 3, year: 2019}],
 *      [{month: 4, year: 2019}], [{month: 5, year: 2019}], [{month: 6, year: 2019}], [{month: 7, year: 2019}],
 *      [{month: 8, year: 2019}], [{month: 9, year: 2019}], [{month: 10, year: 2019}], [{month: 11, year: 2019}]
 *      [{month: 0, year: 2020}], [{month: 1, year: 2020}], [{month: 2, year: 2020}], [{month: 3, year: 2020}],
 *
 *    ],
 *    colCount : 4, // the length of the longest row
 *    rowCount : 1, // matrix.length aka number of rows to print
 *    yearInMonthTitle : true, // flag, if the month title should include the current year
 *    yearTitleRows: [2019, null, null, 2020] // Title lines that should be included before a certain row. This is a sparse array of year numbers.
 * }
 *
 * @param options
 * @returns {{matrix, colCount, rowCount, yearInMonthTitle, yearTitleRows}|*}
 */
function getLayout(options) {
    const args = options.args;

    // TODO: handle option clashes

    // Get current date to show
    let year = moment().year();
    let month = moment().month();
    if (args.length === 1){
        year = parseYearArg(options.args[0])
    }else if (args.length > 1){
        year = parseYearArg(options.args[1]);
        month = parseMonthArg(options.args[0]);
    }

    // Calc mode
    if (options['3']) {
        const from = moment().year(year).month(month).subtract(1, 'month');
        const to = moment().year(year).month(month).add(1, 'month');
        return getLayoutRange(options,
            {year: from.year(), month: from.month()},
            {year: to.year(), month: to.month()});
    } else if(options['after'] || options['before']){
        const after = options['after']?options['after']:0;
        const before = options['before']?options['before']:0;
        const from = moment().year(year).month(month).subtract(before, 'month');
        const to = moment().year(year).month(month).add(after, 'month');
        return getLayoutRange(options,
            {year: from.year(), month: from.month()},
            {year: to.year(), month: to.month()});
    } else if (args.length === 0) {
        if (options.year) {
            return getYearLayout(options, moment().year());
        } else {
            return getMonthLayout(year, month);
        }
    } else if (args.length === 1) {
        return getYearLayout(options);
    } else if (args.length > 1) {
        return getMonthLayout(year, month);
    }
}

module.exports = {
    getLayout
};