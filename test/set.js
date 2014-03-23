
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
        test.ok(model.title);
        test.equal(model.title, 'My Project');
        
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
        test.ok(model.version);
        test.strictEqual(model.version, 1);
        
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
        test.ok(model.name);
        test.equal(model.name, 'myproject');
        test.ok(model.title);
        test.equal(model.title, 'My Project');
        test.ok(model.version);
        test.equal(model.version, '0.0.1');
        
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
