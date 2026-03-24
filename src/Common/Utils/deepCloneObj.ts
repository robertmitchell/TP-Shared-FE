/**
 * Returns a deep clone of an object
 * This way a mutable copy without reference can be made
 */
export const deepCloneObj = (obj: Object) => {
  if (obj === undefined) {
    return {}
  }

  return JSON.parse(JSON.stringify(obj))
}
