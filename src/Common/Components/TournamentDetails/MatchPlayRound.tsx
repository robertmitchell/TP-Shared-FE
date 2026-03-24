import { useImmer } from 'use-immer'

import {
  GenericFormStatus,
  EventData,
  TLBViewStatus,
} from '@/Common/Common.types'
import { MatchPlayRoundStatus } from './TournamentForm.types'
import type { MPStatusParams } from './MatchPlayRound.types'

import { endMPRound, changeMPRoundStatus } from './MatchPlayRound.helpers'
import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { MPNotShuffled } from './MPNotShuffled'
import { MPShuffled } from './MPShuffled'
import { StickyFooter } from '@/Common/Components/StickyFooter'

type Props = {
  eventData: EventData
  roundIndex: number
  tIndex: number
  tLBViewStatus: TLBViewStatus
}

/**
 * Individual container for a Match Play Round
 */
export const MatchPlayRound = (props: Props) => {
  const { eventData, roundIndex, tIndex, tLBViewStatus } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )

  const MPInfo = eventData.tournaments[tIndex].matchPlayInfo[roundIndex]
  const mPStatusParams: MPStatusParams = {
    roundIndex,
    tIndex,
    eventData,
    setFormState,
  }

  if (MPInfo.status === MatchPlayRoundStatus.Open) {
    return (
      <MPNotShuffled
        roundIndex={roundIndex}
        tIndex={tIndex}
        eventData={eventData}
        tLBViewStatus={tLBViewStatus}
      />
    )
  }

  return (
    <>
      <MPShuffled
        roundIndex={roundIndex}
        tIndex={tIndex}
        eventData={eventData}
      />
      {MPInfo.status === MatchPlayRoundStatus.Shuffled && (
        <StickyFooter>
          <div className="px-2 text-red-600 text-center">
            The match hasn't been ended. This is only the current results based
            on what has been entered so far. Actual results may differ once the
            Match is ended.
          </div>
        </StickyFooter>
      )}

      {tLBViewStatus !== TLBViewStatus.ReadOnly && (
        <div className="flex flex-col text-center">
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

          {formState.status === GenericFormStatus.Loading && (
            <LoadingModal displayText="Shuffling please wait..." />
          )}

          {MPInfo.status === MatchPlayRoundStatus.Shuffled ? (
            <div className="mt-8">
              {roundIndex === 0 && (
                <Button
                  disabled={eventData.guestPlayers.length < 8}
                  onClick={() =>
                    changeMPRoundStatus(
                      mPStatusParams,
                      MatchPlayRoundStatus.Open,
                    )
                  }
                >
                  Unshuffle Round
                </Button>
              )}

              <Button
                disabled={eventData.guestPlayers.length < 8}
                className="ml-2"
                onClick={() => endMPRound(mPStatusParams)}
              >
                End Round
              </Button>
            </div>
          ) : (
            <Button
              disabled={eventData.guestPlayers.length < 8}
              className="w-80 mx-auto mt-8"
              onClick={() =>
                changeMPRoundStatus(
                  mPStatusParams,
                  MatchPlayRoundStatus.Shuffled,
                )
              }
            >
              Reopen Round
            </Button>
          )}
        </div>
      )}
    </>
  )
}
