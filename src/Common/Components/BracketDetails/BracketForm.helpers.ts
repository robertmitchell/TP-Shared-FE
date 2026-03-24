import type { Updater } from 'use-immer'

import {
  GenericFormState,
  GenericFormStatus,
  EventData,
} from '@/Common/Common.types'

/**
 * Saves the changes a Director has made to a bracket
 */
export const saveBracketChanges = async (
  bIndex: number,
  eventData: EventData,
  setFormState: Updater<GenericFormState>,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
