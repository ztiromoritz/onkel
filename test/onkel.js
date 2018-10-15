const assert = require('assert');
const onkel = require('../src/onkel.js');
const Writable = require('stream').Writable;

describe('onkel', () => {

        it('One month test', () => {
            const options = {args:[1,2010]};
            const result = onkel(options);
            const expected =
`    January 2010    
Su Mo Tu We Th Fr Sa
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31`;
            assert.equal(result.trim(),expected.trim())
        });


    it('One month test, arabic', () => {
        const options = {args: [1, 2010], locale: 'ar-kw'};
        const result = onkel(options);
        const expected =
            `    يناير 2010     
 ح  ن  ث  ر  خ  ج  س
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31`;
        assert.equal(result.trim(), expected.trim())
    });

    it('List locales', () => {
        const options = {args: [], listLocales: true};
        const result = onkel(options);

        assert(typeof result === 'string');
        assert(result.trim().length > 0);
    });

    it('Use Stream', () => {
        const options = {args: [], listLocales: true};
        let result = '';
        const out = new Writable({
            objectMode: true,
            write: (data, _, writeDone) => {
                result += data;
                writeDone()
            }
        });
        onkel(options, out);
        assert(result.trim().length > 0);
    });


    it('Highlights', () => {
        const options = {args: [1, 2010], highlights: '2010-01-01,2010-01-02', decoration: 'underline'};
        const result = onkel(options);
        const expected =
            `    January 2010    
Su Mo Tu We Th Fr Sa
                1̲  2̲
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31`;
        assert.equal(result.trim(), expected.trim())
    });


    it('noHighlights', () => {
        const options = {
            args: [1, 2010],
            highlights: '2010-01-01,2010-01-02',
            decoration: 'underline',
            'noHighlights': true
        };
        const result = onkel(options);
        const expected =
            `    January 2010    
Su Mo Tu We Th Fr Sa
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
31`;
        assert.equal(result.trim(), expected.trim())
    });


    it('Full year', () => {
        const options = {args: [2010], decoration: 'none'};
        const result = onkel(options);
        const expected = `2010                              
      January               February               March        
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
                1  2      1  2  3  4  5  6      1  2  3  4  5  6
 3  4  5  6  7  8  9   7  8  9 10 11 12 13   7  8  9 10 11 12 13
10 11 12 13 14 15 16  14 15 16 17 18 19 20  14 15 16 17 18 19 20
17 18 19 20 21 22 23  21 22 23 24 25 26 27  21 22 23 24 25 26 27
24 25 26 27 28 29 30  28                    28 29 30 31         
31                                                              
 
       April                  May                   June        
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
             1  2  3                     1         1  2  3  4  5
 4  5  6  7  8  9 10   2  3  4  5  6  7  8   6  7  8  9 10 11 12
11 12 13 14 15 16 17   9 10 11 12 13 14 15  13 14 15 16 17 18 19
18 19 20 21 22 23 24  16 17 18 19 20 21 22  20 21 22 23 24 25 26
25 26 27 28 29 30     23 24 25 26 27 28 29  27 28 29 30         
                      30 31                                     
 
        July                 August              September      
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
             1  2  3   1  2  3  4  5  6  7            1  2  3  4
 4  5  6  7  8  9 10   8  9 10 11 12 13 14   5  6  7  8  9 10 11
11 12 13 14 15 16 17  15 16 17 18 19 20 21  12 13 14 15 16 17 18
18 19 20 21 22 23 24  22 23 24 25 26 27 28  19 20 21 22 23 24 25
25 26 27 28 29 30 31  29 30 31              26 27 28 29 30      
                                                                
 
      October               November              December      
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
                1  2      1  2  3  4  5  6            1  2  3  4
 3  4  5  6  7  8  9   7  8  9 10 11 12 13   5  6  7  8  9 10 11
10 11 12 13 14 15 16  14 15 16 17 18 19 20  12 13 14 15 16 17 18
17 18 19 20 21 22 23  21 22 23 24 25 26 27  19 20 21 22 23 24 25
24 25 26 27 28 29 30  28 29 30              26 27 28 29 30 31   
31                                                              `;

        assert.equal(result.trim(), expected.trim())
    });

});
