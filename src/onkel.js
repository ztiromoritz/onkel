const moment = require("moment");
const fs = require('fs');
const formatter = require('./formatter.js');
const {getLayout} = require('./layout.js');
const {setLocale, listLocales} = require('./locale.js');
const {spaces, center} = require('./string.js');


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

function yearLine(layout, index) {
    const year = layout.yearTitleRows[index];
    if (typeof(year) !== 'undefined') {
        return formatter.headline(center(`${year}`, layout.colCount * LINE_WIDTH + (layout.colCount - 1) * H_SPACE.length));
    }
    return false;
}


function monthLine({year, month}, layout) {
    const current =  moment().month(month);
    let str = current.format('MMMM');
    if (layout.yearInMonthTitle) {
        str = `${str} ${year}`;
    }
    return center(str, LINE_WIDTH);
}

function dayLine(year) {
    return range(0, 6)
        .map(n => moment().weekday(n).format('dd'))
        .map(str => str.padStart(2))
        .join(' ');
}

function padFirstRow(offset) {
    return spaces(offset * 3);
}

function padLastRow(offset, daysInMonth) {
    return spaces((7 - (daysInMonth + offset) % 7) * 3 - 1);
}

function* dateLines({year, month}, marker) {
    const current = moment().year(year).month(month);
    const firstWeekday = moment().weekday(0).day();
    const firstWeekdayOfMonth = current.date(1).day();
    const daysInMonth = current.daysInMonth();
    const offset = mod(firstWeekdayOfMonth - firstWeekday, 7);
    const mark = (str, day) => {
        current.date(day);
        return (marker(current))?formatter.marked(str):str;
    }
    const linebreak = (day)=>(day + offset) % 7 === 0;
    let row = padFirstRow(offset);
    for (let day = 1; day <= daysInMonth; day++) {
        let label = `${day}`;
        label = label.padStart(2);
        label = mark(label, day);
        row += label;
        if (linebreak(day)) {
            yield row;
            row = '';
        } else {
            row += ' ';
        }
    }
    row += padLastRow(offset, daysInMonth);
    yield row;
}

function getMarker(options) {
    if (options.noHighlights){
        return (aMoment) => false;
    }
    if (typeof(options.highlights) === 'string') {
        const dates = options.highlights.split(',').map(str => moment(str));
        return (aMoment) => !!dates.find(m => m.isSame(aMoment, 'day'))
    }
    return (aMoment) => {
        return moment().isSame(aMoment, 'day');
    };
}

function printCalendar(options, writeLine) {
    const marker = getMarker(options);
    const layout = getLayout(options);
    layout.matrix.map((matrixLine, index) => {
        writeLine(yearLine(layout, index));
        writeLine(matrixLine.map(cell => monthLine(cell, layout)).join(H_SPACE));
        writeLine(matrixLine.map(cell => dayLine()).join(H_SPACE));
        const iterators = matrixLine.map(cell => dateLines(cell, marker));
        for (let l = 0; l < MAX_DATE_LINES; l++) {
            const line = iterators
                .map(it => it.next())
                .map(next => next.done ? EMPTY_LINE : next.value)
                .join(H_SPACE);
            writeLine(line);
        }
        writeLine(' ');
    });
}

function getWriteLine(out) {
    if (out) {
        return (str) => (!!str) && out.write(`${str}\n`);
    } else {
        let resultString = '';
        const writeLine = function (str) {
            if (!!str)
                resultString += `${str}\n`;
        }
        writeLine.result = () => resultString;
        return writeLine;
    }
}

module.exports = (options, out) => {
    formatter.configure(options);
    setLocale(options);
    const writeLine = getWriteLine(out);
    if (options.listLocales) {
        listLocales(writeLine);
    } else {
        printCalendar(options, writeLine);
    }
    if (typeof(out) === 'undefined')
        return writeLine.result();
};