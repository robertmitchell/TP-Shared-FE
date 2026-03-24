import type { EventData, Player } from '@/Common/Common.types'

import { getPlayerScores } from './PlayerScoresRow.helpers'
import { getPlayerHandicap } from '../../../Utils/getPlayerHandicap'

type Props = {
  eventData: EventData
  isBracket?: boolean
  player: Player
  showAll?: boolean
  tbIndex: number
}

/**
 * Shows the player scores for all rounds
 */
export const PlayerScoresRow = (props: Props) => {
  const { eventData, isBracket, player, showAll = true, tbIndex } = props

  const { isHandicap, basedOnPercent, basedOnScore } = isBracket
    ? eventData.brackets[tbIndex]
    : eventData.tournaments[tbIndex]

  let playerHandicap = 0
  if (isHandicap) {
    playerHandicap = getPlayerHandicap(player, basedOnPercent, basedOnScore)
  }

  const scores = getPlayerScores(tbIndex, isBracket, player, eventData)

  let totalScore = 0
  for (let i = 0; i < scores.length; i++) {
    totalScore += scores[i].score | 0
    totalScore += playerHandicap
  }

  return (
    <>
      {showAll &&
        scores.map((score, index) => (
          <div
            key={`player:${player.id} score:${index}`}
            className="table-cell p-3 text-sm font-medium text-gray-500"
          >
            <div className="flex flex-col items-center">
              <span>{score.score + playerHandicap || '---'}</span>
              {isHandicap && (
                <span className="text-xs whitespace-nowrap">
                  {score.score} + {playerHandicap}
                </span>
              )}
            </div>
          </div>
        ))}

      <div className="table-cell p-3 max-w-[150px] text-center text-sm font-medium text-black border-l border-gray-200">
        {totalScore}
      </div>
    </>
  )
}
