import { useState } from 'react'

import type { SetState } from '@/Common/Common.types'

import { Button } from '@/Common/Components/Button'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  bracketCount: number
  displayedIndex: number
  setDisplayedIndex: SetState<number>
}

/**
 * Header for a bracket that allows navigating between brackets
 */
export const WebHeader = (props: Props) => {
  const { bracketCount, displayedIndex, setDisplayedIndex } = props

  const [jumpToIndex, setJumpToIndex] = useState(1)

  return (
    <>
      <div className="flex justify-center items-end mb-4">
        <TextInput
          isEditing
          type="number"
          className="mb-0"
          labelText="Jump to bracket #:"
          value={jumpToIndex}
          onChange={(e) => setJumpToIndex(e.currentTarget.valueAsNumber)}
        />
        <Button
          disabled={jumpToIndex < 1 || jumpToIndex > bracketCount}
          className="ml-2"
          onClick={() => {
            if (jumpToIndex > 0 && jumpToIndex < bracketCount + 1) {
              setDisplayedIndex(jumpToIndex - 1)
            }
          }}
        >
          Load
        </Button>
      </div>

      <div className="flex justify-center mb-4">
        <Button
          disabled={displayedIndex <= 0}
          onClick={() => setDisplayedIndex(displayedIndex - 1)}
        >
          Previous
        </Button>
        <div className="flex flex-col justify-center items-center">
          <span className="text-lg font-medium text-black px-4">
            Viewing Bracket: {displayedIndex + 1}
          </span>
          <span className="text-sm text-gray-400">(out of {bracketCount})</span>
        </div>
        <Button
          disabled={displayedIndex >= bracketCount - 1}
          onClick={() => setDisplayedIndex(displayedIndex + 1)}
        >
          Next
        </Button>
      </div>
    </>
  )
}
