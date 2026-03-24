import {
  GenericFormState,
  GenericFormStatus,
  GenericStatus,
  EventData,
  SetState,
} from '@/Common/Common.types'

/**
 * Updates the event's status to whatever is passed
 */
export const updateEventStatus = async (
  eventData: EventData,
  setFormState: SetState<GenericFormState>,
  newStatus: GenericStatus,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
