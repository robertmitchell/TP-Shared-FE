import type { Updater } from 'use-immer'

import {
  EventData,
  GeneratorData,
  GenericFormState,
  GenericFormStatus,
} from '@/Common/Common.types'

/**
 * Chooses a player at random from the list
 */
export const chooseRandomPlayer = (
  eventData: EventData,
  generator: GeneratorData,
  setFormState: Updater<GenericFormState>,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
