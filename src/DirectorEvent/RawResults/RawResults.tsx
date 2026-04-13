import { useEffect, useState } from 'react'

import type { EventData } from '@/Common/Common.types'
import type { DropdownData } from '@/Common/Components/Dropdown.types'

import { scrollToElementById } from '@/Common/Utils/scrollToElementById'
import { getBIndex, getTIndex } from '@/DirectorEvent/RawResults/RawResults.helpers'

import { BracketRawResultsWrapper } from './BracketRawResultsWrapper'
import { Dropdown } from '@/Common/Components/Dropdown'
import { TournamentRawResultsWrapper } from './TournamentRawResultsWrapper'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

type Props = {
  eventData: EventData
}

export const RawResults = (props: Props) => {
  const { eventData } = props

  const [bIndex, setBIndex] = useState(-1)
  const [tIndex, setTIndex] = useState(-1)

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToElementById('results')
    }, 100)
    return () => clearTimeout(timer)
  }, [bIndex, tIndex])

  const hasResults = eventData.tournaments?.length > 0 || eventData.brackets?.length > 0

  const tDropdownData: DropdownData[] = [
    { name: '--- Select A Tournament ---', id: '-1' },
    ...eventData.tournaments.map((t, i) => ({ name: t.name, id: i.toString() })),
  ]

  const bDropdownData: DropdownData[] = [
    { name: '--- Select A Bracket ---', id: '-1' },
    ...eventData.brackets.map((b, i) => ({ name: b.name, id: i.toString() })),
  ]

  if (!hasResults) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Results</h3>
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 mb-4">
            <ClipboardDocumentListIcon className="h-7 w-7 text-gray-400" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">No results yet</h4>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Results will appear here once tournaments or brackets have been completed.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Results</h3>
      <p className="text-sm text-gray-500 mb-6">Select a tournament or bracket to view results.</p>

      <div className="space-y-3 max-w-xl">
        <Dropdown
          className="w-full"
          isEditing
          labelText="Tournament"
          items={tDropdownData}
          value={tDropdownData[tIndex + 1].name}
          onChange={(e) => {
            setTIndex(getTIndex(e.target.value, eventData.tournaments))
            setBIndex(-1)
          }}
        />
        <Dropdown
          className="w-full"
          isEditing
          labelText="Bracket"
          items={bDropdownData}
          value={bDropdownData[bIndex + 1].name}
          onChange={(e) => {
            setBIndex(getBIndex(e.target.value, eventData.brackets))
            setTIndex(-1)
          }}
        />
      </div>

      <div id="results" className="mt-6">
        {tIndex > -1 && (
          <TournamentRawResultsWrapper eventData={eventData} tIndex={tIndex} />
        )}
        {bIndex > -1 && (
          <BracketRawResultsWrapper eventData={eventData} bIndex={bIndex} />
        )}
      </div>
    </div>
  )
}