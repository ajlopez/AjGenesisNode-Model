
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
        test.ok(model.project0);
        
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
        test.ok(model.project1);
        test.ok(model.project1.title);
        test.equal(model.project1.title, 'My Project');
        
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
        test.ok(model.project2);
        test.ok(model.project2.version);
        test.strictEqual(model.project2.version, 1);
        
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
        test.ok(model.project3);
        test.ok(model.project3.name);
        test.equal(model.project3.name, 'myproject');
        test.ok(model.project3.title);
        test.equal(model.project3.title, 'My Project');
        test.ok(model.project3.version);
        test.equal(model.project3.version, '0.0.1');
        
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
    ajgenesis.createDirectory('ajgenesis', 'models');
    var filename = path.join(modeldir, 'project4.json');
    
    fs.writeFileSync(filename, '{ "project4": {  "original": "one" } }');
    
    settask(null, ['project4', 'name=myproject', 'title=My Project', 'version=0.0.1'], ajgenesis, function (err) {
        if (err)
            throw err;
                                    
        var model = loadModel('project4');

        test.ok(model);
        test.ok(model.project4);
        test.ok(model.project4.name);
        test.equal(model.project4.name, 'myproject');
        test.ok(model.project4.title);
        test.equal(model.project4.title, 'My Project');
        test.ok(model.project4.version);
        test.equal(model.project4.version, '0.0.1');
        test.ok(model.project4.original);
        test.equal(model.project4.original, 'one');
        
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
        test.ok(model.entity1);
        test.strictEqual(model.entity1.required, true);
        test.strictEqual(model.entity1.autocomplete, false);
        
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
        test.ok(model.entity2);
        test.strictEqual(model.entity2.required, true);
        
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

