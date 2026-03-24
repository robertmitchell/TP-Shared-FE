import { MatchPlayInfo, MatchPlayRoundStatus } from './TournamentForm.types'

/**
 * Creates an empty match play round
 */
export const getEmptyMatchPlayInfos = (numRounds: number) => {
  const matchPlayInfos: MatchPlayInfo[] = []

  for (let i = 0; i < numRounds; i++) {
    matchPlayInfos.push({
      matchUps: [],
      numGames: 1,
      scoringType: 'Point',
      status: MatchPlayRoundStatus.Open,
    })
  }

  return matchPlayInfos
}
