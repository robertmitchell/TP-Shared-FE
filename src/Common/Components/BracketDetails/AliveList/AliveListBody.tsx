import { PaginatedList } from 'react-paginated-list'

import type { EventData } from '@/Common/Common.types'
import { HUNDRED_ITEMS_PER_PAGE } from '@/DirectorEvent/EventScores/ScoresBody.constants'

import { AliveLisPlayerRow } from './AliveListPlayerRow'
import { AliveListTeamRow } from './AliveListTeamRow'

import {
  ControlContainer,
  TournamentTableContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  bIndex: number
  eventData: EventData
  showAmountDue?: boolean
  showCollected?: boolean
}

/**
 * Entrypoint for the rows of the alive list table body
 */
export const AliveListBody = (props: Props) => {
  const {
    bIndex,
    eventData,
    showAmountDue = true,
    showCollected = false,
  } = props

  const { areTeamsEnabled, id } = eventData.brackets[bIndex]

  if (areTeamsEnabled) {
    return (
      <PaginatedList
        ControlContainer={ControlContainer}
        displayNumbers={eventData.teams.length > HUNDRED_ITEMS_PER_PAGE}
        itemsPerPage={HUNDRED_ITEMS_PER_PAGE}
        list={eventData.teams}
        PaginatedListContainer={TournamentTableContainer}
        useMinimalControls
        renderList={(list) => (
          <>
            {list.map((team, rowIndex) => {
              return (
                <div
                  key={team.id}
                  className={`table-row ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  }`}
                >
                  <AliveListTeamRow
                    bIndex={bIndex}
                    eventData={eventData}
                    showAmountDue={showAmountDue}
                    showCollected={showCollected}
                    team={team}
                  />
                </div>
              )
            })}
          </>
        )}
      />
    )
  }

  return (
    <PaginatedList
      list={eventData.guestPlayers}
      itemsPerPage={HUNDRED_ITEMS_PER_PAGE}
      useMinimalControls
      displayNumbers={eventData.guestPlayers.length > HUNDRED_ITEMS_PER_PAGE}
      PaginatedListContainer={TournamentTableContainer}
      ControlContainer={ControlContainer}
      renderList={(list) => (
        <>
          {list.map((player, rowIndex) => {
            return (
              <div
                key={player.id}
                className={`table-row ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <AliveLisPlayerRow
                  bIndex={bIndex}
                  eventData={eventData}
                  player={player}
                  showAmountDue={showAmountDue}
                  showCollected={showCollected}
                />
              </div>
            )
          })}
        </>
      )}
    />
  )
}
