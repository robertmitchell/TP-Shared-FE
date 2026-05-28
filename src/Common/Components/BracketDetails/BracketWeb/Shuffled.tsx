import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Updater, useImmer } from 'use-immer'

import {
  GenericFormStatus,
  EventData,
  TLBViewStatus,
} from '@/Common/Common.types'
import type { AdvanceRoundParams, BracketWeb } from '../BracketForm.types'

import { getInitialGenericFormState } from '@/Common/Utils/UtilityFunctions'
import { updateSinglesScoresAndAdvance } from './Shuffled.helpers.singles'
import { updateTeamsScoresAndAdvance } from './Shuffled.helpers.teams'

import { Button } from '@/Common/Components/Button'
import { ErrorAndSuccess } from '@/Common/Components/ErrorAndSuccess'
import { LoadingModal } from '@/Common/Components/LoadingModal'
import { Modal } from '@/Common/Components/Modal'
import { StickyFooter } from '@/Common/Components/StickyFooter'
import { Web } from './Web'

type Props = {
  bIndex: number
  eventData: EventData
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

/**
 * Shows the brackets when they are in "Shuffled" status
 */
export const Shuffled = (props: Props) => {
  const { bIndex, eventData, setEventData, tLBViewStatus } = props

  const [formState, setFormState] = useImmer(
    getInitialGenericFormState(GenericFormStatus.Success),
  )
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [bracketWeb, setBracketWeb] = useState(
    eventData.brackets[bIndex].bracketWebs[displayedIndex],
  )
  const [loserWeb, setLoserWeb] = useState<BracketWeb | null>(null)
  const [advanceModal, setAdvanceModal] = useState(false)
  const eventBracket = eventData.brackets[bIndex]
  const { activeRound, bracketType } = eventData.brackets[bIndex]

  // Set the losers web if it exists on load
  useEffect(() => {
    if (
      eventData.brackets[bIndex].loserBrackets !== undefined &&
      eventData.brackets[bIndex].loserBrackets[displayedIndex] !== undefined
    ) {
      setLoserWeb(eventData.brackets[bIndex].loserBrackets[displayedIndex])
    }
  }, [])

  // Fetch the new bracketWeb data when the user changes the one displayed or when they advance the bracket
  useEffect(() => {
    setBracketWeb(eventData.brackets[bIndex].bracketWebs[displayedIndex])
    // Don't set loser's bracket if it doesn't exist
    if (
      eventData.brackets[bIndex].loserBrackets !== undefined &&
      eventData.brackets[bIndex].loserBrackets[displayedIndex] !== undefined
    ) {
      setLoserWeb(eventData.brackets[bIndex].loserBrackets[displayedIndex])
    }
  }, [displayedIndex, formState])

  const advanceRoundParams: AdvanceRoundParams = {
    bi: bIndex,
    eventData,
    setAdvanceModal,
    setEventData,
    setFormState,
  }

  return (
    <div className="overflow-x-auto mx-2 sm:mx-0">
      <Web
        eventBracket={eventBracket}
        bracketWeb={bracketWeb}
        displayedIndex={displayedIndex}
        setDisplayedIndex={setDisplayedIndex}
        eventData={eventData}
      />

      {tLBViewStatus !== TLBViewStatus.ReadOnly && (
        <StickyFooter>
          <ErrorAndSuccess
            success={formState.success}
            error={formState.error}
            clearMessageFn={() =>
              setFormState((draft) => {
                draft.error = ''
                draft.success = ''
              })
            }
          />
          <span className="text-xs text-gray-500 mb-1">
            * Scores for the current round are updated after advancing the
            bracket
          </span>

          <Button className="w-80" onClick={() => setAdvanceModal(true)}>
            Save And Advance Bracket
          </Button>
        </StickyFooter>
      )}

      {activeRound > 0 &&
        bracketType === 'Double Elimination Singles' &&
        loserWeb !== null && (
          <Web
            loserBracket
            eventBracket={eventBracket}
            bracketWeb={loserWeb}
            displayedIndex={displayedIndex}
            setDisplayedIndex={setDisplayedIndex}
            eventData={eventData}
          />
        )}

      {advanceModal && (
        <Modal onClose={() => setAdvanceModal(false)}>
          <Dialog.Title
            as="h3"
            className="text-center text-xl font-medium text-black"
          >
            Are you sure you want to advance the brackets?
          </Dialog.Title>
          <div className="flex flex-col items-center">
            <h4 className="text-sm text-center text-gray-400 mt-1 mb-6">
              (Make sure you have the latest scores before advancing)
            </h4>

            <div>
              <Button
                className="ml-2"
                disabled={formState.status === GenericFormStatus.Loading}
                onClick={() => {
                  if (eventData.brackets[bIndex].areTeamsEnabled) {
                    updateTeamsScoresAndAdvance(advanceRoundParams)
                  } else {
                    updateSinglesScoresAndAdvance(advanceRoundParams)
                  }
                }}
                variant="danger"
              >
                Yes
              </Button>

              <Button
                className="ml-2"
                disabled={formState.status === GenericFormStatus.Loading}
                onClick={() => setAdvanceModal(false)}
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {formState.status === GenericFormStatus.Loading && <LoadingModal />}
    </div>
  )
}
