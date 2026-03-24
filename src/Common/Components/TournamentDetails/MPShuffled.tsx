import { EventData } from '@/Common/Common.types'

import { MPBody } from './MPBody'
import { MPHeader } from './MPHeader'

type Props = {
  eventData: EventData
  roundIndex: number
  tIndex: number
}

/**
 * Shows the Match Play results
 */
export const MPShuffled = (props: Props) => {
  const { eventData, roundIndex, tIndex } = props

  const numRounds =
    eventData.tournaments[tIndex].matchPlayInfo[roundIndex].numGames
  const roundArray: number[] = new Array(+numRounds).fill(true)

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
      <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
        <MPHeader roundArray={roundArray} />
        <MPBody eventData={eventData} roundIndex={roundIndex} tIndex={tIndex} />
      </div>
    </div>
  )
}
