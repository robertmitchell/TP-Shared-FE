import type { EventData } from '@/Common/Common.types'
import type { Refund } from './NotShuffledConfirmationModal.types'

/**
 * Finds out who the people are with refunds and how many
 */
export const getRefunds = (
  bIndex: number,
  updatedEventData: EventData,
): Refund[] => {
  const bId = updatedEventData.brackets[bIndex].id
  const { areTeamsEnabled } = updatedEventData.brackets[bIndex]

  return areTeamsEnabled
    ? getTeamRefunds(bId, updatedEventData)
    : getPlayerRefunds(bId, updatedEventData)
}

/**
 * Gets the refunds for a player bracket
 */
const getPlayerRefunds = (bId: string, updatedEventData: EventData) => {
  const refunds: Refund[] = []

  return refunds
}

/**
 * Gets the refunds for a team bracket
 */
const getTeamRefunds = (bId: string, updatedEventData: EventData) => {
  const refunds: Refund[] = []

  return refunds
}
