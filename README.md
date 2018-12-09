# md2xlsx
[![Build Status](https://travis-ci.org/Claude-Ray/md2xlsx.svg?branch=master)](https://travis-ci.org/Claude-Ray/md2xlsx)

Convert markdown table to xlsx file

## Usage

```js
const md2xlsx = require('md2xlsx');
md2xlsx('./test/test.md', { extname: 'xls' });
```

## options

- workbook: Default false. Return `js-xlsx` [workbook object](https://github.com/SheetJS/js-xlsx#workbook-object) without saving to xlsx file when set to true.
- extname: Default xlsx.
- basename: Default is equal to the source file's name.
