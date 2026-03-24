import { MatchEntrant } from '@/Common/Components/BracketDetails/BracketForm.types'
import type { EventData } from '../Common.types'

/**
 * Gets a team from the match Entrant
 */
export const getTeamFromMatchEntrant = (
  matchEntrant: MatchEntrant,
  eventData: EventData,
) => {
  for (let i = 0; i < eventData.teams.length; i++) {
    if (matchEntrant.id === eventData.teams[i].id) {
      return eventData.teams[i]
    }
  }
}
