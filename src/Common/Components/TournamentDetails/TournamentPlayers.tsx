import { useState } from 'react'

import type { EventData } from '@/Common/Common.types'

import { EndedScoresBody } from './EndedScoresBody'
import { SortByButtons } from '../Tables/SortByButtons'
import { TBSinglesScoresBody } from '../Tables/TBSinglesScoresBody/TBSinglesScoresBody'
import { TBSinglesScoresHeader } from '../Tables/TBSinglesScoresHeader/TBSinglesScoresHeader'

type Props = {
  eventData: EventData
  isPrinting?: boolean
  numResults?: number
  tIndex: number
}

/**
 * Displays the players list for tournaments
 */
export const TournamentPlayers = (props: Props) => {
  const { eventData, isPrinting = false, numResults = 25, tIndex } = props

  const [sortBy, setSortBy] = useState(0)

  const isEnded = !eventData.tournaments[tIndex].isOpen

  return (
    <section className="my-4">
      {!isPrinting && !isEnded && (
        <SortByButtons
          headerLabel="Player Standings"
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
      )}

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {isPrinting && (
            <h3 className="text-2xl font-medium text-center">
              {eventData.tournaments[tIndex].name}
            </h3>
          )}

          <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
            <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
              <TBSinglesScoresHeader
                eventData={eventData}
                isEnded={isEnded}
                tbIndex={tIndex}
              />
              {isEnded ? (
                <EndedScoresBody
                  eventData={eventData}
                  numResults={numResults}
                  tIndex={tIndex}
                />
              ) : (
                <TBSinglesScoresBody
                  eventData={eventData}
                  sortBy={sortBy}
                  tbIndex={tIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
