import * as gulp from 'gulp';
import * as path from 'path';
const Comb = require('csscomb');

const PROJECT_ROOT = path.join(__dirname, '.');
const SRC_ROOT = path.join(PROJECT_ROOT, 'src');

gulp.task('csscomb', () => {
  const config = require(path.join(PROJECT_ROOT, '.csscomb.json'));
  const comb = new Comb(config);
  return comb.processDirectory(SRC_ROOT);
});
