import type { EventData, Player } from '@/Common/Common.types'
import type { PotPlayer } from './TournamentPlayerPots.types'

import { SidePotType } from './TournamentForm.types'

import { getPlayerTournamentScores } from '../Tables/TBSinglesScoresBody/PlayerScoresRow.helpers'

/**
 * Creates and array of all players enrolled in this pot
 */
export const getEnrolledPotPlayers = (
  tIndex: number,
  eventData: EventData,
  sidePotType: SidePotType,
) => {
  const { id } = eventData.tournaments[tIndex]
  const enrolledPlayers: Player[] = []

  // Loop through all players
  for (let i = 0; i < eventData.guestPlayers.length; i++) {
    if (eventData.guestPlayers[i].tournaments) {
      // Loop through their tournaments
      for (let j = 0; j < eventData.guestPlayers[i].tournaments.length; j++) {
        // Find this tournament
        if (eventData.guestPlayers[i].tournaments[j].id === id) {
          // See if they are in this sidepot
          if (
            sidePotType === SidePotType.LOW_POT &&
            eventData.guestPlayers[i].tournaments[j].sidePots.lowPot.enabled
          ) {
            enrolledPlayers.push(eventData.guestPlayers[i])
          } else if (
            sidePotType === SidePotType.HIGH_POT &&
            eventData.guestPlayers[i].tournaments[j].sidePots.highPot.enabled
          ) {
            enrolledPlayers.push(eventData.guestPlayers[i])
          }

          // Stop this loop since we found this tournament
          break
        }
      }
    }
  }

  return enrolledPlayers
}

/**
 * Gets all of the scores for the enrolled players in this game
 * and sorts them high to low
 */
export const getSortedPlayerScores = (
  tIndex: number,
  enrolledPlayers: Player[],
  eventData: EventData,
  roundIndex: number,
  sidePotType: SidePotType,
) => {
  const sortedPlayers: PotPlayer[] = []

  for (let i = 0; i < enrolledPlayers.length; i++) {
    const score = getPlayerGameScore(
      tIndex,
      enrolledPlayers[i],
      eventData,
      roundIndex,
    )
    sortedPlayers.push({ player: enrolledPlayers[i], score })
  }

  if (sidePotType === SidePotType.HIGH_POT) {
    sortedPlayers.sort((a, b) => b.score - a.score)
  }

  if (sidePotType === SidePotType.LOW_POT) {
    sortedPlayers.sort((a, b) => a.score - b.score)
  }

  return sortedPlayers
}

/**
 * Gets the player's score for this game in the tournament
 */
const getPlayerGameScore = (
  tIndex: number,
  player: Player,
  eventData: EventData,
  roundIndex: number,
) => {
  const playerScores = getPlayerTournamentScores(tIndex, player, eventData)

  return playerScores[roundIndex].score
}
