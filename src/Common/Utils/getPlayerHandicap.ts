import type { Player } from '@/Common/Common.types'
import type { MatchEntrant } from '@/Common/Components/BracketDetails/BracketForm.types'
import type { TournamentPlayer } from '@/Common/Components/TournamentDetails/TournamentForm.types'

/**
 * gets the player's handicap for the TLB
 */
export const getPlayerHandicap = (
  player: Player | MatchEntrant | TournamentPlayer,
  basedOnPercent: number,
  basedOnScore: number,
): number => {
  let playerHandicap = Math.floor(
    ((basedOnScore - player.average) * basedOnPercent) / 100,
  )
  if (playerHandicap < 0) {
    playerHandicap = 0
  }

  return playerHandicap
}
