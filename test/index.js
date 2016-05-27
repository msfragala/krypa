import _ from 'lodash';
import hm from 'hjson-matter';
import krypa from '../';
import path from 'path';
import test from 'ava';

const krypare = krypa(hm);

test(t => {
  const base = './pages';
  const globs = './pages/**/*.{html,md}';
  const sitemap = krypare(globs, base);
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
