import { useState } from 'react'

import type { EventData } from '@/Common/Common.types'

import { AliveListPrintModal } from './AliveListPrintModal'
import { AliveListTable } from '@/Common/Components/BracketDetails/AliveList/AliveListTable'
import { Button } from '@/Common/Components/Button'
import { NoBracketPlayers } from '../NoBracketPlayers'

type Props = {
  bIndex: number
  eventData: EventData
  isPlayer: boolean
}

/**
 * Dipslays the alive list for a bracket
 */
export const AliveList = (props: Props) => {
  const { bIndex, eventData, isPlayer } = props

  const [showPrintModal, setShowPrintModal] = useState(false)

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

  return (
    <section className="my-2">
      <Button className="ml-2 mb-2" onClick={() => setShowPrintModal(true)}>
        Print Results
      </Button>

      <AliveListTable bIndex={bIndex} eventData={eventData} />

      {showPrintModal && (
        <AliveListPrintModal
          onClose={() => setShowPrintModal(false)}
          bIndex={bIndex}
          eventData={eventData}
        />
      )}
    </section>
  )
}
