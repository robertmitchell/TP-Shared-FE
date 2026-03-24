import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

import type { SetState } from '@/Common/Common.types'
import {
  SORT_LANE_DESC,
  SORT_LANE_ASC,
  SORT_NAME_DESC,
  SORT_NAME_ASC,
  SORT_SCORE_DESC,
  SORT_SCORE_ASC,
} from './SortByButtons.constants'

import { Button } from '@/Common/Components/Button'

type Props = {
  headerLabel: string
  setSortBy: SetState<number>
  sortBy: number
}

/**
 * Shows the sort by options for players in a TB
 */
export const SortByButtons = (props: Props) => {
  const { headerLabel, setSortBy, sortBy } = props

  return (
    <>
      <div className="flex flex-col ml-2 sm:ml-0">
        <h3 className="flex text-lg font-medium leading-6 text-gray-900">
          {headerLabel}
        </h3>
      </div>
      <div className="flex my-4 items-center">
        <span className="flex text-sm text-gray-500 italic mr-2">Sort by:</span>
        <Button
          variant="secondary"
          onClick={() => {
            if (sortBy === SORT_LANE_ASC) {
              setSortBy(SORT_LANE_DESC)
            } else {
              setSortBy(SORT_LANE_ASC)
            }
          }}
        >
          Lane
          {sortBy === 0 ? (
            <ChevronDownIcon aria-hidden="true" className="ml-1 h-6 w-6" />
          ) : (
            <ChevronUpIcon aria-hidden="true" className="ml-1 h-6 w-6" />
          )}
        </Button>
        <Button
          variant="secondary"
          className="mx-2"
          onClick={() => {
            if (sortBy === SORT_NAME_ASC) {
              setSortBy(SORT_NAME_DESC)
            } else {
              setSortBy(SORT_NAME_ASC)
            }
          }}
        >
          Name
          {sortBy === 2 ? (
            <ChevronDownIcon aria-hidden="true" className="ml-1 h-6 w-6" />
          ) : (
            <ChevronUpIcon aria-hidden="true" className="ml-1 h-6 w-6" />
          )}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (sortBy === SORT_SCORE_ASC) {
              setSortBy(SORT_SCORE_DESC)
            } else {
              setSortBy(SORT_SCORE_ASC)
            }
          }}
        >
          Score
          {sortBy === 4 ? (
            <ChevronDownIcon aria-hidden="true" className="ml-1 h-6 w-6" />
          ) : (
            <ChevronUpIcon aria-hidden="true" className="ml-1 h-6 w-6" />
          )}
        </Button>
      </div>
    </>
  )
}
