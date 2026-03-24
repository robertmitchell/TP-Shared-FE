import type { EventData, Team } from '@/Common/Common.types'

import { getTeamPlayerHandicap } from '@/Common/Utils/getTeamPlayerHandicap'

type Props = {
  eventData: EventData
  isBracket: boolean
  tbIndex: number
  team: Team
}

/**
 * Shows the details for a team
 */
export const TeamInfo = (props: Props) => {
  const { eventData, isBracket, tbIndex, team } = props

  const { isHandicap, basedOnPercent, basedOnScore } = isBracket
    ? eventData.brackets[tbIndex]
    : eventData.tournaments[tbIndex]

  return (
    <div className="text-left">
      {team.players.map((player, playerIndex) => {
        let playerHandicap = 0

        if (isHandicap) {
          playerHandicap = getTeamPlayerHandicap(
            player,
            eventData,
            basedOnPercent,
            basedOnScore,
          )
        }

        const gender = player.isMale ? '(M)' : '(F)'

        return (
          <div
            className={`text-sm px-2 py-1 ${
              playerIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
            }`}
            key={`${team.id}_${player.playerId}_${playerIndex}`}
          >
            {gender} {player.name}
            {isHandicap && (
              <div className="text-xs text-gray-500">
                Handicap: {playerHandicap}
              </div>
            )}
          </div>
        )
      })}

      <div className="text-sm font-bold">Total</div>
    </div>
  )
}
