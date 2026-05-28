import { v4 as uuidv4 } from 'uuid'

import { BracketFormData, BracketStatus } from './BracketForm.types'

export const getEmptyBracket = (): BracketFormData => {
  return {
    activeRound: 0,
    age: '',
    areTeamsEnabled: false,
    basedOnPercent: 0,
    basedOnScore: 0,
    bracketNumPlayers: 8,
    bracketScoringType: 'Standard',
    bracketType: 'Singles',
    bracketWebs: [],
    dates: '',
    description: '',
    entryFee: 0,
    firstPayout: 0,
    fourthPayout: 0,
    id: uuidv4(),
    isHandicap: false,
    houseCut: 0,
    location: '',
    loserBrackets: [],
    name: '',
    numLanes: 0,
    playerCount: 0,
    prizes: '',
    rules: '',
    secondPayout: 0,
    sport: '',
    status: BracketStatus.Not_Shuffled,
    teamCount: 0,
    thirdPayout: 0,
  }
}

/**
 * Gets the bracket index based on the bracket's name
 * For use in a Dropdown
 */
export const getBracketIndex = (
  selected: string,
  brackets: BracketFormData[],
): number => {
  for (let i = 0; i < brackets.length; i++) {
    if (selected === brackets[i].name) {
      return i
    }
  }
  return 0
}
