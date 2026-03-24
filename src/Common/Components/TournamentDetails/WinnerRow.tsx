import type { TournamentPlayer } from './TournamentForm.types'
import type { EventData } from '@/Common/Common.types'

import { getPlayerHandicap } from '@/Common/Utils/getPlayerHandicap'

import LOGO from '@/assets/logo.png'

type Props = {
  currentPage: number
  eventData: EventData
  numResults: number
  player: TournamentPlayer
  rowIndex: number
  tIndex: number
}

/**
 * Table row for a player in an ended Tournament
 */
export const WinnerRow = (props: Props) => {
  const { currentPage, eventData, numResults, player, rowIndex, tIndex } = props

  const { email, firstName, id, isMale, lastName, scores, photo, totalScore } =
    player
  const { isHandicap, basedOnPercent, basedOnScore } =
    eventData.tournaments[tIndex]

  let playerHandicap = 0
  if (isHandicap) {
    playerHandicap = getPlayerHandicap(player, basedOnPercent, basedOnScore)
  }
  const gender = isMale ? '(M)' : '(F)'

  return (
    <div
      className={`table-row ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
    >
      <div className="table-cell p-3 text-sm text-center">
        {rowIndex + 1 + currentPage * numResults}
      </div>
      <div className="table-cell p-3 text-sm whitespace-nowrap border-r border-gray-200">
        <div className="flex items-center">
          {/* <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={photo || LOGO}
              alt="Player photo"
            />
          </div> */}

          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {gender} {firstName} {lastName}
            </div>
            <div className="text-gray-500">{email}</div>
          </div>
        </div>
      </div>

      {scores.map((score, index) => (
        <div
          key={`player:${id} score:${index}`}
          className="table-cell p-3 max-w-[150px] text-sm font-medium text-gray-500 whitespace-nowrap"
        >
          <div className="flex flex-col items-center">
            <span>{score + playerHandicap || '---'}</span>
            {isHandicap && (
              <span className="text-xs">
                {score} + {playerHandicap}
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="table-cell p-3 max-w-[150px] text-center text-sm font-medium text-black border-l border-gray-200">
        {totalScore}
      </div>
    </div>
  )
}
