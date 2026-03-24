import type { EventData } from '@/Common/Common.types'

import { getTotalEnrollmentCount } from '@/Common/Utils/getTotalEnrollmentCount'

type Props = {
  bIndex: number
  eventData: EventData
  showAmountDue?: boolean
  showCollected?: boolean
}

/**
 * Displays the headers for the alive list for a bracket
 */
export const AliveListHeader = (props: Props) => {
  const {
    bIndex,
    eventData,
    showAmountDue = false,
    showCollected = false,
  } = props

  const { areTeamsEnabled, bracketType, id } = eventData.brackets[bIndex]

  const totalEnrollmentCount = getTotalEnrollmentCount(
    id,
    eventData,
    areTeamsEnabled,
  )

  return (
    <div className="table-header-group bg-black text-white text-center uppercase text-xs font-medium tracking-wider">
      <div className="table-row">
        <div className="table-cell p-3 border-r border-gray-200">
          {areTeamsEnabled ? 'Team' : 'Player'} Name
        </div>

        <div className="table-cell p-3 max-w-[100px]">
          Requested Enrollments ({totalEnrollmentCount} total)
        </div>

        <div className="table-cell p-3 max-w-[100px]">
          Fulfilled Enrollments
        </div>

        <div className="table-cell p-3">
          Seeded Brackets <br />{' '}
          <span className="text-red-600">(red = eliminated)</span>
        </div>

        <div className="table-cell p-3">
          1st Place <br /> <span className="text-blue-600">(blue = tie)</span>
        </div>

        <div className="table-cell p-3">
          2nd Place <br /> <span className="text-blue-600">(blue = tie)</span>
        </div>

        {bracketType === 'Double Elimination Singles' && (
          <>
            <div className="table-cell p-3">
              3rd Place <br />
              <span className="text-blue-600">(blue = tie)</span>
            </div>

            <div className="table-cell p-3">
              4th Place <br />
              <span className="text-blue-600">(blue = tie)</span>
            </div>
          </>
        )}

        {showAmountDue && <div className="table-cell p-3">Amount due</div>}

        {showCollected && <div className="table-cell p-3">Collected</div>}
      </div>
    </div>
  )
}
