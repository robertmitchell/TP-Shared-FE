/**
 * Finds matches between two arrays
 */
export const getArrayMatches = (array1: any[], array2: any[]) =>
  array1.filter((element) => array2.includes(element))
