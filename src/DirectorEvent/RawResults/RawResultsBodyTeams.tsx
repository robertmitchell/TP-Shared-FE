import { PaginatedList } from 'react-paginated-list'

import type { EventData, Team } from '@/Common/Common.types'
import { HUNDRED_ITEMS_PER_PAGE } from '../EventScores/ScoresBody.constants'

import {
  getRegisteredTeamsList,
  sortRegisteredTeams,
} from '@/Common/Components/Tables/TBTeamsScoresBody/TBTeamsScoresBody.helpers'

import { TeamInfo } from '@/Common/Components/Tables/TeamInfo/TeamInfo'
import { TeamScoresRow } from '@/Common/Components/Tables/TBTeamsScoresBody/TeamScoresRow/TeamScoresRow'

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
 * Used for displaying raw team scores in a table for tournaments and brackets
 */
export const RawResultsBodyTeams = (props: Props) => {
  const { eventData, isBracket = false, showAll, tbIndex } = props

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
    5,
    tbIndex,
  )

  return (
    <PaginatedList
      list={sortedTeams}
      itemsPerPage={HUNDRED_ITEMS_PER_PAGE}
      useMinimalControls
      displayNumbers={sortedTeams.length > HUNDRED_ITEMS_PER_PAGE}
      PaginatedListContainer={TournamentTableContainer}
      ControlContainer={ControlContainer}
      renderList={(list) => (
        <>
          {list.map((team, rowIndex) => {
            return (
              <div
                className={`table-row text-center ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                }`}
                key={`team_${team.id}_${rowIndex}`}
              >
                <div className="table-cell p-3 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    {rowIndex + 1}
                  </div>
                </div>

                <div className="table-cell whitespace-nowrap">
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
                  showAll={showAll}
                  tbIndex={tbIndex}
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
