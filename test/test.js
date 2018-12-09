const assert = require('assert');
const xlsx = require('xlsx');
const md2xlsx = require('../lib');

describe('xlsx', () => {
  it('write file', () => {
    md2xlsx('./test/test.md');
    const xlsxObj = xlsx.readFile('./test.xlsx');
    const sheet = xlsxObj.Sheets.Sheet1;
    assert.deepStrictEqual(sheet, {
      '!ref': 'A1:C5',
      A1: { t: 's', v: 'all', h: 'all', w: 'all' },
      B1: { t: 's', v: 'item1', h: 'item1', w: 'item1' },
      C1: { t: 's', v: '', h: '', w: '' },
      A2: { t: 's', v: 'value1', h: 'value1', w: 'value1' },
      B2: { t: 's', v: '11', h: '11', w: '11' },
      C2: { t: 's', v: '12', h: '12', w: '12' },
      A3: { t: 's', v: 'value2', h: 'value2', w: 'value2' },
      B3: { t: 's', v: '21', h: '21', w: '21' },
      C3: { t: 's', v: '22', h: '22', w: '22' },
      A4: { t: 's', v: '', h: '', w: '' },
      A5: { t: 's', v: 'value3', h: 'value3', w: 'value3' },
      B5: { t: 's', v: 'hey', h: 'hey', w: 'hey' }
    });
  });
});
