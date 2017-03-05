/* @flow */

/**
 * castet eine Zahl mit k's am Ende zu einer Number
 * @param str eine Zahl mit eventuellen k's am Ende
 */
export default function castWithK(str: string): number {
  let curr = str;
  let multipler = 1;
  while (curr.search('k') > 0) {
    multipler *= 1000;
    curr = curr.replace('k', '');
  }
  return parseInt(curr, 10) * multipler;
}
