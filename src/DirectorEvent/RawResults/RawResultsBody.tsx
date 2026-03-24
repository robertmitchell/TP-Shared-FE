import { PaginatedList } from 'react-paginated-list'

import type { EventData } from '@/Common/Common.types'
import { SORT_SCORE_DESC } from '@/Common/Components/Tables/SortByButtons.constants'
import { HUNDRED_ITEMS_PER_PAGE } from '../EventScores/ScoresBody.constants'

import {
  getRegisteredPlayersList,
  sortRegisteredPlayers,
} from '@/Common/Components/Tables/TBSinglesScoresBody/TBSinglesScoresBody.helpers'

import { PlayerInfo } from '@/Common/Components/Tables/PlayerInfo/PlayerInfo'
import { PlayerScoresRow } from '@/Common/Components/Tables/TBSinglesScoresBody/PlayerScoresRow'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  isBracket?: boolean
  showAll?: boolean
  tbIndex: number
}

/**
 * Used for displaying raw player scores in a table for tournaments and brackets
 */
export const RawResultsBody = (props: Props) => {
  const { eventData, isBracket = false, showAll = true, tbIndex } = props

  const registeredPlayers = getRegisteredPlayersList(
    tbIndex,
    isBracket,
    eventData,
  )

  const { isHandicap, basedOnPercent, basedOnScore } = isBracket
    ? eventData.brackets[tbIndex]
    : eventData.tournaments[tbIndex]

  const sortedPlayers = sortRegisteredPlayers(
    registeredPlayers,
    SORT_SCORE_DESC,
    tbIndex,
    isBracket,
    eventData,
  )

  return (
    <PaginatedList
      list={sortedPlayers}
      itemsPerPage={HUNDRED_ITEMS_PER_PAGE}
      useMinimalControls
      displayNumbers={sortedPlayers.length > HUNDRED_ITEMS_PER_PAGE}
      PaginatedListContainer={TournamentTableContainer}
      ControlContainer={ControlContainer}
      renderList={(list) => (
        <>
          {list.map((player, rowIndex) => {
            return (
              <div
                key={`${player.id}_${rowIndex}`}
                className={`table-row ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <div className="table-cell p-3 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    {rowIndex + 1}
                  </div>
                </div>

                <PlayerInfo
                  basedOnPercent={basedOnPercent}
                  basedOnScore={basedOnScore}
                  isHandicap={isHandicap}
                  player={player}
                />
                <PlayerScoresRow
                  eventData={eventData}
                  isBracket={isBracket}
                  player={player}
                  showAll={showAll}
                  tbIndex={tbIndex}
                />
              </div>
            )
          })}
        </>
      )}
    />
  )
}
