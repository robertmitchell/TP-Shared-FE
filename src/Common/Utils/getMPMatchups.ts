import type { EventData } from '@/Common/Common.types'
import type { MatchupResult } from '@/Common/Components/TournamentDetails/TournamentForm.types'

import { getPlayerFromId } from '@/Common/Utils/getPlayerFromId'
import { getPlayerGameScore } from '@/Common/Utils/getPlayerGameScore'

/**
 * Gets the matchups from a Match Play round
 */
export const getMatchups = (
  tIndex: number,
  roundIndex: number,
  eventData: EventData,
) => {
  const tId = eventData.tournaments[tIndex].id
  const { matchUps, numGames } =
    eventData.tournaments[tIndex].matchPlayInfo[roundIndex]
  const playerMatchups: MatchupResult[] = []
  let prevGamesCount = 0

  // Found out how many games were in the previous rounds
  for (let i = 0; i < roundIndex; i++) {
    prevGamesCount += eventData.tournaments[tIndex].matchPlayInfo[i].numGames
  }

  // Loop through all of the matchups
  for (let i = 0; i < matchUps.length; i++) {
    const { player1Id, player2Id } = matchUps[i]
    const player1Scores: number[] = []
    const player2Scores: number[] = []

    // Loop through each game and get the scores
    for (let j = 0; j < numGames; j++) {
      const gameId = getGameId(tId, prevGamesCount + j, eventData)
      player1Scores.push(getPlayerGameScore(gameId, player1Id, eventData))
      player2Scores.push(getPlayerGameScore(gameId, player2Id, eventData))
    }

    playerMatchups.push({
      player1: getPlayerFromId(player1Id, eventData),
      player1Scores,
      player2: getPlayerFromId(player2Id, eventData),
      player2Scores,
    })
  }

  return playerMatchups
}

/**
 * Gets the gameId for the match play touurnament round
 */
const getGameId = (
  tId: string,
  roundIndex: number, // round index
  eventData: EventData,
): string => {
  // Loop through the games
  for (let gi = 0; gi < eventData.games.length; gi++) {
    // Loop through the tournaments in the games
    for (let gti = 0; gti < eventData.games[gi].tournaments?.length; gti++) {
      // Check for a match
      if (eventData.games[gi].tournaments[gti].id === tId) {
        const thing = parseInt(
          eventData.games[gi].tournaments[gti].roundNum,
          10,
        )

        // Add `+ 1` because in the round picker they start at index 1
        if (thing == roundIndex + 1) {
          return eventData.games[gi].id
        }
      }
    }
  }

  return 'NA'
}
