import { PaginatedList } from 'react-paginated-list'

import type { EventData } from '@/Common/Common.types'
import { TWENTY_FIVE_ITEMS_PER_PAGE } from './TBSinglesScoresBody.constants'

import {
  getRegisteredPlayersList,
  sortRegisteredPlayers,
} from './TBSinglesScoresBody.helpers'

import { PlayerInfo } from '../PlayerInfo/PlayerInfo'
import { PlayerScoresRow } from './PlayerScoresRow'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  isBracket?: boolean
  sortBy: number
  tbIndex: number
}

/**
 * Used for displaying player scores in a table for tournaments and brackets
 */
export const TBSinglesScoresBody = (props: Props) => {
  const { eventData, isBracket = false, sortBy, tbIndex } = props

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
    sortBy,
    tbIndex,
    isBracket,
    eventData,
  )

  if (registeredPlayers.length === 0) {
    return null
  }

  return (
    <PaginatedList
      list={sortedPlayers}
      itemsPerPage={TWENTY_FIVE_ITEMS_PER_PAGE}
      useMinimalControls
      displayNumbers={sortedPlayers.length > TWENTY_FIVE_ITEMS_PER_PAGE}
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
                <PlayerInfo
                  player={player}
                  isHandicap={isHandicap}
                  basedOnPercent={basedOnPercent}
                  basedOnScore={basedOnScore}
                />
                <PlayerScoresRow
                  player={player}
                  eventData={eventData}
                  tbIndex={tbIndex}
                  isBracket={isBracket}
                />
              </div>
            )
          })}
        </>
      )}
    />
  )
}
