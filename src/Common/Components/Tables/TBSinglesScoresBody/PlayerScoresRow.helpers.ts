import type { EventData, Player, Score } from '@/Common/Common.types'

import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'

/**
 * Entrypoint for both tournaments and brackets
 */
export const getPlayerScores = (
  tbIndex: number,
  isBracket: boolean = false,
  player: Player,
  eventData: EventData,
): Score[] => {
  return isBracket
    ? getBracketScores(tbIndex, player, eventData)
    : getPlayerTournamentScores(tbIndex, player, eventData)
}

/**
 * Gets the scores for this bracket for this player in the correct order
 */
const getBracketScores = (
  tbIndex: number,
  player: Player,
  eventData: EventData,
) => {
  const numRounds = getBracketNumRounds(
    eventData.brackets[tbIndex].bracketNumPlayers,
  )
  const scores: Score[] = new Array(numRounds).fill({
    gameId: '-1',
    playerId: player.id,
    score: 0,
  })

  const tbId = eventData.brackets[tbIndex].id

  // Loop through scores (esi = eventData.scores index)
  for (let esi = 0; esi < eventData.scores.length; esi++) {
    // Check that the score's player ID matches the game's player ID
    if (eventData.scores[esi].playerId === player.id) {
      // Loop through games (egi = eventData.games index)
      for (let egi = 0; egi < eventData.games.length; egi++) {
        // Check that the score's gameId matches the game's id
        if (eventData.scores[esi].gameId === eventData.games[egi].id) {
          // Loop through game's brackets (egbi = eventData.games.brackets index)
          for (
            let egbi = 0;
            egbi < eventData.games[egi].brackets.length;
            egbi++
          ) {
            // Check that the bracket's id matches this tables bracket's id
            if (tbId === eventData.games[egi].brackets[egbi].id) {
              // Add the score to the scores list at the correct index
              const currBracketRoundNum = parseInt(
                eventData.games[egi].brackets[egbi].roundNum,
                10,
              )
              scores[currBracketRoundNum - 1] = eventData.scores[esi]
            }
          }
        }
      }
    }
  }

  return scores
}

/**
 * Gets the scores for this tournament for this player in the correct order
 */
export const getPlayerTournamentScores = (
  tbIndex: number,
  player: Player,
  eventData: EventData,
) => {
  const numRounds = eventData.tournaments[tbIndex].numRounds
  const scores: Score[] = new Array(numRounds).fill({
    gameId: '-1',
    playerId: player.id,
    score: 0,
  })

  const tbId = eventData.tournaments[tbIndex].id

  // Loop through scores (esi = eventData.scores index)
  for (let esi = 0; esi < eventData.scores.length; esi++) {
    // Check that the score's player ID matches the game's player ID
    if (eventData.scores[esi].playerId === player.id) {
      // Loop through games (egi = eventData.games index)
      for (let egi = 0; egi < eventData.games.length; egi++) {
        // Check that the score's gameId matches the game's id
        if (eventData.scores[esi].gameId === eventData.games[egi].id) {
          // Check that this tournament is in this game (there could be 4 games but the tournament has 3 rounds)
          if (eventData.games[egi].tournaments !== undefined) {
            // Loop through game's tournaments (egti = eventData.games.tournaments index)
            for (
              let egti = 0;
              egti < eventData.games[egi].tournaments.length;
              egti++
            ) {
              // Check that the tournament's id matches this tables tournament's id
              if (tbId === eventData.games[egi].tournaments[egti].id) {
                // Add the score to the scores list at the correct index
                const currTournamentRoundNum = parseInt(
                  eventData.games[egi].tournaments[egti].roundNum,
                  10,
                )
                scores[currTournamentRoundNum - 1] = eventData.scores[esi]
              }
            }
          }
        }
      }
    }
  }

  return scores
}
