import { Updater, useImmer } from 'use-immer'
import { PlusCircleIcon, ArrowUpTrayIcon, UsersIcon } from '@heroicons/react/24/outline'

import type { EventData } from '../../Common/Common.types'
import { getInitialEventPlayersState } from './EventPlayers.helpers'
import { PlayerList } from './PlayerList'

type Props = {
  eventData: EventData
  isPlayer?: boolean
  setEventData: Updater<EventData>
}

export const EventPlayers = (props: Props) => {
  const { eventData, isPlayer = false, setEventData } = props

  const [eventPlayerState, setEventPlayerState] = useImmer(
    getInitialEventPlayersState,
  )

  const numPlayers = eventData.eventDetails.numParticipants
  const isEmpty = numPlayers === 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Event Players</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {numPlayers > 0
              ? `${numPlayers} player${numPlayers === 1 ? '' : 's'} enrolled`
              : 'No players enrolled yet'}
          </p>
        </div>

        {!isPlayer && numPlayers > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() =>
                setEventPlayerState((draft) => {
                  draft.isImportModalVisible = true
                })
              }
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowUpTrayIcon className="h-4 w-4" />
              Import
            </button>
            <button
              onClick={() =>
                setEventPlayerState((draft) => {
                  draft.isAddModalVisible = true
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Add Player(s)
            </button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!isPlayer && isEmpty && (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-amber-50 mb-4">
            <UsersIcon className="h-7 w-7 text-amber-500" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">
            No players added yet
          </h4>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">
            Start by adding players individually or importing a list to get this event going.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setEventPlayerState((draft) => {
                  draft.isAddModalVisible = true
                })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors shadow-sm"
            >
              <PlusCircleIcon className="h-4 w-4" />
              Add Player(s)
            </button>
            <button
              onClick={() =>
                setEventPlayerState((draft) => {
                  draft.isImportModalVisible = true
                })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ArrowUpTrayIcon className="h-4 w-4" />
              Import Players
            </button>
          </div>
        </div>
      )}

      {/* Player list */}
      {numPlayers > 0 && (
        <PlayerList
          eventData={eventData}
          setEventData={setEventData}
          isPlayer={isPlayer}
        />
      )}
    </div>
  )
}