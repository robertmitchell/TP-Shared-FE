/**
 * Increments every number in the array
 * Used for the Team and Singles Alive List Rows
 */
export const incrementArray = (numbers: number[]) => {
  // This is becuase in the first round no one is dead so this isn't saved in the DB
  if (numbers === undefined) {
    return []
  }

  const incrementedNumbs = []
  for (let i = 0; i < numbers.length; i++) {
    incrementedNumbs.push(numbers[i] + 1)
  }

  return incrementedNumbs
}
