import type { EventData, Player } from '@/Common/Common.types'

import { calculateEstimatedDue } from './AliveListPlayerRow.helpers'
import { incrementArray } from '@/Common/Utils/incrementArray'
import { getPlayersMatchedBracket } from '@/Common/Utils/getMatchedBracket'

import { FirstPlace } from './FirstPlace'
import { FourthPlace } from './FourthPlace'
import { FullFilledEnrollments } from './FullfilledEnrollments'
import { SecondPlace } from './SecondPlace'
import { ThirdPlace } from './ThirdPlace'

type Props = {
  bIndex: number
  eventData: EventData
  player: Player
  showAmountDue?: boolean
  showCollected?: boolean
}

/**
 * Each row of the alive list - Details are for a single player
 */
export const AliveLisPlayerRow = (props: Props) => {
  const {
    bIndex,
    eventData,
    player,
    showAmountDue = false,
    showCollected = false,
  } = props

  const { bracketType, id } = eventData.brackets[bIndex]
  const { firstName, isMale, lastName } = player
  const matchedBracket = getPlayersMatchedBracket(id, player)

  // Someone who isn't enrolled in the bracket will be filtered out
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

  const gender = isMale ? '(M)' : '(F)'

  return (
    <>
      <div className="table-cell p-3 border-r border-gray-200">
        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {gender} {firstName} {lastName}
        </span>
      </div>

      <div className="table-cell p-3 text-center max-w-[150px]">
        {numBrackets}
      </div>

      <FullFilledEnrollments numBrackets={numBrackets} aliveList={aliveList} />

      <div className="table-cell p-3 text-center max-w-[150px]">
        {aliveText} <s className="text-red-600 opacity-50">{deadText}</s>
      </div>

      <FirstPlace results={results} />

      <SecondPlace results={results} />

      {bracketType === 'Double Elimination' && (
        <>
          <ThirdPlace results={results} />
          <FourthPlace results={results} />
        </>
      )}

      {showAmountDue && (
        <div className="table-cell p-3 text-center max-w-[150px]">
          <div>${estimatedDue.toFixed(2)}</div>
        </div>
      )}

      {showCollected && (
        <div className="table-cell p-3 max-w-[150px] border-b-2 border-gray-900 h-full text-3xl text-white">
          .
        </div>
      )}
    </>
  )
}
