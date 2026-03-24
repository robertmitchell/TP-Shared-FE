import type { PlayerEventDetails } from '@/Common/Common.types'

/**
 * Used for searching events for players
 */
export type BrowseEventsState = {
  error: string
  events: PlayerEventDetails[]
  loading: boolean
  success: string
}
