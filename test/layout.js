const assert = require('assert');
const {getLayout} = require('../src/layout.js');

describe('layout', () => {

    it('Single month', () => {
        const layout = getLayout({args: ['7', '1981']});
        assert.deepEqual(layout, {
            matrix: [[{year: 1981, month: 6}]],
            colCount: 1,
            rowCount: 1,
            yearInMonthTitle: true,
            yearTitleRows: []
        });
    })

    it('Three month', () => {
        const layout = getLayout({args: ['7', '1981'], '3': true});
        assert.deepEqual(layout, {
            matrix: [[
                {year: 1981, month: 5},
                {year: 1981, month: 6},
                {year: 1981, month: 7}
            ]],
            colCount: 3,
            rowCount: 1,
            yearInMonthTitle: true,
            yearTitleRows: []
        });
    })

    it('Three month starting with January', () => {
        const layout = getLayout({args: ['2', '1981'], '3': true});
        assert.deepEqual(layout, {
            matrix: [[
                {year: 1981, month: 0},
                {year: 1981, month: 1},
                {year: 1981, month: 2}
            ]],
            colCount: 3,
            rowCount: 1,
            yearInMonthTitle: false,
            yearTitleRows: [1981]
        });
    })

    it('A Year', () => {
        const layout = getLayout({args: [1981]});
        assert.deepEqual(layout, {
            matrix: [[
                {year: 1981, month: 0},
                {year: 1981, month: 1},
                {year: 1981, month: 2},
            ], [
                {year: 1981, month: 3},
                {year: 1981, month: 4},
                {year: 1981, month: 5},
            ], [
                {year: 1981, month: 6},
                {year: 1981, month: 7},
                {year: 1981, month: 8},
            ], [
                {year: 1981, month: 9},
                {year: 1981, month: 10},
                {year: 1981, month: 11},
            ]],
            colCount: 3,
            rowCount: 4,
            yearInMonthTitle: false,
            yearTitleRows: [1981]
        });
    })

    it('24 month "-A 23"', () => {
        const layout = getLayout({args: ['1', '1981'], 'after': 23});
        assert.deepEqual(layout, {
            matrix: [[
                {year: 1981, month: 0},
                {year: 1981, month: 1},
                {year: 1981, month: 2},
            ], [
                {year: 1981, month: 3},
                {year: 1981, month: 4},
                {year: 1981, month: 5},
            ], [
                {year: 1981, month: 6},
                {year: 1981, month: 7},
                {year: 1981, month: 8},
            ], [
                {year: 1981, month: 9},
                {year: 1981, month: 10},
                {year: 1981, month: 11},
            ], [
                {year: 1982, month: 0},
                {year: 1982, month: 1},
                {year: 1982, month: 2},
            ], [
                {year: 1982, month: 3},
                {year: 1982, month: 4},
                {year: 1982, month: 5},
            ], [
                {year: 1982, month: 6},
                {year: 1982, month: 7},
                {year: 1982, month: 8},
            ], [
                {year: 1982, month: 9},
                {year: 1982, month: 10},
                {year: 1982, month: 11},
            ]],
            colCount: 3,
            rowCount: 8,
            yearInMonthTitle: false,
            yearTitleRows: [1981, , , , 1982]
        });
    })

    it('24 month "-B 23"', () => {
        const layout = getLayout({args: ['12', '1982'], 'before': 23});
        assert.deepEqual(layout, {
            matrix: [[
                {year: 1981, month: 0},
                {year: 1981, month: 1},
                {year: 1981, month: 2},
            ], [
                {year: 1981, month: 3},
                {year: 1981, month: 4},
                {year: 1981, month: 5},
            ], [
                {year: 1981, month: 6},
                {year: 1981, month: 7},
                {year: 1981, month: 8},
            ], [
                {year: 1981, month: 9},
                {year: 1981, month: 10},
                {year: 1981, month: 11},
            ], [
                {year: 1982, month: 0},
                {year: 1982, month: 1},
                {year: 1982, month: 2},
            ], [
                {year: 1982, month: 3},
                {year: 1982, month: 4},
                {year: 1982, month: 5},
            ], [
                {year: 1982, month: 6},
                {year: 1982, month: 7},
                {year: 1982, month: 8},
            ], [
                {year: 1982, month: 9},
                {year: 1982, month: 10},
                {year: 1982, month: 11},
            ]],
            colCount: 3,
            rowCount: 8,
            yearInMonthTitle: false,
            yearTitleRows: [1981, , , , 1982]
        });
    })

    // gotcha: this is a bug, year line in the middle but not at the beginning
    xit('12 month "-B 11" starting in june', () => {
        const layout = getLayout({args: ['6', '1982'], 'before': 11});

        console.log(layout);
        assert.deepEqual(layout, {
            matrix: [[
                {year: 1981, month: 6},
                {year: 1981, month: 7},
                {year: 1981, month: 8},
            ], [
                {year: 1981, month: 9},
                {year: 1981, month: 10},
                {year: 1981, month: 11},
            ], [
                {year: 1982, month: 0},
                {year: 1982, month: 1},
                {year: 1982, month: 2},
            ], [
                {year: 1982, month: 3},
                {year: 1982, month: 4},
                {year: 1982, month: 5},
            ]],
            colCount: 3,
            rowCount: 4,
            yearInMonthTitle: true,
            yearTitleRows: []
        });
    })
})