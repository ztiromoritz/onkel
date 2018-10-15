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

    it('Current year', ()=>{
        const layout = getLayout({args: [], 'year': true});
        const currentYear = (new Date()).getFullYear();
        assert.deepEqual(layout, {
            matrix: [[
                {year: currentYear, month: 0},
                {year: currentYear, month: 1},
                {year: currentYear, month: 2},
            ], [
                {year: currentYear, month: 3},
                {year: currentYear, month: 4},
                {year: currentYear, month: 5},
            ], [
                {year: currentYear, month: 6},
                {year: currentYear, month: 7},
                {year: currentYear, month: 8},
            ], [
                {year: currentYear, month: 9},
                {year: currentYear, month: 10},
                {year: currentYear, month: 11},
            ]],
            colCount: 3,
            rowCount: 4,
            yearInMonthTitle: false,
            yearTitleRows: [currentYear]
        });
    })

    it('Colum count 7, one year', ()=>{
        const layout = getLayout({args: ['1982'], 'columns': 7});
        assert.deepEqual(layout, {
            matrix : [[
                {year: 1982, month: 0},
                {year: 1982, month: 1},
                {year: 1982, month: 2},
                {year: 1982, month: 3},
                {year: 1982, month: 4},
                {year: 1982, month: 5},
                {year: 1982, month: 6},
            ], [
                {year: 1982, month: 7},
                {year: 1982, month: 8},
                {year: 1982, month: 9},
                {year: 1982, month: 10},
                {year: 1982, month: 11},
            ]],
            colCount: 7,
            rowCount: 2,
            yearInMonthTitle: false,
            yearTitleRows: [1982]
        })
    });

    it('Colum count 7, two years', ()=>{
        const layout = getLayout({args: ['1982'], 'columns': 7, 'after': 12});
        assert.deepEqual(layout, {
            matrix : [[
                {year: 1982, month: 0},
                {year: 1982, month: 1},
                {year: 1982, month: 2},
                {year: 1982, month: 3},
                {year: 1982, month: 4},
                {year: 1982, month: 5},
                {year: 1982, month: 6}
            ], [
                {year: 1982, month: 7},
                {year: 1982, month: 8},
                {year: 1982, month: 9},
                {year: 1982, month: 10},
                {year: 1982, month: 11},
                {year: 1983, month: 0},
                {year: 1983, month: 1}
            ],[
                {year: 1983, month: 2},
                {year: 1983, month: 3},
                {year: 1983, month: 4},
                {year: 1983, month: 5},
                {year: 1983, month: 6},
                {year: 1983, month: 7},
                {year: 1983, month: 8}
            ],[
                {year: 1983, month: 9},
                {year: 1983, month: 10},
                {year: 1983, month: 11}
            ]],
            colCount: 7,
            rowCount: 4,
            yearInMonthTitle: true,
            yearTitleRows: []
        })
    });




    it('Current month', ()=>{
        const layout = getLayout({args: []});
        const currentYear = (new Date()).getFullYear();
        const currentMonth = (new Date()).getMonth();
        assert.deepEqual(layout, {
            matrix: [[{year: currentYear, month: currentMonth}]],
            colCount: 1,
            rowCount: 1,
            yearInMonthTitle: true,
            yearTitleRows: []
        });
    })

    it('Month out of 1..12 throws error', ()=>{
        assert.throws(()=>getLayout({args: ['0', '1982']}))
        assert.throws(()=>getLayout({args: ['13', '1982']}))
        assert.throws(()=>getLayout({args: ['-1', '1982']}))
    });

    it('Year is not a number', ()=>{
        assert.throws(()=>getLayout({args: ['Booh']}))
    });
    


    it('12 month "-B 11" starting in june', () => {
        const layout = getLayout({args: ['6', '1982'], 'before': 11});

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
            yearInMonthTitle: false,
            yearTitleRows: [1981,,1982]
        });
    })
})