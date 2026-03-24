import { PaginatedList } from 'react-paginated-list'

import type { EventData, Team } from '@/Common/Common.types'
import { TWENTY_FIVE_ITEMS_PER_PAGE } from './TBTeamsScoresBody.constants'

import {
  getRegisteredTeamsList,
  sortRegisteredTeams,
} from './TBTeamsScoresBody.helpers'

import { TeamInfo } from '../TeamInfo/TeamInfo'
import { TeamScoresRow } from './TeamScoresRow/TeamScoresRow'

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
 * Used for displaying team scores in a table for tournaments and brackets
 */
export const TBTeamsScoresBody = (props: Props) => {
  const { eventData, isBracket = false, sortBy, tbIndex } = props

  const tbId = isBracket
    ? eventData.brackets[tbIndex].id
    : eventData.tournaments[tbIndex].id

  const registeredTeams: Team[] = getRegisteredTeamsList(
    tbId,
    isBracket,
    eventData,
  )

  const sortedTeams = sortRegisteredTeams(
    eventData,
    isBracket,
    registeredTeams,
    sortBy,
    tbIndex,
  )

  return (
    <PaginatedList
      list={sortedTeams}
      itemsPerPage={TWENTY_FIVE_ITEMS_PER_PAGE}
      useMinimalControls
      displayNumbers={sortedTeams.length > TWENTY_FIVE_ITEMS_PER_PAGE}
      PaginatedListContainer={TournamentTableContainer}
      ControlContainer={ControlContainer}
      renderList={(list) => (
        <>
          {list.map((team, rowIndex) => (
            <div
              key={`team_${team.id}_${rowIndex}`}
              className={`table-row text-center ${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              <div className="table-cell">
                <h3 className="text-gray-900 text-xl font-medium">
                  {team.name}
                </h3>
                <p>Lane: {team.lane}</p>
              </div>

              <div className="table-cell py-3 whitespace-nowrap border-r border-gray-200">
                <TeamInfo
                  team={team}
                  eventData={eventData}
                  tbIndex={tbIndex}
                  isBracket={isBracket}
                />
              </div>

              <TeamScoresRow
                eventData={eventData}
                isBracket={isBracket}
                tbIndex={tbIndex}
                team={team}
              />
            </div>
          ))}
        </>
      )}
    />
  )
}
