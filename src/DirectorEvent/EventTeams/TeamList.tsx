import { useEffect, useState } from 'react'
import { PaginatedList } from 'react-paginated-list'
import type { Updater } from 'use-immer'

import type { EventData, Team } from '@/Common/Common.types'
import { PLAYERS_PER_PAGE } from '../EventPlayers/PlayerList.constants'

import { getFilteredTeamsList } from './TeamList.helpers'

import { TextInput } from '@/Common/Components/TextInput'

import {
  PlayersContainer,
  PlayersControlContainer,
} from '@/Common/Utils/paginationStyles'

type Props = {
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
}

/**
 * List of teams added to an event
 */
export const TeamList = (props: Props) => {
  const { eventData, isPlayer, setEventData } = props

  const [filteredTeams, setFilteredTeams] = useState(
    getFilteredTeamsList(eventData, ''),
  )
  const [term, setTerm] = useState('')
  const [team, setTeam] = useState<Team | undefined>(undefined)

  // Updates the teams shown in the list after filtering
  useEffect(() => {
    setFilteredTeams(getFilteredTeamsList(eventData, term))
  }, [eventData.teams])

  return (
    <main>
      <TextInput
        isEditing
        className="mb-2 ml-2 sm:ml-0"
        labelText="Filter Teams"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value)
          setFilteredTeams(getFilteredTeamsList(eventData, e.target.value))
        }}
      />

      {filteredTeams.length > 0 && (
        <ul role="list">
          <PaginatedList
            ControlContainer={PlayersControlContainer}
            displayNumbers={filteredTeams.length > PLAYERS_PER_PAGE}
            itemsPerPage={PLAYERS_PER_PAGE}
            list={filteredTeams}
            PaginatedListContainer={PlayersContainer}
            useMinimalControls
            renderList={(list) => (
              <>
                {list.map((team) => {
                  const { id, name, players } = team

                  return (
                    <li
                      key={id}
                      className="rounded-lg shadow cursor-pointer p-1 mt-1 bg-gray-100 mx-2 sm:mx-0"
                      onClick={() => {
                        setTeam(team)
                      }}
                    >
                      <div className="flex flex-col text-center">
                        <h3 className="text-gray-900 text-lg font-medium leading-6 mb-2">
                          {name}
                        </h3>
                        <ul className="w-full">
                          {players.map((player) => (
                            <li
                              key={`${id}_${player.playerId}`}
                              className={`text-sm text-ellipsis overflow-hidden`}
                            >
                              - {player.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  )
                })}
              </>
            )}
          />
        </ul>
      )}
    </main>
  )
}
