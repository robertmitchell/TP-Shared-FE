import type { Player } from '@/Common/Common.types'

import { getPlayerHandicap } from '@/Common/Utils/getPlayerHandicap'

import LOGO from '@/assets/logo.png'

type Props = {
  basedOnPercent: number
  basedOnScore: number
  isHandicap: boolean
  gameScore?: number
  player: Player
}

/**
 * The information for a player in a table
 */
export const PlayerInfo = (props: Props) => {
  const { basedOnPercent, basedOnScore, gameScore, isHandicap, player } = props

  const { average, email, firstName, isMale, lane, lastName, photo } = player
  let playerHandicap = 0
  if (isHandicap) {
    playerHandicap = getPlayerHandicap(player, basedOnPercent, basedOnScore)
  }

  const gender = isMale ? '(M)' : '(F)'

  return (
    <>
      <div className="table-cell p-3 whitespace-nowrap text-xs text-gray-500 border-r border-gray-200">
        <div className="flex items-center">
          {/* <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={photo || LOGO}
              alt="Player photo"
            />
          </div> */}

          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {gender} {firstName} {lastName}
            </div>
            <div>Lane: {lane}</div>
            <div>Average: {average}</div>
            {isHandicap && <div>Handicap: {playerHandicap}</div>}
            <div>{email}</div>
          </div>
        </div>
      </div>

      {gameScore !== undefined && (
        <div className="table-cell p-3 whitespace-nowrap">{gameScore}</div>
      )}
    </>
  )
}
