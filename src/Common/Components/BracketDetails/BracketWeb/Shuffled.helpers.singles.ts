import { GenericFormStatus } from '@/Common/Common.types'
import { AdvanceRoundParams } from '../BracketForm.types'

/**
 * Entrypoint to combine updating scores and advancing the round
 */
export const updateSinglesScoresAndAdvance = async (
  advanceRoundParams: AdvanceRoundParams,
) => {
  const { bi, eventData, setAdvanceModal, setEventData, setFormState } =
    advanceRoundParams

  setFormState((draft) => {
    draft.error = 'This logic has been removed'
    draft.success = ''
    draft.status = GenericFormStatus.Error
  })
}
