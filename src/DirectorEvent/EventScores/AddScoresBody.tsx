import { useState } from 'react'
import { Updater, useImmer } from 'use-immer'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { GenericFormStatus, EventData } from '@/Common/Common.types'
import type {
  SavePlayerScoresParams,
  SaveRandomScoresParams,
} from './AddScoresBody.types'
import { TEST } from '@/Config/test'

import {
  getInitialAddScoreseState,
  savePlayerScores,
  saveRandomScores,
} from './AddScoresBody.helpers'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { ScoresTable } from './ScoresTable'
import { StickyFooter } from '@/Common/Components/StickyFooter'

type Props = {
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
}

/**
 * Modal for adding scores to players in an event
 */
export const AddScoresBody = (props: Props) => {
  const { eventData, isPlayer, setEventData } = props

  // Need a copy because if they enter scores and don't save it will persist to
  // other parts of the page but not actually be saved
  const [newEventData, setNewEventData] = useImmer(eventData)
  const [formState, setFormState] = useImmer(getInitialAddScoreseState)
  const [isDirty, setIsDirty] = useState(false)

  // Variables
  const eventId = eventData.eventDetails.id
  const savePlayerScoresParams: SavePlayerScoresParams = {
    eventId,
    scores: newEventData.scores,
    setEventData,
    setFormState,
    setIsDirty,
  }
  const saveRandomScoresParams: SaveRandomScoresParams = {
    newEventData,
    setEventData,
    setFormState,
    setIsDirty,
  }

  return (
    <main>
      <ScoresTable
        eventData={newEventData}
        setEventData={setNewEventData}
        isPlayer={isPlayer}
        setIsDirty={setIsDirty}
      />

      {!isPlayer && (
        <StickyFooter>
          <ErrorAndSuccess
            error={formState.error}
            success={formState.success}
            clearMessageFn={() =>
              setFormState((draft) => {
                draft.error = ''
                draft.success = ''
              })
            }
          />

          {isDirty && (
            <p className="text-sm text-red-600 flex">
              <ExclamationTriangleIcon
                className="h-6 w-6 mr-2"
                aria-hidden="true"
              />
              You have unsaved scores entered. Click the save button before
              leaving to ensure progress is not lost.
            </p>
          )}

          <Button
            className="w-80"
            onClick={() => savePlayerScores(savePlayerScoresParams)}
          >
            Save
          </Button>

          {TEST && (
            <Button
              variant="secondary"
              onClick={() => saveRandomScores(saveRandomScoresParams)}
              className="bg-green-600 hover:bg-green-700 focus:ring-green-500 mt-2"
            >
              Save Random Scores
            </Button>
          )}
        </StickyFooter>
      )}

      {formState.status === GenericFormStatus.Loading && (
        <LoadingModal displayText="Loading please wait..." />
      )}
    </main>
  )
}
