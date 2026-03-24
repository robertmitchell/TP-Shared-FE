import { useState } from 'react'

import type { EventData } from '@/Common/Common.types'

import { SortByButtons } from '../../Tables/SortByButtons'
import { TBTeamsScoresBody } from '../../Tables/TBTeamsScoresBody/TBTeamsScoresBody'
import { TBTeamsScoresHeader } from '../../Tables/TBTeamsScoresHeader/TBTeamsScoresHeader'

type Props = {
  bIndex: number
  eventData: EventData
  numResults?: number
}

/**
 * Displays the teams list for brackets
 */
export const BracketTeams = (props: Props) => {
  const { bIndex, eventData } = props

  const [sortBy, setSortBy] = useState(0)

  return (
    <section className="my-8">
      <SortByButtons
        headerLabel="Team Standings"
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      <div className="overflow-scroll">
        <div className="table w-full divide-y divide-gray-200 border">
          <TBTeamsScoresHeader
            isBracket
            tbIndex={bIndex}
            eventData={eventData}
          />
          <TBTeamsScoresBody
            eventData={eventData}
            isBracket
            sortBy={sortBy}
            tbIndex={bIndex}
          />
        </div>
      </div>
    </section>
  )
}
