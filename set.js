
var path = require('path'),
    fs = require('fs');

module.exports = function (model, args, ajgenesis, cb) {
    var entityname = args[0];
    
    ajgenesis.createModelDirectory();
    
    model = ajgenesis.loadModel(entityname);
    
    if (!model[entityname])
        model[entityname] = { };

    var l = args.length;
    
    for (k = 1; k < args.length; k++) {
        var pair = args[k];
        var pos = pair.indexOf('=');
        var name;
        var value;
        
        if (pos >= 0) {
            name = pair.substring(0, pos).trim();
            value = pair.substring(pos + 1).trim();        
            var intvalue = asInteger(value);
            
            if (intvalue != null)
                value = intvalue;
        }
        else {
            name = pair;
            value = true;
        }
        
            
        if (value === 'true')
            value = true;
        if (value === 'false')
            value = false;
        
        model[entityname][name] = value;
    }

    ajgenesis.saveModel(entityname, model);
    
    cb();
}

function asInteger(value) {
    value = value.trim();
    
    for (var n in value)
        if (value[n] < '0' || value[n] > '9')
            return null;
            
    return parseInt(value);
}