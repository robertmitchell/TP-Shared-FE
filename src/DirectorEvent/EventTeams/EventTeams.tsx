import { useState } from 'react'
import type { Updater } from 'use-immer'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import type { EventData } from '../../Common/Common.types'

import { getInitialGenericModalState } from '../../Common/Utils/UtilityFunctions'

import { Button } from '@/Common/Components/Button'
import { TeamList } from './TeamList'

type Props = {
  eventData: EventData
  setEventData: Updater<EventData>
  isPlayer?: boolean
}

/**
 * Shows the teams card for an event
 */
export const EventTeams = (props: Props) => {
  const { eventData, setEventData, isPlayer = false } = props

  const [eventTeamState, setEventTeamState] = useState(
    getInitialGenericModalState,
  )

  return (
    <div className="bg-white drop-shadow-md rounded-md p-0 sm:rounded-lg sm:p-6">
      <div className="flex flex-col pb-6">
        <div className="flex items-center mb-4">
          <h3 className="flex text-lg font-medium leading-6 text-gray-900 ml-2 sm:ml-0">
            Event Teams
          </h3>

          <span className="flex items-center ml-4 italic">
            (
            <span className="text-amber-500 mr-1 text-lg font-medium">
              {eventData.teams?.length || 0}
            </span>
            Teams Created)
          </span>
        </div>

        {!isPlayer && (
          <div className="block">
            <Button
              className="ml-2 sm:ml-0"
              onClick={() =>
                setEventTeamState({
                  ...eventTeamState,
                  isModalVisible: true,
                })
              }
              variant="primary"
            >
              <PlusCircleIcon
                className="mr-4 shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Add Team
            </Button>
          </div>
        )}
      </div>

      {eventData.teams.length > 0 && (
        <TeamList
          eventData={eventData}
          setEventData={setEventData}
          isPlayer={isPlayer}
        />
      )}
    </div>
  )
}
