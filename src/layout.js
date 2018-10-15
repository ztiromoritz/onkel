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

const monthGen = function* (from, to){
    const current = from.clone();
    while (current.isSameOrBefore(to, 'month')) {
        yield [current.year(), current.month()];
        current.add(1, 'month');
    }
}


const getLayoutRange = (options, from, to) => {
    const allMonth = monthGen(from,to)
    const count = to.diff(from, 'month') + 1 ;
    const columns = (options.columns > 0) ? options.columns : 3;
    const matrix = [];
    const spreadYears = [];

    // Fill matrix
    let n = 0;
    let row;
    for (let [year, month] of allMonth) {
        if (n % columns === 0) {
            row = [];
            matrix.push(row);
        } else {
            row = matrix[Math.floor(n / columns)];
        }
        if (!spreadYears.includes(year)) {
            spreadYears.push(year);
        }
        row.push({year, month});
        n++;
    }


    // Set yearTitleRows, yearInMonthTitle behaviour
    const yearTitleRows = [];
    const isDivider = [1, 2, 3, 4, 6, 12].includes(columns);
    if (count === 1) {
        // noop;
    } else if (spreadYears.length === 1) {
        if (matrix[0][0].month === 0) {
            yearTitleRows[0] = spreadYears[0];
        }
    } else {
        if (isDivider) {
            // check first line
            if(matrix[0][0].month % columns === 0){
                // We know we will find Januaries as first element in row,
                // so there will be titles, therefore we have to start with a
                // title row in any way
                yearTitleRows[0] = matrix[0][0].year;
            }
            for (let n = 1; n < matrix.length; n++) {
                if (matrix[n][0].month=== 0) {
                    yearTitleRows[n] = matrix[n][0].year;
                }
            }
        }
    }

    return {
        matrix,
        yearTitleRows,
        colCount: Math.min(columns,count),
        rowCount: matrix.length,
        yearInMonthTitle: (yearTitleRows.length === 0)
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
    const after = options['after'] ? options['after'] : 0;
    const before = options['before'] ? options['before'] : 0;

    // Calc mode
    if (options['3']) {
        const from = moment().year(year).month(month).subtract(1, 'month');
        const to = moment().year(year).month(month).add(1, 'month');
        return getLayoutRange(options, from, to);
    } else if (options.year || args.length === 1) {
        // A whole year (+A, +B)
        const from = moment().year(year).month(0).subtract(before, 'month');
        const to = moment().year(year).month(11).add(after, 'month');
        return getLayoutRange(options, from, to);
    } else {
        // single month (+A,+B)
        const from = moment().year(year).month(month).subtract(before, 'month');
        const to = moment().year(year).month(month).add(after, 'month');
        return getLayoutRange(options, from, to);
    }
}

module.exports = {
    getLayout
};