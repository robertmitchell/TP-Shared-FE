import type { Updater } from 'use-immer'

import type { EventData } from '@/Common/Common.types'
import type { ResetState } from './ResetButton.types'

/**
 * Initial state for the bracket reset button
 */
export const getInitialResetState = (): ResetState => ({
  error: '',
  loading: false,
  success: '',
  warningModalVisible: false,
})

/**
 * Resets the bracket to an unshuffled state
 */
export const resetBracket = async (
  bIndex: number,
  eventData: EventData,
  setResetState: Updater<ResetState>,
) => {
  setResetState((draft) => {
    draft.error = 'this logic has been removed'
  })
}
