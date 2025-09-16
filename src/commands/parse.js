/*
 * SPDX-FileCopyrightText: Copyright (c) 2022-2025 Objectionary.com
 * SPDX-License-Identifier: MIT
 */

const rel = require('relative');
const path = require('path');
const {mvnw, flags} = require('../mvnw');

/**
 * Command to parse EO into .XMIR files.
 * @param {Hash} opts - All options
 * @return {Promise} of assemble task
 */
module.exports = async function(opts) {
  const target = path.resolve(opts.target);
  const r = await mvnw(['eo:parse'].concat(flags(opts)), opts.target, opts.batch);
  console.info('EO sources parsed in %s', rel(target));
  return r;
};
