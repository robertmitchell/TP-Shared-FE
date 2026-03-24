import { useState } from 'react'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/20/solid'

import type { EventData } from '@/Common/Common.types'

import { Button } from '@/Common/Components/Button'
import { Divider } from '@/Common/Components/Divider'
import { RawResultsHeaderTeams } from './RawResultsHeaderTeams'
import { RawResultsBodyTeams } from './RawResultsBodyTeams'
import { TournamentRawResultsSinglesWrapper } from './TournamentRawResultsSinglesWrapper'

type Props = {
  eventData: EventData
  tIndex: number
}

/**
 * Wrapper for showing the different Tournament results
 */
export const TournamentRawResultsWrapper = (props: Props) => {
  const { eventData, tIndex } = props

  const [showAll, setShowAll] = useState(true)

  const { areTeamsEnabled, isOpen } = eventData.tournaments[tIndex]

  return (
    <div className="flex flex-col mt-4 ml-2 sm:ml-0">
      <Divider labelText={eventData.tournaments[tIndex].name} />
      {isOpen && (
        <span className="text-xs text-red-600">
          This Tournament has not been closed. Until it is closed, some
          information may not be accurate or complete. Please check with the
          Event Director if you think something is incorrect.
        </span>
      )}

      <Button className="m-2" onClick={() => setShowAll(!showAll)}>
        {showAll ? (
          <MinusCircleIcon aria-hidden="true" className="h-6 w-6" />
        ) : (
          <PlusCircleIcon aria-hidden="true" className="h-6 w-6" />
        )}
        {showAll ? 'Show Only Total Score' : 'Show All Game Scores'}
      </Button>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
            <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
              {areTeamsEnabled ? (
                <>
                  <RawResultsHeaderTeams
                    eventData={eventData}
                    showAll={showAll}
                    tbIndex={tIndex}
                  />
                  <RawResultsBodyTeams
                    eventData={eventData}
                    showAll={showAll}
                    tbIndex={tIndex}
                  />
                </>
              ) : (
                <TournamentRawResultsSinglesWrapper
                  eventData={eventData}
                  showAll={showAll}
                  tIndex={tIndex}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
