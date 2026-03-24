import type { EventData } from '@/Common/Common.types'

import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'

type Props = {
  eventData: EventData
  isBracket?: boolean
  showAll?: boolean
  tbIndex: number
}

/**
 * A Table Header for the Raw Results for Teams
 */
export const RawResultsHeaderTeams = (props: Props) => {
  const { eventData, isBracket = false, showAll = true, tbIndex } = props

  const numRounds = isBracket
    ? getBracketNumRounds(eventData.brackets[tbIndex].bracketNumPlayers)
    : eventData.tournaments[tbIndex].numRounds
  const roundArray = new Array(numRounds).fill(true)

  return (
    <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
      <div className="table-row">
        <div className="table-cell p-3">Rank</div>

        <div className="table-cell p-3">Team Name</div>

        <div className="table-cell p-3 border-r border-gray-200">Players</div>

        {showAll &&
          roundArray.map((round, columnIndex: number) => (
            <div
              className="table-cell p-3"
              key={`tournament_headers_${round}_${columnIndex}`}
            >
              {`Game ${columnIndex + 1}`}
            </div>
          ))}

        <div className="table-cell p-3 border-l border-gray-200">Total</div>
      </div>
    </div>
  )
}
