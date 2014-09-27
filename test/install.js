
var hello = require('..');
var path = require('path');
var fs = require('fs');
var ajgenesis = require('ajgenesis');

exports['Install module'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir(__dirname);
    
    hello.install(ajgenesis, function (err, data) {
        test.ok(!err);
        test.ok(fs.existsSync('ajgenesis'));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules', 'model')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules', 'model', 'set.js')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'modules', 'model', 'remove.js')));
        process.chdir(cwd);
        test.done();
    });
}