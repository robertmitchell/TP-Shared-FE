import type { EventData, Team } from '@/Common/Common.types'

import { getMatchedBracket } from './AliveListTeamRow.helpers'
import { incrementArray } from '@/Common/Utils/incrementArray'
import { calculateEstimatedDue } from './AliveListPlayerRow.helpers'

import { FirstPlace } from './FirstPlace'
import { FullFilledEnrollments } from './FullfilledEnrollments'
import { SecondPlace } from './SecondPlace'

type Props = {
  bIndex: number
  eventData: EventData
  showAmountDue?: boolean
  showCollected?: boolean
  team: Team
}

/**
 * Each row of the alive list - Details are for a single team
 */
export const AliveListTeamRow = (props: Props) => {
  const {
    bIndex,
    eventData,
    showAmountDue = false,
    showCollected = false,
    team,
  } = props

  const { id } = eventData.brackets[bIndex]
  const { name } = team
  const matchedBracket = getMatchedBracket(id, team)

  // Team who isn't enrolled in the bracket will be filtered out
  if (matchedBracket === null) {
    return null
  }

  const { numBrackets, aliveList, results } = matchedBracket

  const estimatedDue = calculateEstimatedDue(bIndex, eventData, results)

  // Increment array, sort numbers, turn into comma separated string
  let aliveText = '-'
  let deadText = ''
  if (aliveList !== undefined) {
    aliveText = incrementArray(aliveList.alive)
      .sort((a, b) => a - b)
      .join(', ')

    deadText = `${incrementArray(aliveList.dead)
      .sort((a, b) => a - b)
      .join(', ')}`
  }

  return (
    <>
      <div className="table-cell p-3 border-r border-gray-200">{name}</div>

      <div className="table-cell p-3 text-sm font-medium text-center text-gray-600">
        {numBrackets}
      </div>

      <FullFilledEnrollments numBrackets={numBrackets} aliveList={aliveList} />

      <div className="table-cell p-3 text-sm font-medium text-center text-gray-600">
        {aliveText} <s className="text-red-600 opacity-50">{deadText}</s>
      </div>

      <FirstPlace results={results} />

      <SecondPlace results={results} />

      {showAmountDue && (
        <div className="table-cell p-3 text-center max-w-[150px]">
          <div>${estimatedDue.toFixed(2)}</div>
        </div>
      )}

      {showCollected && (
        <div className="table-cell p-3 max-w-[150px]">
          <div className="border-b-2 border-gray-900 h-full text-3xl text-white">
            .
          </div>
        </div>
      )}
    </>
  )
}
