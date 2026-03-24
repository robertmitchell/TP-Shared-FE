import { useImmer } from 'use-immer'

import {
  GenericFormStatus,
  EventData,
  TLBViewStatus,
} from '@/Common/Common.types'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'
import { getRegisteredTPlayers } from '@/Common/Utils/getRegisteredTPlayers'
import { matchUpPlayers } from './MPNotShuffled.helpers'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'

type Props = {
  eventData: EventData
  roundIndex: number
  tIndex: number
  tLBViewStatus: TLBViewStatus
}

/**
 * Shows the Match Play shuffle button
 */
export const MPNotShuffled = (props: Props) => {
  const { eventData, roundIndex, tIndex, tLBViewStatus } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  const MPInfo = eventData.tournaments[tIndex].matchPlayInfo[roundIndex]
  const tId = eventData.tournaments[tIndex].id
  const registeredPlayers = getRegisteredTPlayers(tId, eventData)

  let playerCount = -1
  if (roundIndex === 0) {
    playerCount = registeredPlayers.length
  } else if (MPInfo.matchUps !== undefined) {
    playerCount = MPInfo.matchUps.length * 2
  }

  if (playerCount === -1) {
    return (
      <h1 className="flex flex-col items-center my-4 text-2xl font-semibold text-red-600 mb-2">
        The previous round hasn't been completed yet.
      </h1>
    )
  }

  return (
    <div className="text-center">
      <h1 className="flex flex-col items-center my-4 text-2xl font-semibold text-red-600 mb-2">
        This Match Play Round has not been shuffled.
      </h1>
      <span className="text-xs text-gray-500">
        (There are {playerCount} players enrolled)
      </span>

      {tLBViewStatus !== TLBViewStatus.ReadOnly && (
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

          <Button
            disabled={eventData.guestPlayers.length < 8}
            className="w-80 mx-auto"
            onClick={() =>
              matchUpPlayers(roundIndex, tIndex, eventData, setFormState)
            }
          >
            Shuffle Round
          </Button>
        </div>
      )}

      {formState.status === GenericFormStatus.Loading && (
        <LoadingModal displayText="Shuffling please wait..." />
      )}
    </div>
  )
}
