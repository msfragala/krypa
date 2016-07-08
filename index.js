var Path = require('path');
var globby = require('globby');
var isGlob = require('is-glob');

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

  var files = findFiles(directory, ignore);

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

module.exports = krypa;
