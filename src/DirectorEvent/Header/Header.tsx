import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { eventTabs } from './Header.constants'
import type { EventData, SetState } from '@/Common/Common.types'
import { enableGenerators, getTabIndex, getTabValue } from './Header.helpers'
import { Dropdown } from '@/Common/Components/Dropdown'

type Props = {
  currentTab: number
  eventData: EventData
  isPlayer?: boolean
  setCurrentTab: SetState<number>
}

export const Header = (props: Props) => {
  const { currentTab, eventData, isPlayer = false, setCurrentTab } = props
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count === 5) enableGenerators(eventData)
  }, [count])

  const destination = isPlayer ? '/home/' : '/manage/'
  const { generatorsEnabled } = eventData.eventDetails
  const allTabs = generatorsEnabled ? [...eventTabs, 'Generator'] : eventTabs

  return (
    <header className="bg-white border-b border-gray-200">
      {!isPlayer && (
        <div
          className="absolute right-0 top-0 cursor-default text-xs text-indigo-200"
          onClick={() => setCount(count + 1)}
        >
          `
        </div>
      )}

      <div className="px-6 pt-5 pb-0">
        <Link
          to={destination}
          className="inline-flex items-center text-sm text-gray-500 hover:text-amber-600 transition-colors mb-3"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {eventData.eventDetails.name}
        </h1>

        {/* Mobile dropdown */}
        <Dropdown
          isEditing
          labelText="Menu"
          items={allTabs}
          value={getTabValue(currentTab)}
          onChange={(e) => setCurrentTab(getTabIndex(e.target.value))}
          containerClassName="sm:hidden mb-3"
        />

        {/* Desktop pill tabs */}
        <div className="hidden sm:flex gap-1 overflow-x-auto">
          {allTabs.map((tab, index) => (
            <button
              key={`${tab}_${index}`}
              onClick={() => setCurrentTab(index)}
              className={cn(
                'whitespace-nowrap px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors',
                currentTab === index
                  ? 'border-amber-400 text-amber-600 bg-amber-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}