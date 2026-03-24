/**
 * Removes undefined items from an object. This is useful to
 * prevent `value's argument contains undefined in property` errors.
 */
export const removeEmptiesFromObj = (obj: Object) => {
  return JSON.parse(JSON.stringify(obj))
}
