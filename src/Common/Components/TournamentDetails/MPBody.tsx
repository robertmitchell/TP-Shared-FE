import { PaginatedList } from 'react-paginated-list'

import type { EventData } from '@/Common/Common.types'
import { TWENTY_FIVE_ITEMS_PER_PAGE } from './MPBody.constants'

import { getMatchups } from '@/Common/Utils/getMPMatchups'

import { MPPlayersInfo } from './MPPlayersInfo'
import { MPPlayersScoresRow } from './MPPlayersScoresRow'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  roundIndex: number
  tIndex: number
}

/**
 * Displays the matchups in a Match Play round
 */
export const MPBody = (props: Props) => {
  const { eventData, roundIndex, tIndex } = props

  const matchups = getMatchups(tIndex, roundIndex, eventData)

  return (
    <PaginatedList
      ControlContainer={ControlContainer}
      displayNumbers={matchups.length > TWENTY_FIVE_ITEMS_PER_PAGE}
      itemsPerPage={TWENTY_FIVE_ITEMS_PER_PAGE}
      list={matchups}
      PaginatedListContainer={TournamentTableContainer}
      useMinimalControls
      renderList={(list) => (
        <>
          {list.map((matchup, rowIndex) => {
            return (
              <div
                key={rowIndex}
                className={`table-row ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <MPPlayersInfo
                  eventData={eventData}
                  matchup={matchup}
                  tIndex={tIndex}
                />
                <MPPlayersScoresRow
                  eventData={eventData}
                  matchup={matchup}
                  roundIndex={roundIndex}
                  tIndex={tIndex}
                />
              </div>
            )
          })}
        </>
      )}
    />
  )
}
