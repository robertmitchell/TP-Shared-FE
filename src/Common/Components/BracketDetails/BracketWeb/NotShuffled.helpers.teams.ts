import type { Updater } from 'use-immer'

import type { EventData, SetState, Team } from '@/Common/Common.types'
import { NotShuffledFormState, NotShuffledStatus } from './NotShuffled.types'

/**
 * Shuffles all teams brackets and saves to the database
 */
export const shuffleTeamsBrackets = (
  bIndex: number,
  eventData: EventData,
  setUpdatedEventData: SetState<EventData>,
  setFormState: Updater<NotShuffledFormState>,
  recursionCount: number,
) => {
  setFormState({
    error: 'This logic has been removed',
    success: '',
    status: NotShuffledStatus.Error,
  })
}

/**
 * Gets the total number of entries for this bracket
 */
export const getTeamsEntrantsCount = (
  bId: string,
  bracketTeams: Team[],
): number => {
  let totalEntrants = 0

  // Loop through all registered teams
  for (let i = 0; i < bracketTeams.length; i++) {
    // Loop through the current team's brackets
    for (let j = 0; j < bracketTeams[i].brackets.length; j++) {
      // Increment the totalEntrants if is the current bracket
      if (bracketTeams[i].brackets[j].id === bId) {
        totalEntrants += bracketTeams[i].brackets[j].numBrackets
      }
    }
  }

  return totalEntrants
}
