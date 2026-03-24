import type { EventData } from '@/Common/Common.types'

import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'

type Props = {
  eventData: EventData
  isBracket?: boolean
  tbIndex: number
}

/**
 * Displays the game number headers for teams events
 */
export const TBTeamsScoresHeader = (props: Props) => {
  const { eventData, isBracket, tbIndex } = props

  const numRounds = isBracket
    ? getBracketNumRounds(eventData.brackets[tbIndex].bracketNumPlayers)
    : eventData.tournaments[tbIndex].numRounds
  const roundArray = new Array(numRounds).fill(true)

  return (
    <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
      <div className="table-row">
        <div className="table-cell p-3">Team Name</div>

        <div className="table-cell p-3 border-r border-gray-200">Players</div>

        {roundArray.map((round, columnIndex: number) => (
          <div
            key={`tournament_headers_${round}_${columnIndex}`}
            className="table-cell p-3"
          >
            {`Game ${columnIndex + 1}`}
          </div>
        ))}

        <div className="table-cell p-3 border-l border-gray-200">Total</div>
      </div>
    </div>
  )
}
