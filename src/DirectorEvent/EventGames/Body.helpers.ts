import {
  GenericStatus,
  GenericFormStatus,
  EventData,
  SetState,
  GenericFormState,
} from '@/Common/Common.types'

/**
 * Updates the game status to `In Progress`
 */
export const updateGameStatus = async (
  index: number,
  eventData: EventData,
  newStatus: GenericStatus,
  setFormState: SetState<GenericFormState>,
  setIsGameModalOpen: SetState<boolean>,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
