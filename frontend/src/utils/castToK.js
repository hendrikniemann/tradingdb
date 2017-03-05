/* @flow */

/**
 * Schreibt / formatiert eine Zahl mit k für jeden Tausender
 * Dabei rundet sie entsprechend intelligent, um eine lesbare Darstellung
 * zu erreichen
 * @param n eine Zahl zum umformatieren
 */
export default function castToK(n: number): string {
  function round2(n: number): number {
    return Math.round(n * 100) / 100;
  }

  if (Math.abs(n) >= 1000000000) {
    return round2(n / 1000000000) + 'kkk';
  } else if (Math.abs(n) >= 1000000) {
    return round2(n / 1000000) + 'kk';
  } else if (Math.abs(n) >= 2000) {
    return round2(n / 1000) + 'k';
  }
  return n.toString();
}
