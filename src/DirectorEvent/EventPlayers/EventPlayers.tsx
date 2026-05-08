import { Updater, useImmer } from 'use-immer'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import type { EventData } from '../../Common/Common.types'

import { getInitialEventPlayersState } from './EventPlayers.helpers'

import { Button } from '@/Common/Components/Button'
import { PlayerList } from './PlayerList'

type Props = {
  eventData: EventData
  isPlayer?: boolean
  setEventData: Updater<EventData>
}

/**
 * Player's tab for an event
 */
export const EventPlayers = (props: Props) => {
  const { eventData, isPlayer = false, setEventData } = props

  const [eventPlayerState, setEventPlayerState] = useImmer(
    getInitialEventPlayersState,
  )

  return (
    <div className="bg-white drop-shadow-md rounded-md p-0 sm:rounded-lg sm:p-6">
      <div className="flex flex-col pb-6">
        <div className="flex items-center mb-4">
          <h3 className="flex text-lg font-medium leading-6 text-gray-900 ml-2 sm:ml-0">
            Event Players
          </h3>

          <span className="flex items-center ml-4 italic">
            (
            <span className="text-amber-500 mr-1 text-lg font-medium">
              {eventData.eventDetails.numParticipants}
            </span>
            Players Enrolled)
          </span>
        </div>

        {!isPlayer && (
          <div>
            <Button
              variant="primary"
              onClick={() =>
                setEventPlayerState((draft) => {
                  draft.isAddModalVisible = true
                })
              }
              className="mx-2 mb-2 shadow-sm bg-amber-400 hover:bg-amber-500 inline-flex items-center px-4 py-2 h-10 whitespace-nowrap justify-center rounded-md text-base font-medium"
            >
              <PlusCircleIcon
                className="mr-4 shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Add Player(s)
            </Button>

            <Button
              variant="primary"
              onClick={() =>
                setEventPlayerState((draft) => {
                  draft.isImportModalVisible = true
                })
              }
              className="mx-2 mb-2 shadow-sm bg-amber-400 hover:bg-amber-500 inline-flex items-center px-4 py-2 h-10 whitespace-nowrap justify-center rounded-md text-base font-medium"
            >
              <PlusCircleIcon
                className="mr-4 shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Import Players
            </Button>
          </div>
        )}
      </div>

      {eventData.eventDetails.numParticipants > 0 && (
        <PlayerList
          eventData={eventData}
          setEventData={setEventData}
          isPlayer={isPlayer}
        />
      )}
    </div>
  )
}
