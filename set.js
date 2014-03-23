
var path = require('path'),
    fs = require('fs');

module.exports = function (model, args, ajgenesis, cb) {
    var entityname = args[0];
    
    ajgenesis.createDirectory('models');
    var filename = path.join('models', entityname + '.json');
    var model = { };
    model[entityname] = { };

    if (fs.existsSync(filename))
        model = require(path.resolve(filename));

    var l = args.length;
    
    for (k = 1; k < args.length; k += 2) {
        var name = args[k];
        var value = args[k + 1];
        var intvalue = asInteger(value);
        
        if (intvalue != null)
            value = intvalue;
        
        model[entityname][name] = value;
    }
    
    var text = JSON.stringify(model, null, 4);    
    fs.writeFileSync(filename, text);
    
    cb();
}

function asInteger(value) {
    value = value.trim();
    
    for (var n in value)
        if (value[n] < '0' || value[n] > '9')
            return null;
            
    return parseInt(value);
}