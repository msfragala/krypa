import _ from 'lodash';
import hm from 'hjson-matter';
import krypa from '../';
import path from 'path';
import test from 'ava';

test(t => {
  const base = './pages';
  const globs = './pages/**/*.{html,md}';
  const sitemap = krypa(globs, {
    base: base,
    parser: hm
  });

  t.true(_.isEqual(sitemap, {
    index: { title: 'Home' },
    about: {
      index: { title: 'About' },
      people: { index: { title: 'People' } }
    },
    work: {
      projectA: { index: { title: 'Project A' } },
      projectB: { index: { title: 'Project B' } }
    }
  }));
  
});
