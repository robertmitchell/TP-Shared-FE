import { v4 as uuidv4 } from 'uuid'

import type { LeagueFormData } from './LeagueForm/LeagueForm.types'

export const getEmptyLeague = (): LeagueFormData => {
  return {
    id: uuidv4(),
    name: '',
    sport: '',
    description: '',
    rules: '',
    location: '',
    dates: '',
    numWeeks: 0,
    numRounds: 0,
    numWeekPoints: 0,
    numGamePoints: 0,
    numSeriesPoints: 0,
    secretaryLink: '',
    isHandicap: false,
    basedOnPercent: 0,
    basedOnScore: 0,
    areTeamsEnabled: false,
    entryFee: 0,
    age: '',
    weeklyDues: 0,
    houseCut: 0,
    prizes: '',
    numLanes: 0,
  }
}
