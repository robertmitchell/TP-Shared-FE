import { useState } from 'react'
import type { Updater } from 'use-immer'

import { EventData, TLBViewStatus } from '@/Common/Common.types'
import { BracketStatus } from '../BracketForm.types'

import { AllBracketsPrintModal } from './AllBracketsPrintModal'
import { Button } from '@/Common/Components/Button'
import { Closed } from './Closed'
import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { NotShuffled } from './NotShuffled'
import { ResetButton } from './ResetButton'
import { RollbackButton } from './RollbackButton'
import { Shuffled } from './Shuffled'
import { NoBracketPlayers } from '@/Common/Components/BracketDetails/NoBracketPlayers'

type Props = {
  bIndex: number
  eventData: EventData
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

export const BracketWeb = (props: Props) => {
  const { bIndex, eventData, setEventData, tLBViewStatus } = props

  const [showPrintModal, setShowPrintModal] = useState(false)

  const { bracketType, status } = eventData.brackets[bIndex]
  const isPlayer = tLBViewStatus === TLBViewStatus.ReadOnly

  if (
    !eventData.brackets[bIndex].areTeamsEnabled &&
    eventData.brackets[bIndex].playerCount === 0
  ) {
    return <NoBracketPlayers isPlayer={isPlayer} />
  }

  if (
    eventData.brackets[bIndex].areTeamsEnabled &&
    eventData.brackets[bIndex].teamCount === 0
  ) {
    return (
      <h3 className="text-lg text-center mt-2 text-red-600">
        There are no teams added to the bracket. Please add them from the
        "Teams" tab at the top.
      </h3>
    )
  }

  switch (status) {
    case BracketStatus.Not_Shuffled:
      return (
        <NotShuffled
          bIndex={bIndex}
          eventData={eventData}
          tLBViewStatus={tLBViewStatus}
        />
      )

    case BracketStatus.Shuffled:
      return (
        <>
          {tLBViewStatus !== TLBViewStatus.ReadOnly && (
            <Button className="ml-2" onClick={() => setShowPrintModal(true)}>
              Print All Brackets
            </Button>
          )}

          <Shuffled
            bIndex={bIndex}
            eventData={eventData}
            setEventData={setEventData}
            tLBViewStatus={tLBViewStatus}
          />

          {tLBViewStatus !== TLBViewStatus.ReadOnly && (
            <div className="flex">
              <ResetButton bIndex={bIndex} eventData={eventData} />

              {bracketType !== 'Double Elimination' && (
                <RollbackButton
                  bIndex={bIndex}
                  eventData={eventData}
                  setEventData={setEventData}
                />
              )}
            </div>
          )}

          {showPrintModal && (
            <AllBracketsPrintModal
              onClose={() => setShowPrintModal(false)}
              bIndex={bIndex}
              eventData={eventData}
            />
          )}
        </>
      )

    case BracketStatus.Closed:
      return (
        <>
          {tLBViewStatus !== TLBViewStatus.ReadOnly && (
            <Button className="ml-2" onClick={() => setShowPrintModal(true)}>
              Print All Brackets
            </Button>
          )}

          <Closed bIndex={bIndex} eventData={eventData} />

          {tLBViewStatus !== TLBViewStatus.ReadOnly && (
            <div className="flex">
              <ResetButton bIndex={bIndex} eventData={eventData} />

              {bracketType !== 'Double Elimination' && (
                <RollbackButton
                  bIndex={bIndex}
                  eventData={eventData}
                  setEventData={setEventData}
                />
              )}
            </div>
          )}

          {showPrintModal && (
            <AllBracketsPrintModal
              onClose={() => setShowPrintModal(false)}
              bIndex={bIndex}
              eventData={eventData}
            />
          )}
        </>
      )

    default:
      return (
        <ErrorMessage isPlayer={isPlayer}>
          An unkown error occured. Error Code: BWTSX_001
        </ErrorMessage>
      )
  }
}
