import { EventData, TLBViewStatus } from '@/Common/Common.types'

import { EndedScoresBody } from './EndedScoresBody'
import { MatchPlayRound } from './MatchPlayRound'
import { MatchPlayWinnersHeader } from './MatchPlayWinnersHeader'

type Props = {
  eventData: EventData
  tIndex: number
  tLBViewStatus: TLBViewStatus
}

/**
 * Wrapper for the tournament's Match Play Results
 */
export const MatchPlayResults = (props: Props) => {
  const { eventData, tIndex, tLBViewStatus } = props

  return (
    <section className="my-4">
      <h3 className="flex text-lg font-medium leading-6 text-gray-900">
        Match Play Results
      </h3>

      {eventData.tournaments[tIndex].matchPlayInfo.map((_MPInfo, index) => (
        <div
          key={`MPInfo_${index}`}
          className="border-2 rounded-lg border-dashed mb-4 p-4"
        >
          <span>Round {index + 1}</span>
          <MatchPlayRound
            roundIndex={index}
            tIndex={tIndex}
            eventData={eventData}
            tLBViewStatus={tLBViewStatus}
          />
        </div>
      ))}

      {eventData.tournaments[tIndex].winners &&
        eventData.tournaments[tIndex].winners.length > 0 && (
          <div>
            <h3 className="flex text-lg font-medium leading-6 text-gray-900">
              Match Play Winners
            </h3>

            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg mt-2 mb-4">
              <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
                <MatchPlayWinnersHeader />
                <EndedScoresBody
                  eventData={eventData}
                  numResults={25}
                  tIndex={tIndex}
                />
              </div>
            </div>
          </div>
        )}
    </section>
  )
}
