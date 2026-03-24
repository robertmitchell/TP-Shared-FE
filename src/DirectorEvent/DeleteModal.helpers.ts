import {
  GenericFormState,
  GenericFormStatus,
  EventData,
  SetState,
} from '@/Common/Common.types'

/**
 * Deletes the event and the reference from the Director's event list
 */
export const deleteEvent = async (
  eventData: EventData,
  setFormState: SetState<GenericFormState>,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
