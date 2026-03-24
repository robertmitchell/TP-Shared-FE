import { useEffect, useState } from 'react'
import { Updater } from 'use-immer'

import { GenericFormStatus, EventData } from '@/Common/Common.types'

import { getGamesList } from './GameDetails.helpers'
import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'

import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { GameForm } from './GameForm/GameForm'

type Props = {
  eventData: EventData
  setEventData: Updater<EventData>
}

/**
 * Matches each game to a round in a TLB for scoring
 */
export const GameDetails = (props: Props) => {
  const { eventData, setEventData } = props

  const [formState, setFormState] = useState(getInitialGenericFormState)

  useEffect(() => {
    setEventData((draft) => {
      draft.games = getGamesList(eventData)
    })
    setFormState({
      error: '',
      success: '',
      status: GenericFormStatus.Success,
    })
  }, [])

  switch (formState.status) {
    case GenericFormStatus.Loading:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium">Loading...</h1>
      )

    case GenericFormStatus.Success:
      return (
        <div className="bg-white drop-shadow-md rounded-md p-0 sm:rounded-lg sm:p-6">
          <div className="flex flex-col justify-center items-center md:col-span-1">
            <h1 className="flex text-lg font-medium leading-6 text-gray-900">
              Game Details
            </h1>

            <span className="flex mt-1 text-sm text-gray-500 italic mb-4">
              Assign a game to each round to customize scoring.
            </span>
          </div>

          <div className="md:mt-0 md:col-span-2">
            <GameForm eventData={eventData} setEventData={setEventData} />
          </div>
        </div>
      )

    case GenericFormStatus.Error: {
      return (
        <ErrorMessage>
          There was an error loading the games. Please try again. Error Code:
          GDTSX_001
        </ErrorMessage>
      )
    }

    default:
      return (
        <ErrorMessage>
          An unknown error occured. Error Code: GDTSX_002
        </ErrorMessage>
      )
  }
}
