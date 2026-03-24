import type { EventData } from '@/Common/Common.types'

import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'

type Props = {
  eventData: EventData
  isBracket?: boolean
  isEnded: boolean
  tbIndex: number
}

/**
 * Displays the game number headers for singles events
 */
export const TBSinglesScoresHeader = (props: Props) => {
  const { eventData, isBracket, isEnded, tbIndex } = props

  const numRounds = isBracket
    ? getBracketNumRounds(eventData.brackets[tbIndex].bracketNumPlayers)
    : eventData.tournaments[tbIndex].numRounds
  const roundArray = new Array(numRounds).fill(true)

  return (
    <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
      <div className="table-row">
        {isEnded && <div className="table-cell p-3 max-w-[100px]">Rank</div>}
        <div className="table-cell p-3 border-r border-gray-200 whitespace-nowrap min-w-[150px]">
          Player Name
        </div>
        {roundArray.map((_round, columnIndex: number) => (
          <div
            key={`tournament_headers_${columnIndex}`}
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
