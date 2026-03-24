/**
 * Returns a mutable copy without a reference of an array
] */
export const deepCloneArr = (arr: any[]) => {
  if (arr === undefined) {
    return []
  }
  return arr.slice()
}
