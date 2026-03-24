import type { EventData } from '@/Common/Common.types'
import type { MatchupResult } from './TournamentForm.types'

import { getPlayerHandicap } from '@/Common/Utils/getPlayerHandicap'

import LOGO from '@/assets/logo.png'

type Props = {
  eventData: EventData
  matchup: MatchupResult
  tIndex: number
}

/**
 * Shows the players' info in each row of a Matchup Results row
 */
export const MPPlayersInfo = (props: Props) => {
  const { eventData, matchup, tIndex } = props

  const { isHandicap, basedOnPercent, basedOnScore } =
    eventData.tournaments[tIndex]

  const { player1, player2 } = matchup

  let player1Handicap = 0
  if (isHandicap) {
    player1Handicap = getPlayerHandicap(player1, basedOnPercent, basedOnScore)
  }

  let player2Handicap = 0
  if (isHandicap) {
    player2Handicap = getPlayerHandicap(player2, basedOnPercent, basedOnScore)
  }

  const gender1 = player1.isMale ? '(M)' : '(F)'
  const gender2 = player2.isMale ? '(M)' : '(F)'

  return (
    <div className="table-cell p-3 whitespace-nowrap text-xs text-gray-500 border-r border-gray-200">
      <div className="flex items-center mb-2">
        {/* <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src={player1.photo || LOGO}
            alt="Player photo"
          />
        </div> */}

        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">
            {gender1} {player1.firstName} {player1.lastName}
          </div>
          <div>Lane: {player1.lane}</div>
          <div>Average: {player1.average}</div>
          {isHandicap && <div>Handicap: {player1Handicap}</div>}
          <div>{player1.email}</div>
        </div>
      </div>

      <div className="flex items-center">
        {/* <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src={player2.photo || LOGO}
            alt="Player photo"
          />
        </div> */}

        <div className="ml-4">
          <div className="text-sm font-medium text-blue-700">
            {gender2} {player2.firstName} {player2.lastName}
          </div>
          <div>Lane: {player2.lane}</div>
          <div>Average: {player2.average}</div>
          {isHandicap && <div>Handicap: {player2Handicap}</div>}
          <div>{player2.email}</div>
        </div>
      </div>
    </div>
  )
}
