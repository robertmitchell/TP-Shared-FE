import type { EventData, SetState } from '../Common/Common.types'
import { CreateEventState, CreateEventStatus } from './CreateEvent.types'

export const getInitialCreateEventFormState = (): CreateEventState => ({
  error: '',
  success: '',
  loading: false,
  status: CreateEventStatus.Details,
})

/**
 * Used to create the event
 */
export const handleOnSubmit = async (
  eventData: EventData,
  setFormState: SetState<CreateEventState>,
  name?: string,
) => {
  setFormState({
    error: 'This logic has been removed',
    success: '',
    loading: true,
    status: CreateEventStatus.Games,
  })
}
