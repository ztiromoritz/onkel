const assert = require('assert');
const formatter = require('../src/formatter.js');

describe('formatter',()=>{

    it('color',()=>{
        formatter.configure({});
        assert.equal(formatter.headline('Hello'), '\u001b[7mHello\u001b[27m')
        assert.equal(formatter.marked('Hello'), '\u001b[7mHello\u001b[27m')

    })

    it('color spaces', ()=>{
        formatter.configure({});
        assert.equal(formatter.marked(' '), '\u001b[7m \u001b[27m');
        assert.equal(formatter.headline(' '), '\u001b[7m \u001b[27m');
    })

    it('undeline',()=>{
        formatter.configure({'decoration':'underline'});
        assert.equal(formatter.headline('Hello'), 'H̲e̲l̲l̲o̲')
        assert.equal(formatter.marked('Hello'), 'H̲e̲l̲l̲o̲')
    })

    it('undeline spaces',()=>{
        formatter.configure({'decoration':'underline'});
        assert.equal(formatter.marked(' '), ' ');
        assert.equal(formatter.headline(' '), ' ');
    })

    it('none',()=>{
        formatter.configure({'decoration':'none'});
        assert.equal(formatter.headline('Hello'), 'Hello')
        assert.equal(formatter.marked('Hello'), 'Hello')
        assert.equal(formatter.marked(' '), ' ')
    })

})