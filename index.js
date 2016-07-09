var Path = require('path');
var fs = require('fs');
var globby = require('globby');
var isGlob = require('is-glob');
var traverse = require('traverse');

/**
 * @callback ParserCallback
 * @param {string} file - Absolute path to a given file
 * @return {Object} The front-matter data of `file`
 */

/**
 * @param {string} directory - The directory to reconstruct as a sitemap.
 * @param {(Object|function)} options - Options to pass ignore globs and a specific parser, or the function to parse the front-matter.
 * @param {(string|string[])} options.ignore - Globs of files to ignore.
 * @param {Function} options.parser - The function to parse the front-matter.
 */
function krypa(directory, options) {

  var directory, parser, ignore;
  var defaultIgnore = '!**/*.{html,md}';

  directory = ensureAbsolute(directory);

  switch (typeof options) {
    case 'function':
      parser = options;
      ignore = defaultIgnore;
      break;
    case 'object':
      parser = options.parser || defaultParser;
      ignore = options.ignore || defaultIgnore;
      break;
    default:
      parser = defaultParser;
      ignore = defaultIgnore;
  }

  var sitemap = {};
  var Sitemap = traverse(sitemap);

  var files = findFiles(directory, ignore);
  files.forEach(function(file) {
    var path, data;
    data = parser(file);
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
 * @param {string} file - The file path to reindex
 * @return {string} The path given, now with a basename of `index`
 */
function ensureIndex(file) {
  var path = Path.parse(file);
  return path.name === 'index'
    ? Path.join(path.dir, path.name)
    : Path.join(path.dir, path.name, 'index');
}

/**
 * @param {string} file - Path of the file to read
 * @return {object} The front-matter data of `file`
 */
function defaultParser(file) {
  var content = fs.readFileSync(file).toString();
  var parser = require('gray-matter');
  try {
    return parser(content).data;
  } catch(err) {
    console.warn(err);
    return { data: {} };
  }
}

module.exports = krypa;
