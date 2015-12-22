
var removetask = require('../remove'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis'),
    fsutils = require('./lib/fsutils');

var ajgenesisdir = path.join(__dirname, 'ajgenesis');
var modeldir = path.join(__dirname, 'ajgenesis', 'models');
    
exports['remove model'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    process.chdir('test');
    ajgenesis.fs.createDirectory('ajgenesis', 'models');
    
    var filename = path.resolve(path.join(modeldir, 'model1.json'));
    fs.writeFileSync(filename, '{ "model1": true }');
    
    removetask(null, ['model1'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(!fs.existsSync(filename));
        fsutils.removeDirSync(ajgenesisdir);
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['remove model property'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    process.chdir('test');
    ajgenesis.fs.createDirectory('ajgenesis', 'models');
    
    var filename = path.resolve(path.join(modeldir, 'model2.json'));
    fs.writeFileSync(filename, '{ "name": "myproject", "title": "My Project" }');
    
    removetask(null, ['model2', 'title'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(fs.existsSync(filename));
        var text = fs.readFileSync(filename).toString();
        eval("var model = " + text);
        
        test.ok(model);
        test.ok(model.name);
        test.equal(model.name, "myproject");
        test.strictEqual(model.title, undefined);
        
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['remove model properties'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    process.chdir('test');
    ajgenesis.fs.createDirectory('ajgenesis', 'models');
    
    var filename = path.resolve(path.join(modeldir, 'model3.json'));
    fs.writeFileSync(filename, '{ "name": "myproject", "title": "My Project", "notes": "My notes" }');
    
    removetask(null, ['model3', 'title', 'notes'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(fs.existsSync(filename));
        var text = fs.readFileSync(filename).toString();
        eval("var model = " + text);
        
        test.ok(model);
        test.equal(model.name, "myproject");
        test.strictEqual(model.title, undefined);
        test.strictEqual(model.notes, undefined);
        
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
