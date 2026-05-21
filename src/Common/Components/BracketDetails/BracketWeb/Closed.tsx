import { useEffect, useState } from 'react'

import type { BracketWeb } from '../BracketForm.types'
import type { EventData } from '@/Common/Common.types'

import { Web } from './Web'

type Props = {
  bIndex: number
  eventData: EventData
}

/**
 * Displays a closed bracket and the webs
 */
export const Closed = (props: Props) => {
  const { bIndex, eventData } = props

  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [bracketWeb, setBracketWeb] = useState(
    eventData.brackets[bIndex].bracketWebs[displayedIndex],
  )
  const [loserWeb, setLoserWeb] = useState<BracketWeb | null>(null)

  const eventBracket = eventData.brackets[bIndex]
  const { bracketType } = eventBracket

  // Set the losers web if it exists on load
  useEffect(() => {
    if (
      eventData.brackets[bIndex].loserBrackets !== undefined &&
      eventData.brackets[bIndex].loserBrackets[displayedIndex] !== undefined
    ) {
      setLoserWeb(eventData.brackets[bIndex].loserBrackets[displayedIndex])
    }
  }, [])

  // Change to the new bracketWeb data when the user changes the one displayed
  useEffect(() => {
    setBracketWeb(eventData.brackets[bIndex].bracketWebs[displayedIndex])
    // Don't set loser's bracket if it doesn't exist
    if (
      eventData.brackets[bIndex].loserBrackets !== undefined &&
      eventData.brackets[bIndex].loserBrackets[displayedIndex] !== undefined
    ) {
      setLoserWeb(eventData.brackets[bIndex].loserBrackets[displayedIndex])
    }
  }, [displayedIndex])

  return (
    <div className="mt-4 overflow-x-auto">
      <Web
        eventBracket={eventBracket}
        bracketWeb={bracketWeb}
        displayedIndex={displayedIndex}
        setDisplayedIndex={setDisplayedIndex}
        eventData={eventData}
      />

      {bracketType === 'Double Elimination' && loserWeb !== null && (
        <Web
          loserBracket
          eventBracket={eventBracket}
          bracketWeb={loserWeb}
          displayedIndex={displayedIndex}
          setDisplayedIndex={setDisplayedIndex}
          eventData={eventData}
        />
      )}
    </div>
  )
}
