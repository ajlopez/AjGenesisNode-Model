
var path = require('path'),
    fs = require('fs');

module.exports = function (model, args, ajgenesis, cb) {
    var entityname = args[0];
    
    ajgenesis.createDirectory('models');
    var filename = path.join('models', entityname + '.json');
    var model = { };

    if (fs.existsSync(filename))
        model = require(path.resolve(filename));

    model[args[1]] = args[2];
    
    var text = JSON.stringify(model, null, 4);    
    fs.writeFileSync(filename, text);
    
    cb();
}

