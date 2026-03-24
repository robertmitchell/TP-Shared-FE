import type { EventData } from '@/Common/Common.types'
import type { BracketWeb, MatchWinnerStatus } from '../BracketForm.types'

/**
 * Simple object to hold params for many shuffle functions
 */
export type ShuffledParams = {
  updatedEventData: EventData
  isFinalRound: boolean
  bi: number
  ebbi: number
  roundIndex: number // Will be current round for winners, previous round for losers
  ebbrmi: number
}

/**
 * Holds params for setting the round status
 */
export type RoundStatusParams = {
  bracketWebCopy: BracketWeb
  ebbri: number // round
  ebbrmi: number // match
  ebbrmpi: number // player
  matchWinnerStatus: MatchWinnerStatus
}
