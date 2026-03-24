import { EventData } from '@/Common/Common.types'
import { BracketStatus } from '../BracketForm.types'

import { AliveListBody } from './AliveListBody'
import { AliveListHeader } from './AliveListHeader'

type Props = {
  bIndex: number
  eventData: EventData
  showAmountDue?: boolean
  showCollected?: boolean
}

/**
 * Table for displaying the Alive List
 */
export const AliveListTable = (props: Props) => {
  const {
    bIndex,
    eventData,
    showAmountDue = false,
    showCollected = false,
  } = props

  const { status } = eventData.brackets[bIndex]

  if (status === BracketStatus.Not_Shuffled) {
    return (
      <>
        <h1 className="text-center my-4 text-2xl font-semibold text-red-600 mb-2">
          This Bracket has not been shuffled.
        </h1>
        <p className="text-center text-xs text-gray-400">
          (You can do so on the "Show Bracket" Tab)
        </p>
      </>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
            <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
              <AliveListHeader
                bIndex={bIndex}
                eventData={eventData}
                showAmountDue={showAmountDue}
                showCollected={showCollected}
              />
              <AliveListBody
                bIndex={bIndex}
                eventData={eventData}
                showAmountDue={showAmountDue}
                showCollected={showCollected}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
