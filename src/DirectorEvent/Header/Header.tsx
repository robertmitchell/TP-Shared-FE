import { useEffect, useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import { eventTabs } from './Header.constants'
import type { EventData, SetState } from '@/Common/Common.types'

import { enableGenerators, getTabIndex, getTabValue } from './Header.helpers'

import { Button } from '@/Common/Components/Button'
import { Dropdown } from '@/Common/Components/Dropdown'

type Props = {
  currentTab: number
  eventData: EventData
  isPlayer?: boolean
  setCurrentTab: SetState<number>
}

/**
 * Top of the Event page
 */
export const Header = (props: Props) => {
  const { currentTab, eventData, isPlayer = false, setCurrentTab } = props

  const [count, setCount] = useState(0)

  // TODO DELETE THIS
  useEffect(() => {
    if (count === 5) {
      enableGenerators(eventData)
    }
  }, [count])

  const destination = isPlayer ? '/home/' : '/manage/'

  // TODO REMOVE THIS
  const { generatorsEnabled } = eventData.eventDetails
  const allTabs = generatorsEnabled ? [...eventTabs, 'Generator'] : eventTabs

  return (
    <header className="relative">
      {!isPlayer && (
        <div
          className="absolute right-0 top-0 cursor-default text-xs text-indigo-200"
          onClick={() => setCount(count + 1)}
        >
          `
        </div>
      )}

      <div className="m-2">
        <Button>
          <Link to={destination}>Return to Dashboard</Link>
        </Button>

        <h1 className="text-2xl font-semibold mt-4">
          {eventData.eventDetails.name}
        </h1>
      </div>

      <div className="m-2">
        <Dropdown
          isEditing
          labelText="Menu"
          items={allTabs}
          value={getTabValue(currentTab)}
          onChange={(e) => setCurrentTab(getTabIndex(e.target.value))}
          containerClassName="sm:hidden"
        />

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {allTabs.map((tab, index) => (
                <Button
                  key={`${tab}_${index}`}
                  variant="text"
                  onClick={() => setCurrentTab(index)}
                  className={cn(
                    'whitespace-nowrap font-medium text-lg ml-0 p-6 rounded-b-none',
                    currentTab === index
                      ? 'text-white bg-black hover:text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  )}
                  aria-current={currentTab === index ? 'true' : undefined}
                >
                  {tab}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
