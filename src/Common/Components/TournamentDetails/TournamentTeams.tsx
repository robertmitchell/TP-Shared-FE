import { useState } from 'react'

import type { EventData } from '@/Common/Common.types'

import { SortByButtons } from '../Tables/SortByButtons'
import { TBTeamsScoresBody } from '../Tables/TBTeamsScoresBody/TBTeamsScoresBody'
import { TBTeamsScoresHeader } from '../Tables/TBTeamsScoresHeader/TBTeamsScoresHeader'

type Props = {
  eventData: EventData
  isPrinting?: boolean
  numResults?: number
  tIndex: number
}

/**
 * Displays the teams list for tournaments
 */
export const TournamentTeams = (props: Props) => {
  const { eventData, isPrinting = false, tIndex } = props

  const [sortBy, setSortBy] = useState(0)

  return (
    <section className="my-4">
      {!isPrinting && (
        <SortByButtons
          headerLabel="Team Standings"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      )}

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            {isPrinting && (
              <h3 className="text-2xl font-medium text-center">
                {eventData.tournaments[tIndex].name}
              </h3>
            )}

            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
              <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
                <TBTeamsScoresHeader eventData={eventData} tbIndex={tIndex} />
                <TBTeamsScoresBody
                  eventData={eventData}
                  sortBy={sortBy}
                  tbIndex={tIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
