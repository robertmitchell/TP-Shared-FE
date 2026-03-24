/**
 * Gets the number of rounds in a bracket
 */
export const getBracketNumRounds = (bracketNumPlayers: number) => {
  if (+bracketNumPlayers === 2) return 1
  if (+bracketNumPlayers === 4) return 2
  if (+bracketNumPlayers === 8) return 3
  if (+bracketNumPlayers === 16) return 4
  if (+bracketNumPlayers === 32) return 5
  if (+bracketNumPlayers === 64) return 6
  if (+bracketNumPlayers === 128) return 7
  if (+bracketNumPlayers === 256) return 8
  if (+bracketNumPlayers === 512) return 9
  if (+bracketNumPlayers === 1024) return 10
  return 3
}
