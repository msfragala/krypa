import _ from 'lodash';
import fs from 'fs';
import hm from 'hjson-matter';
import krypa from '../';
import path from 'path';
import test from 'ava';

const pagesMap = {
  index: { title: 'Home' },
  about: {
    index: { title: 'About' },
    people: { index: { title: 'People' } }
  },
  work: {
    projectA: { index: { title: 'Project A' } },
    projectB: { index: { title: 'Project B' } }
  }
};


test('Pass no Options', t => {
  const sitemap = krypa('./pages');
  t.true(_.isEqual(sitemap, pagesMap));
});

test('Pass options as parser function', t => {
  const directory = './pages';
  const sitemap = krypa(directory, parseHM);
  t.true(_.isEqual(sitemap, pagesMap));
});

test('Pass parser function as options property', t => {
  const directory = './pages';
  const sitemap = krypa(directory, { parser: parseHM });
  t.true(_.isEqual(sitemap, pagesMap));
});

test('Pass ignore option', t => {
  const directory = './pages';
  const sitemap = krypa(directory, { ignore: '!**/*.html' });
  t.true(_.isEqual(sitemap, {
    index: { title: 'Home' },
    about: { index: { title: 'About' } }
  }));
});

function parseHM(file) {
  var content = fs.readFileSync(file);
  return hm(content).data;
}
