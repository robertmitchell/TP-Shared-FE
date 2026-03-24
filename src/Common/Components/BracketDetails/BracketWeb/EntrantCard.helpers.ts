import type { EventData } from '@/Common/Common.types'
import { MatchEntrant, MatchWinnerStatus } from '../BracketForm.types'

import { getPlayerHandicap } from '@/Common/Utils/getPlayerHandicap'
import { getPlayersFromTeamId } from '@/Common/Utils/getPlayersFromTeamId'
import { getTeamPlayerHandicap } from '@/Common/Utils/getTeamPlayerHandicap'

/**
 * Gets the background color based on the player's match status
 */
export const getBGColor = (round: number, player: MatchEntrant): string => {
  const status: MatchWinnerStatus = getMatchStatus(round, player)

  switch (status) {
    case MatchWinnerStatus.Lost:
      return 'bg-gray-300'

    case MatchWinnerStatus.Advanced:
      return 'bg-green-200'

    case MatchWinnerStatus.Won:
      return 'bg-yellow-300'

    case MatchWinnerStatus.In_Progress:
      return 'bg-white'

    case MatchWinnerStatus.Error:
    default:
      return 'bg-red-300'
  }
}

/**
 * Gets the player's score for a given round
 */
export const getPlayerScore = (round: number, player: MatchEntrant): number => {
  switch (round) {
    case 0:
      return player.roundScore0

    case 1:
      return player.roundScore1

    case 2:
      return player.roundScore2

    case 3:
      return player.roundScore3 || 0

    case 4:
      return player.roundScore4 || 0

    case 5:
      return player.roundScore5 || 0

    case 6:
      return player.roundScore6 || 0

    case 7:
      return player.roundScore7 || 0

    default:
      return player.roundScore0
  }
}

/**
 * Gets the player's status for a given match
 */
const getMatchStatus = (round: number, player: MatchEntrant) => {
  switch (round) {
    case 0:
      return player.isWinner0

    case 1:
      return player.isWinner1

    case 2:
      return player.isWinner2

    case 3:
      return player.isWinner3 || MatchWinnerStatus.Lost

    case 4:
      return player.isWinner4 || MatchWinnerStatus.Lost

    case 5:
      return player.isWinner5 || MatchWinnerStatus.Lost

    case 6:
      return player.isWinner6 || MatchWinnerStatus.Lost

    case 7:
      return player.isWinner7 || MatchWinnerStatus.Lost

    default:
      return MatchWinnerStatus.Error
  }
}

export const getEntrantHandicap = (
  entrant: MatchEntrant,
  areTeamsEnabled: boolean,
  basedOnPercent: number,
  basedOnScore: number,
  eventData: EventData,
) => {
  if (areTeamsEnabled) {
    const { id } = entrant
    if (id === null) {
      return 0
    }

    let totalTeamHandicap = 0

    // Get the team info
    const teamPlayers = getPlayersFromTeamId(id, eventData)
    if (teamPlayers === null) {
      return 0 // TODO THROW AN ERROR WOULD BE BETTER
    }

    // Loop through players and add score to total handicap
    for (let i = 0; i < teamPlayers.length; i++) {
      totalTeamHandicap += getTeamPlayerHandicap(
        teamPlayers[i],
        eventData,
        basedOnPercent,
        basedOnScore,
      )
    }

    return totalTeamHandicap
  }

  return getPlayerHandicap(entrant, basedOnPercent, basedOnScore)
}
