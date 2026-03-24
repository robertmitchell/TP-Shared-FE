import type { BracketResults } from '@/Common/Common.types'

import { incrementArray } from '@/Common/Utils/incrementArray'

type Props = {
  results: BracketResults
}

/**
 * Shows the third place brackets for each player
 */
export const ThirdPlace = (props: Props) => {
  const { results } = props

  if (results === undefined) {
    return (
      <div className="table-cell p-3">
        <span></span>
      </div>
    )
  }

  let thirdPlaces = ''
  if (results.thirdPlace !== undefined) {
    thirdPlaces = incrementArray(results.thirdPlace)
      .sort((a, b) => a - b)
      .join(', ')
  }

  let thirdTies = ''
  if (results.thirdTies?.length > 0) {
    if (thirdPlaces.length > 0) {
      thirdTies = ', '
    }

    thirdTies += incrementArray(results.thirdTies)
      .sort((a, b) => a - b)
      .join(', ')
  }

  return (
    <div className="table-cell p-3 max-w-[150px] text-center text-sm text-gray-500 min-w-[100px]">
      <span className="text-sm font-medium text-gray-600">{thirdPlaces}</span>
      <span className="text-sm font-medium text-blue-600">{thirdTies}</span>
    </div>
  )
}
