import type { TournamentPlayer } from './TournamentForm.types'
import type { EventData } from '@/Common/Common.types'

import { getPlayerHandicap } from '@/Common/Utils/getPlayerHandicap'

type Props = {
  currentPage: number
  eventData: EventData
  numResults: number
  rowIndex: number
  rRCouple: TournamentPlayer[]
  tIndex: number
}

/**
 * Table row for a Round Robin Couple in an ended Tournament
 */
export const RRRow = (props: Props) => {
  const { currentPage, eventData, numResults, rowIndex, rRCouple, tIndex } =
    props

  const { isHandicap, basedOnPercent, basedOnScore } =
    eventData.tournaments[tIndex]

  let playerHandicap1 = 0
  let playerHandicap2 = 0
  if (isHandicap) {
    playerHandicap1 = getPlayerHandicap(
      rRCouple[0],
      basedOnPercent,
      basedOnScore,
    )
    playerHandicap2 = getPlayerHandicap(
      rRCouple[1],
      basedOnPercent,
      basedOnScore,
    )
  }

  return (
    <div
      className={`table-row text-sm text-center ${
        rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
      }`}
    >
      <div className="table-cell p-3 font-medium max-w-[100px]">
        {rowIndex + 1 + currentPage * numResults}
      </div>
      <div className="table-cell text-left p-3 font-medium whitespace-nowrap min-w-[150px] border-r border-gray-200">
        <div className="flex flex-col">
          <span className="text-gray-900">
            {rRCouple[0].isMale ? '(M) ' : '(F) '}
            {rRCouple[0].firstName} {rRCouple[0].lastName}
          </span>
          <span className="text-xs text-gray-900">{rRCouple[0].email}</span>

          <span className="text-blue-900">
            {rRCouple[1].isMale ? '(M) ' : '(F) '}
            {rRCouple[1].firstName} {rRCouple[1].lastName}
          </span>
          <span className="text-xs text-blue-900">{rRCouple[1].email}</span>
        </div>
      </div>

      {rRCouple[0].scores.map((score, index) => (
        <div
          key={`${rRCouple[0].id}-${rRCouple[1].id}-${index}`}
          className="table-cell p-3 whitespace-nowrap text-sm text-gray-500"
        >
          <div className="flex flex-col items-center text-sm font-medium text-gray-600">
            <span>{score + playerHandicap1 || '---'}</span>
            {isHandicap && (
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {score} + {playerHandicap1}
              </span>
            )}

            <span className="text-blue-900">
              {rRCouple[1].scores[index] + playerHandicap2 || '---'}
            </span>
            {isHandicap && (
              <span className="text-xs text-blue-400 whitespace-nowrap">
                {rRCouple[1].scores[index]} + {playerHandicap2}
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="table-cell p-3 max-w-[150px] text-center text-sm font-medium text-black border-l border-gray-200">
        <span>{rRCouple[0].totalScore + rRCouple[1].totalScore}</span>
      </div>
    </div>
  )
}
