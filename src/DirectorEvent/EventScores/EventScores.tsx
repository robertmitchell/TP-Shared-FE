import type { Updater } from 'use-immer'
import { ChartBarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import type { EventData } from '../../Common/Common.types'
import { NO_PLAYERS_ADDED, NO_PLAYERS_ADDED_PLAYERS } from './EventScores.constants'
import { AddScoresBody } from './AddScoresBody'

type Props = {
  eventData: EventData
  isPlayer?: boolean
  setEventData: Updater<EventData>
}

export const EventScores = (props: Props) => {
  const { eventData, isPlayer = false, setEventData } = props

  const hasPlayers = eventData.players.length > 0 || eventData.guestPlayers.length > 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900">Player Scores</h3>
        {!isPlayer && hasPlayers && (
          <div className="mt-3 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Only one Event Director can update scores at a time. Others should refresh before making changes.
            </p>
          </div>
        )}
      </div>

      {hasPlayers ? (
        <AddScoresBody
          eventData={eventData}
          setEventData={setEventData}
          isPlayer={isPlayer}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 mb-4">
            <ChartBarIcon className="h-7 w-7 text-gray-400" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">No scores yet</h4>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            {isPlayer ? NO_PLAYERS_ADDED_PLAYERS : NO_PLAYERS_ADDED}
          </p>
        </div>
      )}
    </div>
  )
}