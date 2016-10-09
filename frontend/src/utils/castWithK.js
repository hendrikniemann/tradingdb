/**
 * castet eine Zahl mit k's am Ende zu einer Number
 * @param String eine Zahl mit eventuellen k's am Ende
 */
export default function castWithK(string) {
  let curr = string;
  let multipler = 1;
  while (curr.search('k') > 0) {
    multipler *= 1000;
    curr = curr.replace('k', '');
  }
  return curr * multipler;
}
