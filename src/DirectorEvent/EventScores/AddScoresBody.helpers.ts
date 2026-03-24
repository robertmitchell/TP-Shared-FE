import { GenericFormState, GenericFormStatus } from '@/Common/Common.types'
import {
  SavePlayerScoresParams,
  SaveRandomScoresParams,
} from './AddScoresBody.types'

/**
 * Loading is handled by the child components
 * so not needed on this component's load
 */
export const getInitialAddScoreseState = (): GenericFormState => ({
  error: '',
  success: '',
  status: GenericFormStatus.Success,
})

/**
 * Saves the entered scores
 */
export const savePlayerScores = async (
  savePlayerParams: SavePlayerScoresParams,
) => {
  const { setFormState } = savePlayerParams

  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}

/**
 * Used for dev testing to create random scores for players
 */
export const saveRandomScores = (
  saveRandomScoresParams: SaveRandomScoresParams,
) => {
  const { setFormState } = saveRandomScoresParams

  setFormState({
    error: 'This logic has been removed',
    status: GenericFormStatus.Error,
    success: '',
  })
}
