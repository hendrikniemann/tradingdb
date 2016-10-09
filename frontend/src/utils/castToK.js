/**
 * Schreibt / formatiert eine Zahl mit k für jeden Tausender
 * Dabei rundet sie entsprechend intelligent, um eine lesbare Darstellung
 * zu erreichen
 * @param Number eine Zahl zum umformatieren
 */
export default function castToK(number) {
  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  if (Math.abs(number) >= 1000000000) {
    return round2(number / 1000000000) + 'kkk';
  } else if (Math.abs(number) >= 1000000) {
    return round2(number / 1000000) + 'kk';
  } else if (Math.abs(number) >= 2000) {
    return round2(number / 1000) + 'k';
  }
  return number;
}
