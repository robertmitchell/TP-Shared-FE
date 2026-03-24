import { useEffect } from 'react'
import type { Updater } from 'use-immer'

import type { EventData } from '@/Common/Common.types'

import {
  getBNumGames,
  getTNumGames,
  updateInitialDropdowns,
} from './GameForm.helpers'
import { addEmptyGame } from '../GameDetails.helpers'

import { Button } from '@/Common/Components/Button'
import { Dropdown } from '@/Common/Components/Dropdown'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  setEventData: Updater<EventData>
}

/**
 * Main container for the games table for assigning games to TLB
 */
export const GameForm = (props: Props) => {
  const { eventData, setEventData } = props

  useEffect(() => {
    updateInitialDropdowns(eventData, setEventData)
  }, [])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="w-full text-center text-xs font-medium uppercase tracking-wider">
                  <th className="px-6 py-3 border-r border-gray-300">
                    Tournament/Bracket Name
                  </th>
                  <th className="px-6 py-3">Game Names</th>

                  {eventData.games.map((_game, index) => {
                    // TODO REMOVE THIS HACK TO MAKE THE ROW CENTER TEXT
                    if (index === 0) {
                      return null
                    }

                    return (
                      <th key={index} className="row-span-3 px-6 py-3"></th>
                    )
                  })}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-300">
                <tr className="text-center text-xs font-medium uppercase tracking-wider">
                  <td className="px-6 py-3 border-r border-gray-300">
                    <Button
                      className="my-2"
                      onClick={() => addEmptyGame(eventData, setEventData)}
                    >
                      Add Game
                    </Button>
                    <Button
                      onClick={() =>
                        setEventData((draft) => {
                          draft.games.pop()
                        })
                      }
                    >
                      Remove Game
                    </Button>
                  </td>
                  {eventData.games.map((game, index) => (
                    <td key={`header_${game.id}`} className="px-6 py-3">
                      <TextInput
                        descClassName="text-xs"
                        description={`use ${index + 1} in the table below`}
                        isEditing
                        labelText=""
                        onChange={(e) =>
                          setEventData((draft) => {
                            draft.games[index].name = e.target.value
                          })
                        }
                        value={game.name}
                      />
                    </td>
                  ))}
                </tr>

                {eventData.tournaments.map((tournament, tIndex) => (
                  <tr
                    key={tournament.id}
                    className={
                      tIndex % 2 === 0 ? 'bg-green-100' : 'bg-green-50'
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800 border-r border-gray-300">
                      {tournament.name}
                    </td>

                    {eventData.games.map((game, index) => (
                      <td
                        key={`tournament_${game.id}`}
                        className="px-6 py-4 text-sm text-gray-500 text-center"
                      >
                        <Dropdown
                          isEditing
                          labelText=""
                          description={`Use Score from which Game for Round ${
                            index + 1
                          }`}
                          items={getTNumGames(eventData, tIndex)}
                          value={
                            eventData.games[index].tournaments[tIndex].roundNum
                          }
                          onChange={(e) =>
                            setEventData((draft) => {
                              draft.games[index].tournaments[tIndex].roundNum =
                                e.target.value
                            })
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}

                {eventData.brackets.map((bracket, bIndex) => (
                  <tr
                    key={bracket.id}
                    className={bIndex % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800 border-r border-gray-300">
                      {bracket.name}
                    </td>

                    {eventData.games.map((game, index) => (
                      <td
                        key={`bracket_${game.id}`}
                        className="px-6 py-4 text-sm text-gray-500 text-center"
                      >
                        <Dropdown
                          isEditing
                          labelText=""
                          description={`Use Score from which Game for Round ${
                            index + 1
                          }`}
                          items={getBNumGames(
                            eventData.brackets[bIndex].bracketNumPlayers,
                          )}
                          value={
                            eventData.games[index].brackets[bIndex].roundNum
                          }
                          onChange={(e) =>
                            setEventData((draft) => {
                              draft.games[index].brackets[bIndex].roundNum =
                                e.target.value
                            })
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
