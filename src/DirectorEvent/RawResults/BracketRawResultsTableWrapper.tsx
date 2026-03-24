import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/20/solid'

import type { EventData, SetState } from '@/Common/Common.types'

import { Button } from '@/Common/Components/Button'
import { RawResultsBody } from '@/DirectorEvent/RawResults/RawResultsBody'
import { RawResultsHeader } from '@/DirectorEvent/RawResults/RawResultsHeader'
import { RawResultsBodyTeams } from './RawResultsBodyTeams'
import { RawResultsHeaderTeams } from './RawResultsHeaderTeams'

type Props = {
  bIndex: number
  eventData: EventData
  setShowAll: SetState<boolean>
  showAll: boolean
}

/**
 * Wrapper for the Raw Results Table for Brackets
 */
export const BracketRawResultsTableWrapper = (props: Props) => {
  const { bIndex, eventData, setShowAll, showAll } = props

  const { areTeamsEnabled } = eventData.brackets[bIndex]

  return (
    <>
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
                    isBracket
                    showAll={showAll}
                    tbIndex={bIndex}
                  />
                  <RawResultsBodyTeams
                    eventData={eventData}
                    isBracket
                    showAll={showAll}
                    tbIndex={bIndex}
                  />
                </>
              ) : (
                <>
                  <RawResultsHeader
                    eventData={eventData}
                    isBracket
                    showAll={showAll}
                    tbIndex={bIndex}
                  />
                  <RawResultsBody
                    eventData={eventData}
                    isBracket
                    showAll={showAll}
                    tbIndex={bIndex}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
