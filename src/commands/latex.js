/*
 * SPDX-FileCopyrightText: Copyright (c) 2022-2025 Objectionary.com
 * SPDX-License-Identifier: MIT
 */

const rel = require('relative');
const {mvnw, flags} = require('../mvnw');
const path = require('path');
const fs = require('fs');

/**
 * Command to generate LaTeX files from XMIR.
 * @param {Object} opts - All options
 * @return {Promise} of latex generation task
 */
module.exports = async function(opts) {
  const latex = path.resolve(opts.target, 'latex');
  const r = await mvnw(['eo:latex'].concat(flags(opts)), opts.target, opts.batch);
  console.info('LaTeX files generated in %s', rel(latex));
  return r;
};
