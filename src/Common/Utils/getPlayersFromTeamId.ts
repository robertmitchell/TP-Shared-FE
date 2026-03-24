import type { EventData } from '@/Common/Common.types'

/**
 * Gets the players on a team from the teamId
 */
export const getPlayersFromTeamId = (teamId: string, eventData: EventData) => {
  // Loops through the teams to find the one with the matching ID
  for (let i = 0; i < eventData.teams.length; i++) {
    if (eventData.teams[i].id === teamId) {
      return eventData.teams[i].players
    }
  }

  return null
}
