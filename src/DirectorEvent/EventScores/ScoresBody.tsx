import { PaginatedList } from 'react-paginated-list'
import type { Updater } from 'use-immer'

import type { EventData, Player, SetState } from '@/Common/Common.types'
import { HUNDRED_ITEMS_PER_PAGE } from './ScoresBody.constants'

import { getFilteredPlayersList } from '@/Common/Utils/getFilteredPlayersList'

import { PlayerInfo } from '@/Common/Components/Tables/PlayerInfo/PlayerInfo'
import { ScoreField } from './ScoreField'
import { TotalScoreField } from './TotalScoreField'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  filterTerm: string
  isPlayer: boolean
  isPrintMode?: boolean
  setEventData: Updater<EventData>
  setIsDirty?: SetState<boolean>
  showTotals: boolean
  sortByNames: boolean
}

/**
 * Displays the score input fields to show scores
 */
export const ScoresBody = (props: Props) => {
  const {
    eventData,
    filterTerm,
    isPlayer,
    isPrintMode,
    setEventData,
    setIsDirty,
    showTotals,
    sortByNames,
  } = props

  let guestPlayers: Player[] = getFilteredPlayersList(eventData, filterTerm)
  if (sortByNames) {
    guestPlayers.sort((a, b) => {
      if (`${a.firstName} ${a.lastName}` < `${b.firstName} ${b.lastName}`) {
        return -1
      }
      if (`${a.firstName} ${a.lastName}` > `${b.firstName} ${b.lastName}`) {
        return 1
      }
      return 0
    })
  } else {
    // `+` before converts the string to a number
    guestPlayers.sort((a, b) => +a.lane - +b.lane)
  }

  return (
    <PaginatedList
      list={guestPlayers}
      itemsPerPage={HUNDRED_ITEMS_PER_PAGE}
      useMinimalControls
      displayNumbers={guestPlayers.length > HUNDRED_ITEMS_PER_PAGE}
      PaginatedListContainer={TournamentTableContainer}
      ControlContainer={ControlContainer}
      renderList={(list) => (
        <>
          {list.map((player, rowIndex) => {
            return (
              <div
                key={`${player.id}_row_${rowIndex}`}
                className={`table-row ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <PlayerInfo
                  player={player}
                  isHandicap={false}
                  basedOnPercent={0}
                  basedOnScore={0}
                />

                {eventData.games.map((game, columnIndex) => (
                  <ScoreField
                    key={`${player.id}_row_${rowIndex}_game_${game.id}_column_${columnIndex}`}
                    player={player}
                    game={game}
                    tabIndex={columnIndex + 1}
                    eventData={eventData}
                    setEventData={setEventData}
                    isPrintMode={isPrintMode}
                    isPlayer={isPlayer}
                    setIsDirty={setIsDirty}
                  />
                ))}

                {showTotals && (
                  <TotalScoreField player={player} eventData={eventData} />
                )}
              </div>
            )
          })}
        </>
      )}
    />
  )
}
