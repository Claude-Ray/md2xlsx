const assert = require('assert');
const xlsx = require('xlsx');
const md2xlsx = require('../lib');
const table = require('../lib/table');
const sheetObj = require('./fixtures/hello.json');

describe('xlsx', () => {
  describe('parser', () => {
    it('write file', () => {
      md2xlsx('./test/fixtures/hello.md');
      const xlsxObj = xlsx.readFile('./hello.xlsx');
      const sheet = xlsxObj.Sheets.Sheet1;
      assert.deepStrictEqual(sheet, sheetObj);
    });
    it('workbook only', () => {
      const workbook = md2xlsx('./test/fixtures/hello.md', { workbook: true });
      const sheet = workbook.Sheets.Sheet1;
      assert.deepStrictEqual(workbook.SheetNames, ['Sheet1']);
      Object.keys(sheet).forEach(key => {
        const value = sheet[key];
        if (typeof value === 'string') {
          assert.strictEqual(value, sheetObj[key]);
        } else {
          const { t, v } = sheetObj[key];
          assert.deepStrictEqual(value, { t, v });
        }
      });
    });
  });

  describe('invalid table', () => {
    it('length < 3', () => {
      assert.throws(table.toWorkbook.bind(null, 'm|n\n|-|'), Error, 'invalid table');
    });
    it('empty header', () => {
      assert.throws(table.toWorkbook.bind(null, '\n|-|\nx|y'), Error, 'invalid table');
    });
    it('invalid header', () => {
      assert.throws(table.toWorkbook.bind(null, 'm|n\n|-|\nx|y'), Error, 'invalid table');
    });
    it('invalid separator', () => {
      assert.throws(table.toWorkbook.bind(null, 'm|n\n|-|\nx|y'), Error, 'invalid table');
    });
  });
});
