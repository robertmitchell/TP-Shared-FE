import {
  GenericFormState,
  GenericFormStatus,
  EventData,
  SetState,
} from '@/Common/Common.types'

/**
 * Saves the changes a Director has made to an event details
 */
export const saveEventDetailsChanges = async (
  eventData: EventData,
  setFormState: SetState<GenericFormState>,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
