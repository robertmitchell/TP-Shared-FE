import { useState } from 'react'
import { getAnalytics, logEvent } from 'firebase/analytics'
import type { Updater } from 'use-immer'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

import { EventData, TLBViewStatus } from '@/Common/Common.types'
import type { DropdownData } from '@/Common/Components/Dropdown.types'

import {
  getEmptyTournament,
  getTournamentIndex,
} from './TournamentDetails.helper'

import { Button } from '@/Common/Components/Button'
import { Dropdown } from '@/Common/Components/Dropdown'
import { SectionHeader } from '@/CreateEvent/SectionHeader'
import { TournamentForm } from './TournamentForm'
import { TournamentOptions } from './TournamentOptions'

type Props = {
  descriptionText: string
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

/**
 * Entrypoint for containing all tournaments
 */
export const TournamentDetails = (props: Props) => {
  const { descriptionText, eventData, isPlayer, setEventData, tLBViewStatus } =
    props

  const [displayedIndex, setDisplayedIndex] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState(0)

  const analytics = getAnalytics()
  const isEditing =
    tLBViewStatus === TLBViewStatus.Create ||
    tLBViewStatus === TLBViewStatus.Editing

  const dropdownData: DropdownData[] = []
  eventData.tournaments.map((tournament, index) => {
    dropdownData.push({ name: tournament.name, id: index.toString() })
  })

  return (
    <div className="bg-white sm:drop-shadow-md p-0 pb-2 sm:rounded-lg sm:p-6">
      <SectionHeader
        description={eventData.tournaments.length > 0 ? descriptionText : ''}
        isEditing={isEditing}
        addNumForms={() => {
          logEvent(analytics, 'tournament_added')
          setEventData((draft) => {
            draft.tournaments.push(getEmptyTournament())
          })
          setDisplayedIndex(eventData.tournaments.length)
        }}
        title="Event Tournaments"
      />

      <div className="md:mt-0 md:col-span-2">
        <nav
          aria-label="Tabs"
          className="flex flex-wrap border-bottom border-gray-200"
        >
          {tLBViewStatus === TLBViewStatus.Create ? (
            <>
              {eventData.tournaments.map((_form, index) => (
                <Button
                  key={index}
                  variant={displayedIndex === index ? 'primary' : 'secondary'}
                  onClick={() => setDisplayedIndex(index)}
                  className="whitespace-nowrap text-lg m-2"
                  aria-current={displayedIndex === index ? 'true' : undefined}
                >
                  {!eventData.tournaments[index].name
                    ? 'New Tournament'
                    : eventData.tournaments[index].name}
                  {(eventData.tournaments[index].name.length === 0 ||
                    eventData.tournaments[index].numRounds === 0) && (
                    <span>*</span>
                  )}
                </Button>
              ))}
            </>
          ) : (
            <div className="mb-2">
              {eventData.tournaments.length > 0 ? (
                <>
                  <p className="font-medium ml-2 sm:ml-0">
                    Select the Tournament from the dropdown to see its details.
                  </p>
                  <Dropdown
                    className="w-full mx-2 sm:mx-0"
                    isEditing
                    labelText=""
                    items={dropdownData}
                    value={eventData.tournaments[displayedIndex].name}
                    onChange={(e) =>
                      setDisplayedIndex(
                        getTournamentIndex(
                          e.target.value,
                          eventData.tournaments,
                        ),
                      )
                    }
                  />
                </>
              ) : (
                <h3 className="text-lg text-center mt-2 text-gray-400">
                  There are no Tournaments in this Event
                </h3>
              )}
            </div>
          )}

          {isEditing && eventData.tournaments.length > 0 && (
            <Button
              variant="dangertext"
              className="m-2 border-red-500 border-2 hover:border-gray-900"
              onClick={() => {
                if (eventData.tournaments.length === 1) {
                  setDisplayedIndex(0)
                } else if (displayedIndex > eventData.tournaments.length - 2) {
                  setDisplayedIndex(eventData.tournaments.length - 2)
                }
                setEventData((draft) => {
                  draft.tournaments.pop()
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

        {eventData.tournaments.length > 0 &&
          tLBViewStatus !== TLBViewStatus.Create &&
          tLBViewStatus !== TLBViewStatus.Editing && (
            <TournamentOptions
              eventData={eventData}
              isPlayer={isPlayer}
              selectedOption={selectedOption}
              setEventData={setEventData}
              setSelectedOption={setSelectedOption}
              tIndex={displayedIndex}
              tLBViewStatus={tLBViewStatus}
            />
          )}

        {selectedOption === 0 && (
          <TournamentForm
            eventData={eventData}
            isPlayer={isPlayer}
            setEventData={setEventData}
            tIndex={displayedIndex}
            tLBViewStatus={tLBViewStatus}
          />
        )}
      </div>
    </div>
  )
}
