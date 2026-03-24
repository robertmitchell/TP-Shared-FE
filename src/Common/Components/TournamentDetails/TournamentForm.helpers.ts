import {
  GenericFormState,
  GenericFormStatus,
  EventData,
  SetState,
} from '@/Common/Common.types'

/**
 * Saves the changes a Director has made to a tournament
 */
export const saveTournamentChanges = async (
  eventData: EventData,
  setFormState: SetState<GenericFormState>,
  tIndex: number,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}

/**
 * Reopens a Tournament
 */
export const reopenTournament = async (
  eventData: EventData,
  setFormState: SetState<GenericFormState>,
  tIndex: number,
) => {
  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
