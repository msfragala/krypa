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

var sitemap = krypa('./src/pages/**/*.{html,md}', {
  base: './src/pages',
  parser: hm
});

```

## Usage

### krypa(globs, options)

#### globs

Type: `string`, `array`

Glob or array of globs for the files to incorporate into the sitemap.

#### options

##### base

Type: `string`

The directory to serve as the starting point for the sitemap.

##### parser

Type: `function`

The parser to extract the front matter from a file. It should return with property `data` containing the front matter.
