
var settask = require('../set'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis'),
    fsutils = require('./lib/fsutils');
    
var ajgenesisdir = path.join(__dirname, 'ajgenesis');
var modeldir = path.join(__dirname, 'ajgenesis', 'models');
    
exports['set empty project'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    
    process.chdir('test');
    
    settask(null, ['project0'], ajgenesis, function (err) {
        if (err)
            throw err;

        var model = loadModel('project0');
        
        test.ok(model);
        
        fsutils.removeDirSync(ajgenesisdir);
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['set project title'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    
    process.chdir('test');
    
    settask(null, ['project1', 'title=My Project'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = ajgenesis.loadModel(path.join(modeldir, 'project1.json'));
        
        test.ok(model);
        test.ok(model);
        test.ok(model.title);
        test.equal(model.title, 'My Project');
        
        fsutils.removeDirSync(ajgenesisdir);
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['set project version as integer'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    
    process.chdir('test');
    
    settask(null, ['project2', 'version=1'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = loadModel('project2');

        test.ok(model);
        test.ok(model);
        test.ok(model.version);
        test.strictEqual(model.version, 1);
        
        fsutils.removeDirSync(path.join(__dirname, 'ajgenesis', 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['set project properties'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(path.join(__dirname, 'ajgenesis', 'models'));
    
    process.chdir('test');
    
    settask(null, ['project3', 'name=myproject', 'title=My Project', 'version=0.0.1'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = loadModel('project3');

        test.ok(model);
        test.ok(model);
        test.ok(model.name);
        test.equal(model.name, 'myproject');
        test.ok(model.title);
        test.equal(model.title, 'My Project');
        test.ok(model.version);
        test.equal(model.version, '0.0.1');
        
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['set project properties preserving existing ones'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    
    process.chdir('test');
    ajgenesis.fs.createDirectory('ajgenesis', 'models');
    var filename = path.join(modeldir, 'project4.json');
    
    fs.writeFileSync(filename, '{ "original": "one" }');
    
    settask(null, ['project4', 'name=myproject', 'title=My Project', 'version=0.0.1'], ajgenesis, function (err) {
        if (err)
            throw err;
                                    
        var model = loadModel('project4');

        test.ok(model);
        test.ok(model.name);
        test.equal(model.name, 'myproject');
        test.ok(model.title);
        test.equal(model.title, 'My Project');
        test.ok(model.version);
        test.equal(model.version, '0.0.1');
        test.ok(model.original);
        test.equal(model.original, 'one');
        
        fsutils.removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}

exports['set required and autocomplete as booleans'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    
    process.chdir('test');
    
    settask(null, ['entity1', 'required=true', 'autocomplete=false'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = ajgenesis.loadModel('entity1');

        test.ok(model);
        test.strictEqual(model.required, true);
        test.strictEqual(model.autocomplete, false);
        
        fsutils.removeDirSync(ajgenesisdir);
            
        test.done();
    });
    
    process.chdir(cwd);
}

exports['set required as boolean flag'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    fsutils.removeDirSync(ajgenesisdir);
    
    process.chdir('test');
    
    settask(null, ['entity2', 'required'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = ajgenesis.loadModel('entity2');

        test.ok(model);
        test.strictEqual(model.required, true);
        
        fsutils.removeDirSync(ajgenesisdir);
            
        test.done();
    });
    
    process.chdir(cwd);
}

function loadModel(name) {
    var filename = path.join(modeldir, name + '.json');
    var content = fs.readFileSync(filename).toString();
    
    var model;
    
    eval('model = ' + content);
    
    return model;
}

