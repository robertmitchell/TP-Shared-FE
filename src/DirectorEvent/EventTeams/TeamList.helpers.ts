import type { EventData, Team } from '@/Common/Common.types'

import { deepCloneArr } from '@/Common/Utils/deepCloneArr'

/**
 * Used for finding teams with the given term in their name
 */
export const getFilteredTeamsList = (
  eventData: EventData,
  term: string,
): Team[] => {
  let teams: Team[] = deepCloneArr(eventData.teams)

  teams = teams.filter((team) => {
    if (team === null || team === undefined) {
      return -1
    }
    return team.name.toLowerCase().indexOf(term.toLowerCase()) > -1
  })

  return teams
}
