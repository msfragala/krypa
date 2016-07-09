var Path = require('path');
var globby = require('globby');
var isGlob = require('is-glob');
var traverse = require('traverse');

/**
 * @callback ParserCallback
 * @param {string} file - Absolute path to a given file
 * @return {Object}
 */

/**
 * @param {string} directory - The directory to reconstruct as a sitemap.
 * @param {Object} options - Options to pass ignore globs and a specific parser.
 * @param {(string|string[])} options.ignore - Globs of files to ignore.
 * @param {Function} options.parser - The function to parse the front-matter.
 */
function krypa(directory, options) {

  var directory = ensureAbsolute(directory);
  var parser = options.parser || require('gray-matter');
  var ignore = options.ignore || '!**/*.{html,md}';

  var sitemap = {};
  var Sitemap = traverse(sitemap);

  var files = findFiles(directory, ignore);
  files.forEach(function(file) {
    var path, data;
    data = parser(file).data;
    path = rebase(directory, file);
    path = ensureIndex(path);
    path = path.split(Path.sep);
    Sitemap.set(path, data);
  });

  return sitemap;

}

/**
 * @param {string} path - The path to make absolute, if not already.
 */
function ensureAbsolute(path) {
  return Path.isAbsolute(path) ? path : Path.resolve(path);
}

/**
 * @param {string} directory - The base directory to glob
 * @param {(string|string[])} - The globs of files to ignore
 */
function findFiles(directory, ignore) {
  var globs = ensureGlob(directory);
  return globby.sync(globs, {
    ignore: ignore,
    nodir: true
  });
}

/**
 * @param {string} path - The path to be globbified, if not already.
 */
function ensureGlob(path) {
  return isGlob(path) ? path : Path.normalize(path + '/**');
}

/**
 * Set a path relative to a given directory
 * @param {string} base - The directory to set `path` relative to
 * @param {string} path - The absolute path to make relative to `base`
 * @return {string} The path given, now as a relative path
 */
function rebase(base, path) {
  return Path.relative(base, path);
}

/**
 * Set the basename of a path to `index`
 * @param {string} path - The path to reindex
 * @return {string} The path given, now with a basename of `index`
 */
function ensureIndex(path) {
  var ext = Path.extname(path);
  var base = Path.basename(path);
  return base === 'index' ? path : Path.join(path, 'index');
}

module.exports = krypa;
