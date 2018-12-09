'use strict';

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const parser = require('./table');

/**
 * Convert markdown table to xlsx file
 * @param {string} fpath - markdown filepath
 * @param {object} [opts={}]
 * @param {boolean} opts.workbook - return workbook object only
 * @param {string} opts.basename - basename of xlsx file
 * @param {string} opts.extname - extname of xlsx file
 */
module.exports = (fpath, opts = {}) => {
  const text = fs.readFileSync(fpath);
  const workbook = parser.toWorkbook(text);
  if (opts.workbook) return workbook;

  const extname = opts.extname || 'xlsx';
  const basename = opts.basename || path.basename(fpath, path.extname(fpath));
  xlsx.writeFile(workbook, `${basename}.${extname}`);
};
