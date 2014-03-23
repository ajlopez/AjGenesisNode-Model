
var removetask = require('../remove'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis'),
    fsutils = require('./lib/fsutils');
    
exports['remove project'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(path.join(__dirname, 'models'));
    process.chdir('test');
    ajgenesis.createDirectory('models');
    
    var filename = path.resolve(path.join(__dirname, 'models', 'project1.json'));
    fs.writeFileSync(filename, '{ "project1": true }');
    
    removetask(null, ['project1'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(!fs.existsSync(filename));
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['remove project property'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(path.join(__dirname, 'models'));
    process.chdir('test');
    ajgenesis.createDirectory('models');
    
    var filename = path.resolve(path.join(__dirname, 'models', 'project2.json'));
    fs.writeFileSync(filename, '{ "project2": { "name": "myproject", "title": "My Project" } }');
    
    removetask(null, ['project2', 'title'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(fs.existsSync(filename));
        var text = fs.readFileSync(filename).toString();
        eval("var model = " + text);
        
        test.ok(model);
        test.ok(model.project2);
        test.ok(model.project2.name);
        test.equal(model.project2.name, "myproject");
        test.strictEqual(model.project2.title, undefined);
        
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
