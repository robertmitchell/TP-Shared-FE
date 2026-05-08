import type { Updater } from 'use-immer'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import type { EventData } from '../../Common/Common.types'
import {
  NO_PLAYERS_ADDED,
  NO_PLAYERS_ADDED_PLAYERS,
} from './EventScores.constants'

import { AddScoresBody } from './AddScoresBody'

type Props = {
  eventData: EventData
  isPlayer?: boolean
  setEventData: Updater<EventData>
}

/**
 * Scores tab on an event
 */
export const EventScores = (props: Props) => {
  const { eventData, isPlayer = false, setEventData } = props

  const hasPlayers =
    eventData.players.length > 0 || eventData.guestPlayers.length > 0

  return (
    <div className="bg-white drop-shadow-md rounded-md p-0 sm:rounded-lg sm:p-6">
      <div>
        <div className="pb-6">
          <h3 className="flex text-lg font-medium leading-6 text-gray-900">
            Player Scores
          </h3>

          {!isPlayer && (
            <span className="flex mt-1 text-xl text-red-600 italic">
              <ExclamationTriangleIcon
                className="mr-2 h-12 text-red-600"
                aria-hidden="true"
              />
              <strong className="mr-1">NOTE: </strong> At this time only one
              Event Director can update scores at a time. Other operators will
              need to refresh the page or navigate to another tab and back to
              see changes and not override the other Director's work.
            </span>
          )}
        </div>

        {hasPlayers ? (
          <AddScoresBody
            eventData={eventData}
            setEventData={setEventData}
            isPlayer={isPlayer}
          />
        ) : (
          <p className="flex items-center justify-center mt-4 text-lg text-gray-500">
            <ExclamationTriangleIcon
              className="mr-2 h-16 w-16 sm:h-6 sm:w-6"
              aria-hidden="true"
            />
            {isPlayer ? NO_PLAYERS_ADDED_PLAYERS : NO_PLAYERS_ADDED}
          </p>
        )}
      </div>
    </div>
  )
}
