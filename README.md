# krypa
Recursively walk through a directory and construct a front matter sitemap.

## Install
```shell
npm install krypa
```

## Getting Started
```javascript
var krypa = require('krypa');
var hm = require('hjson-matter');

// generate a sitemap of YAML front-matter
var sitemap = krypa('./directory');

// specify your own front-matter parser
var sitemap = krypa('./directory', hm);

// pass ignore options to globby
var sitemap = krypa('./directory', { ignore: '!**/*.md' });

// pass ignore options AND a custom parser
var sitemap = krypa('./directory', {
  ignore: '!**/*.md',
  parser: hm
});
```

## Parameters

#### krypa(directory, options)

`directory` **{String}** - Path of the directory you want to generate a front matter sitemap for.

`options` **{Function|Object}** - The ignore and parser options, or just `options.parser` directly.

`options.ignore` **{String|String[]}** - Glob of files to ignore to pass to [globby](https://www.npmjs.com/package/globby) (see [node-glob](https://github.com/isaacs/node-glob#options)).

_Default: `!**/*.{html,markdown,md,nunjucks,swig,twig}`_

`options.parser` **{Function}** - Custom parser to extract front-matter from files. This should return the front-matter data itself, so if your parser returns the data as an object property (such as `attributes` in [front-matter](https://github.com/jxson/front-matter)), you should create a light wrapper around it.

_Default: a light wrapper around [gray-matter](https://github.com/jonschlinkert/gray-matter)_
