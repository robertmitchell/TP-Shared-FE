import type { BracketAliveList } from '@/Common/Common.types'

type Props = {
  aliveList: BracketAliveList
  numBrackets: number
}

/**
 * Styles the number of fullfilled brackets for a player based on seeded
 * more, less, or equal to how many were requested
 */
export const FullFilledEnrollments = (props: Props) => {
  const { aliveList, numBrackets } = props

  // Someone who didn't get seeded into the bracket but wanted to
  if (aliveList === undefined) {
    return (
      <div className="table-cell p-3 max-w-[150px] text-center text-sm text-gray-500">
        <span>
          0 <span className="text-green-600">(-{numBrackets})</span>
        </span>
      </div>
    )
  }

  // This is because in the first round no one is dead and this isn't saved in the DB otherwise would display`NaN`. Same with last round and alive list
  const numFullfilledEnrollments =
    (aliveList.alive?.length || 0) + (aliveList.dead?.length || 0)

  if (numBrackets === numFullfilledEnrollments) {
    return (
      <div className="table-cell p-3 max-w-[150px] text-center text-sm font-medium text-gray-500">
        {numFullfilledEnrollments}
      </div>
    )
  } else if (numBrackets > numFullfilledEnrollments) {
    return (
      <div className="table-cell p-3 max-w-[150px] text-center text-sm font-medium text-gray-500">
        <span>
          {numFullfilledEnrollments}{' '}
          <span className="text-green-600">
            (-{numBrackets - numFullfilledEnrollments})
          </span>
        </span>
      </div>
    )
  } else {
    return (
      <div className="table-cell p-3 max-w-[150px] text-center text-sm font-medium text-gray-500">
        <span>
          {numFullfilledEnrollments}{' '}
          <span className="text-red-600">
            (+{numFullfilledEnrollments - numBrackets})
          </span>
        </span>
      </div>
    )
  }
}
