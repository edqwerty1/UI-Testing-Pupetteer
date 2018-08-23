var builder = require('jest-trx-results-processor');
 
var processor = builder({
    outputFile: 'test-results.trx' // this defaults to "test-results.trx"
});
 
module.exports = processor;