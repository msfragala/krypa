var glob = require('globby').sync;
var Path = require('path');
var read = require('fs').readFileSync;
var traverse = require('traverse');
var normalize = require('./lib/normalize');

module.exports = function(parser) {
  return krypa.bind(parser);
}

function krypa(globs, base) {
  var parse = this;
  var sitemap = {};
  var files = glob(globs);
  var crawler = traverse(sitemap);
  var i = 0, path, data;

  for(i = 0; i < files.length; i++) {
    path = normalize(files[i], base);
    data = parse(read(files[i])).data;
    crawler.set(path, data);
  }

  return sitemap;

}
