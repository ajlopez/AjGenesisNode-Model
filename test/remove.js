
var removetask = require('../remove'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis'),
    fsutils = require('./lib/fsutils');
    
exports['remove model'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(path.join(__dirname, 'models'));
    process.chdir('test');
    ajgenesis.createDirectory('models');
    
    var filename = path.resolve(path.join(__dirname, 'models', 'model1.json'));
    fs.writeFileSync(filename, '{ "model1": true }');
    
    removetask(null, ['model1'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(!fs.existsSync(filename));
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['remove model property'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(path.join(__dirname, 'models'));
    process.chdir('test');
    ajgenesis.createDirectory('models');
    
    var filename = path.resolve(path.join(__dirname, 'models', 'model2.json'));
    fs.writeFileSync(filename, '{ "model2": { "name": "myproject", "title": "My Project" } }');
    
    removetask(null, ['model2', 'title'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(fs.existsSync(filename));
        var text = fs.readFileSync(filename).toString();
        eval("var model = " + text);
        
        test.ok(model);
        test.ok(model.model2);
        test.ok(model.model2.name);
        test.equal(model.model2.name, "myproject");
        test.strictEqual(model.model2.title, undefined);
        
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['remove model properties'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(path.join(__dirname, 'models'));
    process.chdir('test');
    ajgenesis.createDirectory('models');
    
    var filename = path.resolve(path.join(__dirname, 'models', 'model3.json'));
    fs.writeFileSync(filename, '{ "model3": { "name": "myproject", "title": "My Project", "notes": "My notes" } }');
    
    removetask(null, ['model3', 'title', 'notes'], ajgenesis, function (err) {
        if (err)
            throw err;
        
        test.ok(fs.existsSync(filename));
        var text = fs.readFileSync(filename).toString();
        eval("var model = " + text);
        
        test.ok(model);
        test.ok(model.model3);
        test.ok(model.model3.name);
        test.equal(model.model3.name, "myproject");
        test.strictEqual(model.model3.title, undefined);
        test.strictEqual(model.model3.notes, undefined);
        
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
