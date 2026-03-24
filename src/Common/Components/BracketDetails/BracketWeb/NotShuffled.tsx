import { useState } from 'react'
import { useImmer } from 'use-immer'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import { EventData, TLBViewStatus } from '@/Common/Common.types'
import { NotShuffledStatus } from './NotShuffled.types'
import { NOT_SHUFFLED_TOOLTIP_TEXT } from './NotShuffled.constants'

import { deepCloneObj } from '@/Common/Utils/deepCloneObj'
import {
  getInitialNotShuffledState,
  getTimeEstimate,
} from './NotShuffled.helpers'
import { getTotalEnrollmentCount } from '@/Common/Utils/getTotalEnrollmentCount'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { NotShuffledConfirmationModal } from './NotShuffledConfirmationModal'
import { Tooltip } from '@/Common/Components/Tooltip'

type Props = {
  bIndex: number
  eventData: EventData
  tLBViewStatus: TLBViewStatus
}

/**
 * Shows the shuffle brackets button
 */
export const NotShuffled = (props: Props) => {
  const { bIndex, eventData, tLBViewStatus } = props

  const [formState, setFormState] = useImmer(getInitialNotShuffledState)
  const [updatedEventData, setUpdatedEventData] = useState<EventData>(
    deepCloneObj(eventData),
  )

  const {
    areTeamsEnabled,
    bracketNumPlayers,
    id: bId,
  } = eventData.brackets[bIndex]
  const totalEnrollmentCount = getTotalEnrollmentCount(
    bId,
    eventData,
    areTeamsEnabled,
  )
  const maxNumBrackets = Math.floor(totalEnrollmentCount / bracketNumPlayers)
  const possibleRefunds = totalEnrollmentCount % bracketNumPlayers

  return (
    <div className="text-center">
      <h1 className="flex flex-col items-center my-4 text-2xl font-semibold text-red-600 mb-2">
        This Bracket has not been shuffled.
      </h1>
      <span className="text-xs text-gray-500">
        <Tooltip tooltipText={NOT_SHUFFLED_TOOLTIP_TEXT}>
          <InformationCircleIcon
            className="shrink-0 h-4 w-4"
            aria-hidden="true"
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
            onClick={(e: React.FormEvent) => e.preventDefault()}
          />
        </Tooltip>
        There are {totalEnrollmentCount} enrollments requested. This could be up
        to {maxNumBrackets} brackets filled with {possibleRefunds}{' '}
        {areTeamsEnabled ? 'teams ' : 'players '}
        remaining.
      </span>

      <div className="flex flex-col mt-4">
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

        {tLBViewStatus !== TLBViewStatus.ReadOnly && (
          <Button
            disabled={eventData.guestPlayers.length < 8}
            className="w-80 mx-auto"
            onClick={() => console.log('this logic has been removed')}
          >
            Shuffle Bracket
          </Button>
        )}
      </div>

      {formState.status === NotShuffledStatus.Loading && (
        <LoadingModal
          displayText={`Shuffling please wait... (Estimated total time is about ${getTimeEstimate(
            bIndex,
            eventData,
          )} minutes)`}
        />
      )}

      {formState.status === NotShuffledStatus.Confirmation && (
        <NotShuffledConfirmationModal
          bIndex={bIndex}
          updatedEventData={updatedEventData}
          setFormState={setFormState}
          onClose={() =>
            setFormState((draft) => {
              draft.status = NotShuffledStatus.Success
            })
          }
        />
      )}
    </div>
  )
}
