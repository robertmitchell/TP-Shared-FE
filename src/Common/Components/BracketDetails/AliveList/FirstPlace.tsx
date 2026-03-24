import type { BracketResults } from '@/Common/Common.types'

import { incrementArray } from '@/Common/Utils/incrementArray'

type Props = {
  results: BracketResults
}

/**
 * Shows the first place brackets for each player
 */
export const FirstPlace = (props: Props) => {
  const { results } = props

  if (results === undefined) {
    return (
      <div className="table-cell p-3">
        <span></span>
      </div>
    )
  }

  let firstPlaces = ''
  if (results.firstPlace !== undefined) {
    firstPlaces = incrementArray(results.firstPlace)
      .sort((a, b) => a - b)
      .join(', ')
  }

  let firstTies = ''
  if (results.firstTies?.length > 0) {
    if (firstPlaces.length > 0) {
      firstTies = ', '
    }

    firstTies += incrementArray(results.firstTies)
      .sort((a, b) => a - b)
      .join(', ')
  }

  return (
    <div className="table-cell p-3 max-w-[150px] text-center text-sm text-gray-500 min-w-[100px]">
      <span className="text-sm font-medium text-gray-600">{firstPlaces}</span>
      <span className="text-sm font-medium text-blue-600">{firstTies}</span>
    </div>
  )
}
