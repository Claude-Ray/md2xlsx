'use strict';

module.exports = {
  int2col
};

/**
 * Convert integer to excel column name
 * @param {number} n
 * @return {string}
 */
function int2col(n) {
  n = parseInt(n);
  let col = '';
  while (n > 0) {
    const m = (n - 1) % 26;
    const char = String.fromCharCode(m + 65);
    col = `${char}${col}`;
    n = (n - m - 1) / 26;
  }
  return col;
}
