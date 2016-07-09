import _ from 'lodash';
import fs from 'fs';
import hm from 'hjson-matter';
import krypa from '../';
import path from 'path';
import test from 'ava';

test( t => {
  const sitemap = krypa('./pages');
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

test(t => {
  const directory = './pages';
  const sitemap = krypa(directory, {
    parser: file => {
      var content = fs.readFileSync(file);
      return hm(content).data;
    }
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
