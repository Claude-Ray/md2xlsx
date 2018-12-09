'use strict';

const utils = require('./utils');

module.exports = {
  toWorkbook
};

/**
 * convert markdown table to workbook object
 * @param {string|buffer} text
 * @param {object} workbook
 */
function toWorkbook(text) {
  if (!text) throw new Error(`empty table`);
  if (Buffer.isBuffer(text)) text = text.toString();

  const cells = textParser(text);
  if (cells[0].length !== cells[1].length)
    throw new Error(`invalid table`);
  // splice the dividing line
  cells.splice(1, 1);

  return workbookConverter(cells);
}

/**
 * parse markdown table to cells
 * @param {string} text
 * @return {array[]}
 */
function textParser(text) {
  return text.split('\n').map(line => {
    line = line.trim();
    if (!line) return '';
    if (!line.startsWith('|')) line = `|${line}`;
    if (!line.endsWith('|')) line = `${line}|`;

    return line.split('|').slice(1, -1);
  });
}

/**
 * convert table cells to workbook object
 * @param {array[]} cells
 * @return {object} workbook
 */
function workbookConverter(cells) {
  const headers = cells[0];
  const width = headers.length;
  const height = cells.length;
  const sheetCells = {
    '!ref': `A1:${utils.int2col(width)}${height}`
  };

  // ignore data beyond the width of table
  for (let i = 0; i < width; i++) {
    const colName = utils.int2col(i + 1);
    for (let j = 0; j < height; j++) {
      // skip empty column
      if (!cells[j]) break;
      if (cells[j][i] == null) continue;
      const id = `${colName}${j + 1}`;
      sheetCells[id] = {
        t: 's',
        v: cells[j][i]
      };
    }
  }

  const sheetName = 'Sheet1';
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: sheetCells
    }
  };
  return workbook;
}
