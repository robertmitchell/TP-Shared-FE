import type { BracketResults } from '@/Common/Common.types'

import { incrementArray } from '@/Common/Utils/incrementArray'

type Props = {
  results: BracketResults
}

/**
 * Shows the second place brackets for each player
 */
export const SecondPlace = (props: Props) => {
  const { results } = props

  if (results === undefined) {
    return (
      <div className="table-cell p-3">
        <span></span>
      </div>
    )
  }

  let secondPlaces = ''
  if (results.secondPlace !== undefined) {
    secondPlaces = incrementArray(results.secondPlace)
      .sort((a, b) => a - b)
      .join(', ')
  }

  let secondTies = ''
  if (results.secondTies?.length > 0) {
    if (secondPlaces.length > 0) {
      secondTies = ', '
    }

    secondTies = incrementArray(results.secondTies)
      .sort((a, b) => a - b)
      .join(', ')
  }

  return (
    <div className="table-cell p-3 max-w-[150px] text-center text-sm text-gray-500 min-w-[100px]">
      <span className="text-sm font-medium text-gray-600">{secondPlaces}</span>
      <span className="text-sm font-medium text-blue-600">{secondTies}</span>
    </div>
  )
}
