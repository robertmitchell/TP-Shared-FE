import type { EventData, Player } from '@/Common/Common.types'

import { getScoreIndex } from './ScoreField.helpers'

/**
 * Gets the total score for the player
 */
export const calculateTotalScore = (player: Player, eventData: EventData) => {
  let totalScore = 0
  for (let gi = 0; gi < eventData.games.length; gi++) {
    const scoreIndex = getScoreIndex(player, eventData.games[gi], eventData)
    if (scoreIndex > -1) {
      totalScore += eventData.scores[scoreIndex].score
    }
  }

  return totalScore
}
