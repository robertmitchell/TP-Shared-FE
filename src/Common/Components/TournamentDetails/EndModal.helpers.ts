import {
  GenericFormState,
  GenericFormStatus,
  EventData,
  SetState,
} from '@/Common/Common.types'

/**
 * Entrypoint for ending tournaments of all kinds
 */
export const handleEndTournament = (
  tIndex: number,
  eventData: EventData,
  setEventData: SetState<EventData>,
  setFormState: SetState<GenericFormState>,
  onClose: () => void,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
