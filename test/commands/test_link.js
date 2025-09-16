/*
 * SPDX-FileCopyrightText: Copyright (c) 2022-2025 Objectionary.com
 * SPDX-License-Identifier: MIT
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {runSync, assertFilesExist, parserVersion, homeTag, weAreOnline} = require('../helpers');

describe('link', () => {
  before(weAreOnline);

  /**
   * Run 'link' command
   * @param {String} home - Home directory
   * @param {String} lang - Platform language
   * @return {String} - Stdout
   */
  const link = function(home, lang = 'Java') {
    fs.rmSync(home, {recursive: true, force: true});
    fs.mkdirSync(path.resolve(home, 'src/foo/bar'), {recursive: true});
    fs.writeFileSync(
      path.resolve(home, 'src/foo/bar/link.eo'),
      [
        '+package foo.bar',
        '+alias org.eolang.io.stdout',
        '',
        '# sample object',
        '[args] > link',
        '  stdout "Hello, world!" > @',
      ].join('\n')
    );
    return runSync([
      'link',
      '--verbose',
      '--easy',
      '--blind',
      `--parser=${parserVersion}`,
      `--home-tag=${homeTag}`,
      '-s', path.resolve(home, 'src'),
      '-t', path.resolve(home, 'target'),
      `--language=${lang}`,
    ]);
  };
  it('compiles a simple .EO program into an executable .JAR', function(done) {
    this.timeout(0);
    const home = path.resolve('temp/test-link/java'),
      stdout = link(home, 'Java');
    assertFilesExist(
      stdout, home,
      [
        'target/generated-sources/EOfoo/EObar/EOlink.java',
        'target/generated-sources/EOorg/EOeolang/EObytes.java',
        'target/classes/EOfoo/EObar/EOlink.class',
        'target/classes/EOorg/EOeolang/EOnumber.class',
        'target/eoc.jar',
      ]
    );
    assert(!fs.existsSync(path.resolve('../../mvnw/target')));
    done();
  });

  it('creates and builds NPM project', function(done) {
    this.skip();
    this.timeout(0);
    const home = path.resolve('temp/test-link/js'),
      stdout = link(home, 'JavaScript');
    assertFilesExist(
      stdout, home,
      [
        'target/project/foo/bar/link.js',
        'target/project/org/eolang/bytes.js',
        'target/project/node_modules/eo2js-runtime/src/objects/org/eolang/error.js',
        'target/project/node_modules/eo2js-runtime/src/runtime/phi.js',
      ]
    );
    done();
  });
});
