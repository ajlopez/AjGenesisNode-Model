
var path = require('path'),
    fs = require('fs');

module.exports = function (model, args, ajgenesis, cb) {
    var entityname = args[0];
    
    var filename = path.join('ajgenesis', 'models', entityname + '.json');
    var model = { };
    model[entityname] = { };

    if (!fs.existsSync(filename)) {
        cb('file does not exists');
        return;
    }
        
    if (args.length == 1) {
        fs.unlinkSync(filename);
        cb();
        return;
    }
        
    model = require(path.resolve(filename));

    var l = args.length;
    
    for (k = 1; k < args.length; k++) {
        var name = args[k];
        
        delete model[entityname][name];
    }
    
    var text = JSON.stringify(model, null, 4);    
    fs.writeFileSync(filename, text);
    
    cb();
}
