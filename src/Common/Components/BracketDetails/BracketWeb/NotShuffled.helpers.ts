import { NotShuffledFormState, NotShuffledStatus } from './NotShuffled.types'
import { EventData } from '@/Common/Common.types'

/**
 * Gets initial Not Shuffled state
 */
export const getInitialNotShuffledState = (): NotShuffledFormState => ({
  error: '',
  success: '',
  status: NotShuffledStatus.Success,
})

/**
 * Gets an estimate for how long the shuffle will take
 */
export const getTimeEstimate = (bIndex: number, eventData: EventData) => {}

/**
 * Creates a randomized array of all bracket indices and shuffles them so players can be randomly assigned
 **/
export const getRandBIndices = (numBrackets: number): number[] => {
  const bracketIndices = []

  return [0, 1]
}
