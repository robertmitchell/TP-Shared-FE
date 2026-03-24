import type { EventData, Player, Team } from '@/Common/Common.types'

/**
 * Counts the number of enrollments a player/team has in a bracket
 */
export const getTotalEnrollmentCount = (
  bId: string,
  eventData: EventData,
  areTeamsEnabled: boolean,
) => {
  let count = 0

  if (areTeamsEnabled) {
    const teams: Team[] = eventData.teams

    teams.map((team) => {
      if (team.brackets !== undefined) {
        team.brackets.map((bracket) => {
          if (bracket.id === bId) {
            count += bracket.numBrackets
          }
        })
      }
    })
  } else {
    const players: Player[] = eventData.guestPlayers
    players.map((player) => {
      if (player.brackets !== undefined) {
        player.brackets.map((bracket) => {
          if (bracket.id === bId) {
            count += bracket.numBrackets
          }
        })
      }
    })
  }

  return count
}
