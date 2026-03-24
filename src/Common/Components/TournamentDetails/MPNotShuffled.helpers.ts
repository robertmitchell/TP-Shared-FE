import type { Updater } from 'use-immer'

import {
  GenericFormState,
  GenericFormStatus,
  EventData,
} from '@/Common/Common.types'

/**
 * Matches up all the players randomly against each other
 */
export const matchUpPlayers = (
  roundIndex: number,
  tIndex: number,
  eventData: EventData,
  setFormState: Updater<GenericFormState>,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
