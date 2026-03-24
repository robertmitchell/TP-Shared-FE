import { useEffect, useState } from 'react'

import type { EventData } from '@/Common/Common.types'
import type { DropdownData } from '@/Common/Components/Dropdown.types'

import { scrollToElementById } from '@/Common/Utils/scrollToElementById'
import {
  getBIndex,
  getTIndex,
} from '@/DirectorEvent/RawResults/RawResults.helpers'

import { BracketRawResultsWrapper } from './BracketRawResultsWrapper'
import { Dropdown } from '@/Common/Components/Dropdown'
import { TournamentRawResultsWrapper } from './TournamentRawResultsWrapper'

type Props = {
  eventData: EventData
}

/**
 * Top component for the `Raw Results` tab
 */
export const RawResults = (props: Props) => {
  const { eventData } = props

  const [bIndex, setBIndex] = useState(-1)
  const [tIndex, setTIndex] = useState(-1)

  useEffect(() => {
    // Wait X seconds for the content to appear then scroll to it
    const timer = setTimeout(() => {
      scrollToElementById('results')
    }, 100)

    // Clear the timeout when the component unmounts or dependencies change
    return () => {
      clearTimeout(timer)
    }
  }, [bIndex, tIndex])

  const tDropdownData: DropdownData[] = []
  // Add empty for -1 value
  tDropdownData.push({
    name: '--- Select A Tournament To See Results ---',
    id: '-1',
  })
  eventData.tournaments.map((tournament, index) => {
    tDropdownData.push({ name: tournament.name, id: index.toString() })
  })

  const bDropdownData: DropdownData[] = []
  // Add empty for -1 value
  bDropdownData.push({
    name: '--- Select A Bracket To See Results ---',
    id: '-1',
  })
  eventData.brackets.map((bracket, index) => {
    bDropdownData.push({ name: bracket.name, id: index.toString() })
  })

  return (
    <section>
      <h3 className="font-medium ml-2 sm:ml-0">
        Choose an sub-event to see the Results
      </h3>

      <Dropdown
        className="w-full mx-2 sm:mx-0 max-w-[94%]"
        isEditing
        labelText=""
        items={tDropdownData}
        value={tDropdownData[tIndex + 1].name}
        onChange={(e) => {
          setTIndex(getTIndex(e.target.value, eventData.tournaments))
          setBIndex(-1)
        }}
      />

      <Dropdown
        className="w-full mx-2 sm:mx-0 max-w-[94%]"
        isEditing
        labelText=""
        items={bDropdownData}
        value={bDropdownData[bIndex + 1].name}
        onChange={(e) => {
          setBIndex(getBIndex(e.target.value, eventData.brackets))
          setTIndex(-1)
        }}
      />

      <div id="results">
        {tIndex > -1 && (
          <TournamentRawResultsWrapper eventData={eventData} tIndex={tIndex} />
        )}

        {bIndex > -1 && (
          <BracketRawResultsWrapper eventData={eventData} bIndex={bIndex} />
        )}
      </div>
    </section>
  )
}
