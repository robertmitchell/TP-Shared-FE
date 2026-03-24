import type { BracketResults } from '@/Common/Common.types'

import { incrementArray } from '@/Common/Utils/incrementArray'

type Props = {
  results: BracketResults
}

/**
 * Shows the fourth place brackets for each player
 */
export const FourthPlace = (props: Props) => {
  const { results } = props

  if (results === undefined) {
    return (
      <div className="table-cell p-3">
        <span></span>
      </div>
    )
  }

  let fourthPlaces = ''
  if (results.fourthPlace !== undefined) {
    fourthPlaces = incrementArray(results.fourthPlace)
      .sort((a, b) => a - b)
      .join(', ')
  }

  let fourthTies = ''
  if (results.fourthTies?.length > 0) {
    if (fourthPlaces.length > 0) {
      fourthTies = ', '
    }

    fourthTies += incrementArray(results.fourthTies)
      .sort((a, b) => a - b)
      .join(', ')
  }

  return (
    <div className="table-cell p-3 max-w-[150px] text-center text-sm text-gray-500 min-w-[100px]">
      <span className="text-sm font-medium text-gray-600">{fourthPlaces}</span>
      <span className="text-sm font-medium text-blue-600">{fourthTies}</span>
    </div>
  )
}
