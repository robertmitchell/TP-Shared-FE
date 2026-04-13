import { useState } from 'react'
import type { Updater } from 'use-immer'
import { PlusCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline'

import type { EventData } from '../../Common/Common.types'
import { getInitialGenericModalState } from '../../Common/Utils/UtilityFunctions'
import { TeamList } from './TeamList'

type Props = {
  eventData: EventData
  setEventData: Updater<EventData>
  isPlayer?: boolean
}

export const EventTeams = (props: Props) => {
  const { eventData, setEventData, isPlayer = false } = props

  const [eventTeamState, setEventTeamState] = useState(getInitialGenericModalState)

  const numTeams = eventData.teams?.length || 0
  const hasPlayers = eventData.eventDetails.numParticipants > 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Event Teams</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {numTeams > 0 ? `${numTeams} team${numTeams === 1 ? '' : 's'} created` : 'No teams created yet'}
          </p>
        </div>
        {!isPlayer && numTeams > 0 && (
          <button
            onClick={() => setEventTeamState({ ...eventTeamState, isModalVisible: true })}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Add Team
          </button>
        )}
      </div>

      {!isPlayer && numTeams === 0 && (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-amber-50 mb-4">
            <UserGroupIcon className="h-7 w-7 text-amber-500" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">No teams yet</h4>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-xs">
            {!hasPlayers
              ? 'Add players first before creating teams.'
              : 'Group your players into teams to get started.'}
          </p>
          <button
            onClick={() => setEventTeamState({ ...eventTeamState, isModalVisible: true })}
            disabled={!hasPlayers}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Add Team
          </button>
        </div>
      )}

      {numTeams > 0 && (
        <TeamList
          eventData={eventData}
          setEventData={setEventData}
          isPlayer={isPlayer}
        />
      )}
    </div>
  )
}