import { useState } from 'react'
import { CircleStackIcon, ClipboardIcon } from '@heroicons/react/20/solid'

import type { EventData } from '@/Common/Common.types'

import { getBracketNumRounds } from '@/Common/Utils/getBracketNumRounds'

import { AliveListTable } from '@/Common/Components/BracketDetails/AliveList/AliveListTable'
import { BracketRawResultsTableWrapper } from './BracketRawResultsTableWrapper'
import { Button } from '@/Common/Components/Button'
import { Divider } from '@/Common/Components/Divider'

type Props = {
  bIndex: number
  eventData: EventData
}

/**
 * Wrapper for showing the different Bracket results
 */
export const BracketRawResultsWrapper = (props: Props) => {
  const { bIndex, eventData } = props

  const [showAll, setShowAll] = useState(true)
  const [showResults, setShowResults] = useState(true)

  const { activeRound } = eventData.brackets[bIndex]
  const numRounds = getBracketNumRounds(
    eventData.brackets[bIndex].bracketNumPlayers,
  )
  const isOpen = activeRound < numRounds

  return (
    <div className="flex flex-col mt-4 ml-2 sm:ml-0">
      <Divider labelText={eventData.brackets[bIndex].name} />
      {isOpen && (
        <span className="text-xs text-red-600">
          This Bracket has not been closed. Until it is closed, some information
          may not be accurate or complete. Please check with the Event Director
          if you think something is incorrect.
        </span>
      )}

      <Button className="m-2" onClick={() => setShowResults(!showResults)}>
        {showResults ? (
          <CircleStackIcon aria-hidden="true" className="h-6 w-6" />
        ) : (
          <ClipboardIcon aria-hidden="true" className="h-6 w-6" />
        )}
        {showResults ? 'Show Alive List' : 'Show Results'}
      </Button>

      {showResults ? (
        <BracketRawResultsTableWrapper
          bIndex={bIndex}
          eventData={eventData}
          setShowAll={setShowAll}
          showAll={showAll}
        />
      ) : (
        <AliveListTable bIndex={bIndex} eventData={eventData} showAmountDue />
      )}
    </div>
  )
}
