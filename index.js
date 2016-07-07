var Path = require('path');

/**
 * @param {string} directory - The directory to create a front-matter sitemap for.
 * @param {Object} options - Options to pass ignore globs and a specific parser.
 * @param {(string|string[])} options.ignore - Globs of files to ignore.
 * @param {Function} options.parser - The function to parse the front-matter.
 */
function krypa(directory, options) {

  var directory = ensureAbsolute(directory);
  var parser = options.parser || require('gray-matter');
  var ignore = options.ignore || '!**/*.{html,md}';

}


/**
 * @param {string} path - The path to make absolute, if not already.
 */
function ensureAbsolute(path) {
  return Path.isAbsolute(path) ? path : Path.resolve(path);
}


module.exports = krypa;
