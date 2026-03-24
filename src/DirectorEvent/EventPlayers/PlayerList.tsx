import { useEffect, useState } from 'react'
import { PaginatedList } from 'react-paginated-list'
import type { Updater } from 'use-immer'

import type { EventData, Player } from '@/Common/Common.types'
import { PLAYERS_PER_PAGE } from './PlayerList.constants'

import { getFilteredPlayersList } from '@/Common/Utils/getFilteredPlayersList'

import { TextInput } from '@/Common/Components/TextInput'

import {
  PlayersContainer,
  PlayersControlContainer,
} from '@/Common/Utils/paginationStyles'

import LOGO from '@/assets/logo.png'

type Props = {
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
}

/**
 * List of players added to an event
 */
export const PlayerList = (props: Props) => {
  const { eventData, isPlayer, setEventData } = props

  const [filteredPlayers, setFilteredPlayers] = useState(
    getFilteredPlayersList(eventData, ''),
  )
  const [term, setTerm] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [player, setPlayer] = useState<Player | undefined>(undefined)

  // Updates the players shown in the list after filtering
  useEffect(() => {
    setFilteredPlayers(getFilteredPlayersList(eventData, term))
  }, [eventData.guestPlayers])

  return (
    <main>
      <TextInput
        isEditing
        className="w-80 mb-2 ml-2 sm:ml-0"
        labelText="Search Players"
        placeholder="Enter a Name"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value)
          setFilteredPlayers(getFilteredPlayersList(eventData, e.target.value))
        }}
      />

      {filteredPlayers.length > 0 && (
        <ul role="list">
          <PaginatedList
            ControlContainer={PlayersControlContainer}
            displayNumbers={filteredPlayers.length > PLAYERS_PER_PAGE}
            itemsPerPage={PLAYERS_PER_PAGE}
            list={filteredPlayers}
            PaginatedListContainer={PlayersContainer}
            onPageChange={(_items, currentPage) =>
              setPageIndex(currentPage - 1)
            }
            renderList={(list) => (
              <>
                {list.map((person, index) => {
                  const {
                    average,
                    firstName,
                    id,
                    isMale,
                    lane,
                    lastName,
                    photo,
                  } = person

                  const gender = isMale ? '(M)' : '(F)'

                  return (
                    <li
                      key={`${id}_${index}`}
                      className="rounded-lg shadow cursor-pointer p-1 mt-1 bg-gray-100 mx-2 sm:mx-0"
                      onClick={() => {
                        setPlayer(person)
                      }}
                    >
                      <div className="flex flex-col text-center">
                        {/* <img
                          className="w-16 h-16 mx-auto rounded-full"
                          src={photo || LOGO}
                          alt="player photo"
                        /> */}
                        <h3 className="text-gray-900 text-sm text-ellipsis overflow-hidden">
                          <span className="font-medium">
                            {gender} {firstName} {lastName}
                          </span>
                        </h3>
                        <div className="flex flex-col text-gray-500 text-xs">
                          <p>Avg: {average}</p>
                          <p>Lane: {lane}</p>
                        </div>
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
