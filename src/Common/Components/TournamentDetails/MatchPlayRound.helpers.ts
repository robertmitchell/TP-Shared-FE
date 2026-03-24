import { GenericFormStatus } from '@/Common/Common.types'
import type { MPStatusParams } from './MatchPlayRound.types'
import { MatchPlayRoundStatus } from './TournamentForm.types'

/**
 * Ends an MP Round
 * Determines all of the winners based on the chosen scoring method
 * Shuffles the next round and updates the next round's status
 */
export const endMPRound = (mPStatusParams: MPStatusParams) => {
  const { setFormState } = mPStatusParams

  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}

/**
 * Changes the status of an MP Round
 * Can be use to `unshuffle` or `reopen` a round
 */
export const changeMPRoundStatus = (
  mPStatusParams: MPStatusParams,
  updatedStatus: MatchPlayRoundStatus,
) => {
  const { setFormState } = mPStatusParams

  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
