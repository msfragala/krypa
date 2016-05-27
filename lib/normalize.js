var Path = require('path');
var sep = Path.sep;

module.exports = function(path, base) {
  var path = ensureAbsolute(path);
  var base = ensureAbsolute(base);
  var set = Path.parse(path);
  set.name = setIndex(set.name);
  set.dir = Path.relative(base, set.dir);
  return Path.join(set.dir, set.name).split(sep);
}

function ensureAbsolute(path) {
  return !Path.isAbsolute(path)
    ? Path.resolve(path)
    : path;
}

function setIndex(base) {
  return base !== 'index'
    ? base + '/index'
    : base;
}
