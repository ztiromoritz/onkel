const assert = require('assert');
const {spaces, center} = require('../src/string.js');

describe('string', () => {

    it('spaces', () => {
        assert.equal(spaces(), '');
        assert.equal(spaces(0), '');
        assert.equal(spaces(1), ' ');
        assert.equal(spaces(2), '  ');
        assert.equal(spaces(3), '   ');
        assert.equal(spaces(11), '           ');
    })

    it('center', () => {
        assert.equal(center('A', 3), ' A ');
        assert.equal(center('A', 4), ' A  ');
        assert.equal(center('A', 5), '  A  ');
    });

    it('center underflow', () => {
        assert.equal(center('AB', 1), 'A');
    })

})