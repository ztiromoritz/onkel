const assert = require('assert');
const onkel = require('../src/onkel.js');
const exec = require('child_process').exec;

describe('CLI smoke tests', () => {

    it('Exit code 0 - no arguments', (done)=>{
        exec('./index.js', (error)=>{
            assert.equal(error, null);
            done();
        })
    })

    it('Exit code 0 - on -y', (done)=>{
        exec('./index.js -y', (error)=>{
            assert.equal(error, null);
            done();
        })
    })

    it('Exit code 0 - on --listLocales locales', (done)=>{
        exec('./index.js --listLocales', (error)=>{
            assert.equal(error, null);
            done();
        })
    })

    it('Exit code 0 - on -3', (done)=>{
        exec('./index.js -3', (error)=>{
            assert.equal(error, null);
            done();
        })
    })

    it('Exit code !=0 - on unknow option', (done)=>{
        exec('./index.js --unknownOption', (error)=>{
            assert.notEqual(error, null);
            done();
        })
    })

});