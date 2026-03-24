import type { BracketResults } from '@/Common/Common.types'

/**
 * Creates an empty bracket results obejct
 */
export const createEmptyBracketResults = (): BracketResults => ({
  firstPlace: [],
  firstTies: [],
  secondPlace: [],
  secondTies: [],
  thirdPlace: [],
  thirdTies: [],
  fourthPlace: [],
  fourthTies: [],
})
