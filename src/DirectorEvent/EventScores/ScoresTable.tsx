import { useState } from 'react'
import { Switch } from '@headlessui/react'
import type { Updater } from 'use-immer'
import cn from 'classnames'

import type { EventData, SetState } from '@/Common/Common.types'

import { Button } from '@/Common/Components/Button'
import { Checkbox } from '@/Common/Components/Checkbox'
import { ScoresBody } from './ScoresBody'
import { ScoresHeader } from './ScoresHeader'
import { ScoresPrintModal } from './ScoresPrintModal'
import { TextInput } from '@/Common/Components/TextInput'

type Props = {
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
  setIsDirty: SetState<boolean>
}

/**
 * Scores Table for adding scores to an event
 */
export const ScoresTable = (props: Props) => {
  const { eventData, isPlayer, setEventData, setIsDirty } = props

  const [filterTerm, setTerm] = useState('')
  const [sortByNames, setSortByNames] = useState(false)
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [showTotals, setShowTotals] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex items-center">
            <TextInput
              isEditing
              className="mb-4 w-1/2"
              labelText="Filter Players"
              value={filterTerm}
              onChange={(e) => {
                setTerm(e.target.value)
              }}
            />
            <Switch.Group as="div" className="flex items-center ml-8">
              <Switch
                checked={sortByNames}
                onChange={setSortByNames}
                className={cn(
                  sortByNames ? 'bg-amber-400' : 'bg-gray-200',
                  'relative inline-flex shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    sortByNames ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200',
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3">
                <span className="text-sm font-medium text-gray-900">
                  Sort by
                </span>
                <span className="text-lg font-medium text-black">
                  {sortByNames ? ' Name' : ' Lane'}
                </span>
              </Switch.Label>
            </Switch.Group>

            {!isPlayer && (
              <Button className="mx-4" onClick={() => setShowPrintModal(true)}>
                Print Scores
              </Button>
            )}

            <Checkbox
              isEditing
              labelText="Show Totals"
              isChecked={showTotals}
              onChange={() => setShowTotals(!showTotals)}
              containerClassName="flex items-center ml-2"
            />
          </div>

          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-2 mb-4">
            <div className="table min-w-full divide-y divide-gray-200 pb-12 relative">
              <ScoresHeader eventData={eventData} showTotals={showTotals} />
              <ScoresBody
                filterTerm={filterTerm}
                eventData={eventData}
                setEventData={setEventData}
                sortByNames={sortByNames}
                isPlayer={isPlayer}
                setIsDirty={setIsDirty}
                showTotals={showTotals}
              />
            </div>
          </div>

          {showPrintModal && (
            <ScoresPrintModal
              onClose={() => setShowPrintModal(false)}
              eventData={eventData}
              setEventData={setEventData}
            />
          )}
        </div>
      </div>
    </div>
  )
}
