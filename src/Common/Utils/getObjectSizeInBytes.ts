/**
 * Calculates the payload size of an object
 * Can be used to check for a payload before writing to Firebase
 */
export const getObjectSizeInBytes = <T>(obj: T) => {
  const jsonString = JSON.stringify(obj)
  const sizeInBytes = new TextEncoder().encode(jsonString).length

  return sizeInBytes
}
