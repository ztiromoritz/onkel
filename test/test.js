const assert = require('assert');
const ncal = require('../src/ncal.js');

describe('nacl', () => {

    it('One month test', () => {
        const options = {args:[1,2010]};
        const result = ncal.exec(options);
        const expected =
`    January 2010    
Su Mo Tu We Th Fr Sa
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31                  
`;
        console.log(result);
        assert.equal(result,expected)
    })
})
