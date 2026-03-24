import type { Updater } from 'use-immer'

import type { EventData, Player, SetState } from '@/Common/Common.types'

import { NotShuffledFormState, NotShuffledStatus } from './NotShuffled.types'

/**
 * Shuffles all singles brackets and saves to the database
 */
export const shuffleSinglesBrackets = (
  bIndex: number,
  eventData: EventData,
  setUpdatedEventData: SetState<EventData>,
  setFormState: Updater<NotShuffledFormState>,
  recursionCount: number,
) => {
  setFormState({
    error:
      'There was a problem shuffling the brackets. Please refresh the page and try again. Error Code: NSHSTS_003.',
    success: '',
    status: NotShuffledStatus.Error,
  })
}

/**
 * Gets the total number of entries for this bracket
 */
export const getSinglesEntrantsCount = (
  bId: string,
  bracketPlayers: Player[],
): number => {
  let totalEntrants = 0

  return totalEntrants
}
