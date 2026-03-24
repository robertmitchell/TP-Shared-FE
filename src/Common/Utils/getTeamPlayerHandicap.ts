import type { EventData, TeamPlayer } from '@/Common/Common.types'

/**
 * Gets a team player's handicap for the Team TLB
 */
export const getTeamPlayerHandicap = (
  teamPlayer: TeamPlayer,
  eventData: EventData,
  basedOnPercent: number,
  basedOnScore: number,
): number => {
  const player = getTeamPlayerDetails(teamPlayer, eventData)
  if (player === undefined) {
    return 0
  }

  let playerHandicap = Math.floor(
    ((basedOnScore - player.average) * basedOnPercent) / 100,
  )
  if (playerHandicap < 0) {
    playerHandicap = 0
  }

  return playerHandicap
}

/**
 * Matches the team player to the guestPlayer
 */
const getTeamPlayerDetails = (teamPlayer: TeamPlayer, eventData: EventData) => {
  for (let i = 0; i < eventData.guestPlayers.length; i++) {
    if (teamPlayer.playerId === eventData.guestPlayers[i].id) {
      return eventData.guestPlayers[i]
    }
  }
}
