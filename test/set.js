
var settask = require('../set'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');
    
exports['set project title'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    removeDirSync(path.join(__dirname, 'models'));
    
    process.chdir('test');
    
    settask(null, ['project1', 'title', 'My Project'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = ajgenesis.loadModel(path.join(__dirname, 'models', 'project1.json'));
        
        test.ok(model);
        test.ok(model.project1);
        test.ok(model.project1.title);
        test.equal(model.project1.title, 'My Project');
        
        removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['set project version as integer'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    removeDirSync(path.join(__dirname, 'models'));
    
    process.chdir('test');
    
    settask(null, ['project2', 'version', '1'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = ajgenesis.loadModel(path.join(__dirname, 'models', 'project2.json'));

        test.ok(model);
        test.ok(model.project2);
        test.ok(model.project2.version);
        test.strictEqual(model.project2.version, 1);
        
        removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['set project properties'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    removeDirSync(path.join(__dirname, 'models'));
    
    process.chdir('test');
    
    settask(null, ['project3', 'name', 'myproject', 'title', 'My Project', 'version', '0.0.1'], ajgenesis, function (err) {
        if (err)
            throw err;
            
        var model = ajgenesis.loadModel(path.join(__dirname, 'models', 'project3.json'));

        test.ok(model);
        test.ok(model.project3);
        test.ok(model.project3.name);
        test.equal(model.project3.name, 'myproject');
        test.ok(model.project3.title);
        test.equal(model.project3.title, 'My Project');
        test.ok(model.project3.version);
        test.equal(model.project3.version, '0.0.1');
        
        removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}
    
exports['set project properties preserving existing ones'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    removeDirSync(path.join(__dirname, 'models'));
    
    process.chdir('test');
    ajgenesis.createDirectory('models');
    var filename = path.join(__dirname, 'models', 'project4.json');
    
    fs.writeFileSync(filename, '{ "project4": {  "original": "one" } }');
    
    settask(null, ['project4', 'name', 'myproject', 'title', 'My Project', 'version', '0.0.1'], ajgenesis, function (err) {
        if (err)
            throw err;
                                    
        var model = ajgenesis.loadModel(path.join(__dirname, 'models', 'project4.json'));

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
        
        removeDirSync(path.join(__dirname, 'models'));
            
        test.done();
    });
    
    process.chdir(cwd);
}

function removeDirSync(dirname) {
    if (!fs.existsSync(dirname))
        return;
        
    var filenames = fs.readdirSync(dirname);
    
    filenames.forEach(function (filename) {
        filename = path.join(dirname, filename);
        
        if (isDirectory(filename))
            removeDirSync(filename);
        else
            removeFileSync(filename);
    });
    
    fs.rmdirSync(dirname);
}

function removeFileSync(filename) {
    fs.unlinkSync(filename);
}

function isDirectory(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}
