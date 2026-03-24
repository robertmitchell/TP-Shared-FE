import { useState } from 'react'

import type { EventData } from '@/Common/Common.types'

import { NoBracketPlayers } from '../NoBracketPlayers'
import { SortByButtons } from '../../Tables/SortByButtons'
import { TBSinglesScoresBody } from '../../Tables/TBSinglesScoresBody/TBSinglesScoresBody'
import { TBSinglesScoresHeader } from '../../Tables/TBSinglesScoresHeader/TBSinglesScoresHeader'

type Props = {
  bIndex: number
  eventData: EventData
  isPlayer: boolean
}

/**
 * Dipslays the players on the bracket section
 */
export const BracketPlayers = (props: Props) => {
  const { bIndex, eventData, isPlayer } = props

  const [sortBy, setSortBy] = useState(0)

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
    <section>
      <h6 className="text-xs text-gray-400">
        (These are scores saved to the game but may not have been saved to the
        brackets yet)
      </h6>

      <SortByButtons
        headerLabel="Player Standings"
        setSortBy={setSortBy}
        sortBy={sortBy}
      />

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
              <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
                <TBSinglesScoresHeader
                  eventData={eventData}
                  isBracket
                  isEnded={false}
                  tbIndex={bIndex}
                />
                <TBSinglesScoresBody
                  eventData={eventData}
                  isBracket
                  sortBy={sortBy}
                  tbIndex={bIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
