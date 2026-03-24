import { v4 as uuidv4 } from 'uuid'

import type { TournamentFormData } from './TournamentForm.types'

export const getEmptyTournament = (): TournamentFormData => {
  return {
    age: '',
    areTeamsEnabled: false,
    basedOnPercent: 0,
    basedOnScore: 0,
    dates: '',
    description: '',
    entryFee: 0,
    houseCut: 0,
    id: uuidv4(),
    isHandicap: false,
    isMixed: false,
    isOpen: true,
    location: '',
    matchPlayInfo: [],
    name: '',
    numLanes: 0,
    numRounds: 0,
    playerCount: 0,
    prizes: '',
    rules: '',
    sidePots: {
      highPot: { enabled: false, enrollmentFee: 0 },
      lowPot: { enabled: false, enrollmentFee: 0 },
    },
    sport: '',
    teamCount: 0,
    teamWinners: [],
    tournamentType: 'Singles',
    winners: [],
  }
}

/**
 * Gets the tournament index based on the tournament's name
 * For use in a Dropdown
 */
export const getTournamentIndex = (
  selected: string,
  tournaments: TournamentFormData[],
): number => {
  for (let i = 0; i < tournaments.length; i++) {
    if (selected === tournaments[i].name) {
      return i
    }
  }
  return 0
}
