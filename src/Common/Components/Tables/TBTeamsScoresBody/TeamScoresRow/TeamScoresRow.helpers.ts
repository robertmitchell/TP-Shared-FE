import type {
  EventData,
  Player,
  Score,
  Team,
  TeamPlayer,
} from '@/Common/Common.types'

import { createEmptyPlayer } from '@/Common/Utils/createEmptyPlayerData'
import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'
import { getPlayerHandicap } from '@/Common/Utils/getPlayerHandicap'

/**
 * Gets the handicaps for each player on the team
 */
export const getTeamMemberHandicaps = (
  team: Team,
  eventData: EventData,
  basedOnPercent: number,
  basedOnScore: number,
) => {
  const handicaps: number[] = []

  for (let i = 0; i < team.players.length; i++) {
    for (let j = 0; j < eventData.guestPlayers.length; j++) {
      if (team.players[i].playerId === eventData.guestPlayers[j].id) {
        handicaps.push(
          getPlayerHandicap(
            eventData.guestPlayers[j],
            basedOnPercent,
            basedOnScore,
          ),
        )
        break
      }
    }
  }

  return handicaps
}

/**
 * Gets the all player scores for the team
 */
export const getTeamMemberScores = (
  team: Team,
  tbIndex: number,
  isBracket: boolean,
  eventData: EventData,
) => {
  const allScores = []

  // Loop through players
  for (let i = 0; i < team.players.length; i++) {
    const player = getPlayerFromTeamPlayer(team.players[i], eventData)
    // Get the player scores
    const playerScores = getPlayerScores(tbIndex, isBracket, player, eventData)

    // Add the player's scores to `allScores`
    allScores.push(playerScores)
  }
  return allScores
}

/**
 * Gets the total score for a team
 */
export const getTeamTotalScore = (
  playerScores: Score[][],
  isHandicap: boolean,
  playerHandicaps: number[],
  numGames: number,
) => {
  let total = 0

  // Loop through scores
  for (let i = 0; i < playerScores.length; i++) {
    if (playerScores[i] === null) {
      continue
    }

    // Add score to the total
    for (let j = 0; j < playerScores[i].length; j++) {
      total += playerScores[i][j].score
    }
  }

  if (isHandicap) {
    for (let i = 0; i < playerHandicaps.length; i++) {
      total += playerHandicaps[i] * numGames
    }
  }

  return total
}

/**
 * Gets the player data associated with a team player
 */
const getPlayerFromTeamPlayer = (
  teamPlayer: TeamPlayer,
  eventData: EventData,
) => {
  for (let i = 0; i < eventData.guestPlayers.length; i++) {
    if (eventData.guestPlayers[i].id === teamPlayer.playerId)
      return eventData.guestPlayers[i]
  }

  return createEmptyPlayer()
}

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
    : getTournamentScores(tbIndex, player, eventData)
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
          // Check that this brackets is in this game (there could be 4 games but the brackets has 3 rounds)
          if (eventData.games[egi].brackets !== undefined) {
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
  }

  return scores
}

/**
 * Gets the scores for this tournament for this player in the correct order
 */
export const getTournamentScores = (
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

/**
 * Gets the team's total score for the round
 */
export const getTeamGameScore = (
  playerScores: Score[][],
  columnIndex: number,
) => {
  let gameTotalScore = 0

  // loop through scores
  playerScores.map((playerScore) => {
    if (playerScore !== null) {
      gameTotalScore += playerScore[columnIndex].score
    }
  })

  return gameTotalScore
}
