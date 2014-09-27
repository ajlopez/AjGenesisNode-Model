
var path = require('path');
var async = require('simpleasync');

function install(ajgenesis, cb) {
    ajgenesis.createDirectory('ajgenesis');
    ajgenesis.createDirectory(path.join('ajgenesis', 'modules'));
    ajgenesis.createDirectory(path.join('ajgenesis', 'modules', 'model'));
    
    async()
    .then(function (data, next) {
        ajgenesis.copyFile(path.join(__dirname, 'set.js'), path.join('ajgenesis', 'modules', 'model', 'set.js'), next);
    })
    .then(function (data, next) {
        ajgenesis.copyFile(path.join(__dirname, 'remove.js'), path.join('ajgenesis', 'modules', 'model', 'remove.js'), cb);
    })
    .fail(function (err) {
        cb(err, null);
    })
    .run();
}

module.exports = {
    install: install
}