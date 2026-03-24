import { useState } from 'react'
import { getAnalytics, logEvent } from 'firebase/analytics'
import type { Updater } from 'use-immer'

import { EventData, TLBViewStatus } from '@/Common/Common.types'
import type { DropdownData } from '@/Common/Components/Dropdown.types'

import { getBracketIndex, getEmptyBracket } from './BracketDetails.helpers'

import { Button } from '@/Common/Components/Button'
import { BracketForm } from './BracketForm'
import { BracketOptions } from './BracketOptions/BracketOptions'
import { Dropdown } from '@/Common/Components/Dropdown'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import { SectionHeader } from '../../../CreateEvent/SectionHeader'

type Props = {
  descriptionText: string
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

/**
 * Entrypoint for containing all brackets
 */
export const BracketDetails = (props: Props) => {
  const { descriptionText, eventData, isPlayer, setEventData, tLBViewStatus } =
    props

  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(0)

  const analytics = getAnalytics()
  const isEditing =
    tLBViewStatus === TLBViewStatus.Create ||
    tLBViewStatus === TLBViewStatus.Editing

  const dropdownData: DropdownData[] = []
  eventData.brackets.map((bracket, index) => {
    dropdownData.push({ name: bracket.name, id: index.toString() })
  })

  return (
    <div className="bg-white sm:drop-shadow-md p-0 pb-4 sm:rounded-lg sm:p-6">
      <SectionHeader
        description={eventData.brackets.length > 0 ? descriptionText : ''}
        isEditing={isEditing}
        addNumForms={() => {
          setEventData((draft) => {
            logEvent(analytics, 'bracket_added')

            draft.brackets.push(getEmptyBracket())
          })
          setDisplayedIndex(eventData.brackets.length)
        }}
        title="Event Brackets"
      />

      <div className="md:mt-0 md:col-span-2">
        <nav
          aria-label="Tabs"
          className="flex flex-wrap border-bottom border-gray-200"
        >
          {tLBViewStatus === TLBViewStatus.Create ? (
            <>
              {eventData.brackets.map((_form, index) => (
                <Button
                  key={index}
                  variant={displayedIndex === index ? 'primary' : 'secondary'}
                  onClick={() => setDisplayedIndex(index)}
                  className="whitespace-nowrap text-lg m-2"
                  aria-current={displayedIndex === index ? 'true' : undefined}
                >
                  {!eventData.brackets[index].name
                    ? 'New Bracket'
                    : eventData.brackets[index].name}
                  {eventData.brackets[index].name.length === 0 && (
                    <span>*</span>
                  )}
                </Button>
              ))}
            </>
          ) : (
            <div className="mb-2">
              {eventData.brackets.length > 0 ? (
                <>
                  <p className="font-medium ml-2 sm:ml-0">
                    Select the Bracket from the dropdown to see its details.
                  </p>
                  <Dropdown
                    className="w-full mx-2 sm:mx-0"
                    isEditing
                    labelText=""
                    items={dropdownData}
                    value={eventData.brackets[displayedIndex].name}
                    onChange={(e) => {
                      setDisplayedIndex(
                        getBracketIndex(e.target.value, eventData.brackets),
                      )
                      setSelectedOption(-1)
                    }}
                  />
                </>
              ) : (
                <h3 className="text-lg text-center mt-2 text-gray-400">
                  There are no Brackets in this Event
                </h3>
              )}
            </div>
          )}

          {isEditing && eventData.brackets.length > 0 && (
            <Button
              variant="dangertext"
              className="m-2 border-red-600 border-2 hover:border-gray-900"
              onClick={() => {
                if (eventData.brackets.length === 1) {
                  setDisplayedIndex(0)
                } else if (displayedIndex > eventData.brackets.length - 2) {
                  setDisplayedIndex(eventData.brackets.length - 2)
                }
                setEventData((draft) => {
                  draft.brackets.pop()
                })
              }}
            >
              <MinusCircleIcon
                className="mr-1 shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              Delete Last
            </Button>
          )}
        </nav>

        {eventData.brackets.length > 0 &&
          tLBViewStatus !== TLBViewStatus.Create &&
          tLBViewStatus !== TLBViewStatus.Editing && (
            <BracketOptions
              bIndex={displayedIndex}
              eventData={eventData}
              isPlayer={isPlayer}
              setEventData={setEventData}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              tLBViewStatus={tLBViewStatus}
            />
          )}

        {selectedOption === 0 && (
          <BracketForm
            bIndex={displayedIndex}
            eventData={eventData}
            isPlayer={isPlayer}
            setEventData={setEventData}
            tLBViewStatus={tLBViewStatus}
          />
        )}
      </div>
    </div>
  )
}
