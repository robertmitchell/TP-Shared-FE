/**
 * Shuffles an array to create randomness
 **/
// TODO MAKE THIS RECURSIVE SO IT CAN SHUFFLE MULTIPLE TIMES
export const shuffle = (indices: number[]) => {
  const newArray = indices
  let currIndex = indices.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currIndex)
    currIndex -= 1

    // And swap it with the current element.
    temporaryValue = indices[currIndex]
    newArray[currIndex] = newArray[randomIndex]
    newArray[randomIndex] = temporaryValue
  }

  return newArray
}
