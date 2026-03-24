import { useState } from 'react'
import { PaginatedList } from 'react-paginated-list'

import type { EventData } from '@/Common/Common.types'
import { TWENTY_FIVE_ITEMS_PER_PAGE } from './EndedScoresBody.constants'

import { getRRTteams } from './EndScoresBody.helpers'

import { MPRow } from './MPRow'
import { RRRow } from './RRRow'
import { WinnerRow } from './WinnerRow'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  numResults: number
  tIndex: number
}

/**
 * Used for displaying player scores in a table for ended tournaments
 */
export const EndedScoresBody = (props: Props) => {
  const { eventData, numResults, tIndex } = props

  const [currentPage, setCurrentPage] = useState(1)

  let winners = []

  switch (eventData.tournaments[tIndex].tournamentType) {
    case 'Singles':
      return (
        <PaginatedList
          displayNumbers={
            eventData.tournaments[tIndex].winners.length > numResults
          }
          list={eventData.tournaments[tIndex].winners}
          itemsPerPage={numResults}
          useMinimalControls
          onPageChange={(_items, pageNumber) => {
            setCurrentPage(pageNumber)
          }}
          PaginatedListContainer={TournamentTableContainer}
          ControlContainer={ControlContainer}
          renderList={(list) => (
            <>
              {list.map((winner, rowIndex) => {
                return (
                  <WinnerRow
                    currentPage={currentPage - 1} // Starts at index 1 not 0
                    eventData={eventData}
                    numResults={numResults}
                    key={winner.id}
                    player={winner}
                    rowIndex={rowIndex}
                    tIndex={tIndex}
                  />
                )
              })}
            </>
          )}
        />
      )

    case 'Round Robin Singles':
      const { isMixed } = eventData.tournaments[tIndex]
      winners = eventData.tournaments[tIndex].winners

      const rRCouples = getRRTteams(isMixed, winners)

      return (
        <PaginatedList
          displayNumbers={
            eventData.tournaments[tIndex].winners.length > numResults
          }
          list={rRCouples}
          itemsPerPage={numResults}
          onPageChange={(_items, pageNumber) => {
            setCurrentPage(pageNumber)
          }}
          PaginatedListContainer={TournamentTableContainer}
          ControlContainer={ControlContainer}
          renderList={(list) => (
            <>
              {list.map((rRCouple, rowIndex) => {
                return (
                  <RRRow
                    currentPage={currentPage - 1} // Starts at index 1 not 0
                    eventData={eventData}
                    numResults={numResults}
                    key={`${rRCouple[0].id}-${rRCouple[1].id}`}
                    rRCouple={rRCouple}
                    rowIndex={rowIndex}
                    tIndex={tIndex}
                  />
                )
              })}
            </>
          )}
        />
      )

    case 'Match Play Singles':
      winners = eventData.tournaments[tIndex].winners

      return (
        <PaginatedList
          list={winners}
          itemsPerPage={TWENTY_FIVE_ITEMS_PER_PAGE}
          PaginatedListContainer={TournamentTableContainer}
          ControlContainer={ControlContainer}
          renderList={(list) => (
            <>
              {list.map((winner, rowIndex) => {
                return (
                  <MPRow key={winner.id} rowIndex={rowIndex} winner={winner} />
                )
              })}
            </>
          )}
        />
      )

    default:
      return (
        <h1 className="text-2xl font-semibold text-green-50">
          An unkown error occured. Error Code: ESBSX_001
        </h1>
      )
  }
}
