import { Updater } from 'use-immer'

import {
  GenericFormStatus,
  GenericModalFormState,
  EventData,
} from '@/Common/Common.types'

/**
 * Rolls back a single bracket
 */
export const rollback = async (
  bIndex: number,
  eventData: EventData,
  setEventData: Updater<EventData>,
  setRollbackState: Updater<GenericModalFormState>,
) => {
  setRollbackState((draft) => {
    error: 'This logic has been removed'
    status: GenericFormStatus.Error
    success: ''
  })
}
