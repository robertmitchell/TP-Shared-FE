import cn from 'classnames'
import type { Updater } from 'use-immer'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

import { EventData, TLBViewStatus } from '@/Common/Common.types'

import { getEmptyLeague } from './LeageDetails.helpers'

import { Button } from '@/Common/Components/Button'
import { LeagueForm } from './LeagueForm/LeagueForm'
import { SectionHeader } from '@/CreateEvent/SectionHeader'

type Props = {
  descriptionText: string
  eventData: EventData
  isPlayer: boolean
  setEventData: Updater<EventData>
  tLBViewStatus: TLBViewStatus
}

/**
 * Entrypoint for containing all leagues
 */
export const LeagueDetails = (props: Props) => {
  const { descriptionText, eventData, isPlayer, setEventData, tLBViewStatus } =
    props

  const isEditing =
    tLBViewStatus === TLBViewStatus.Create ||
    tLBViewStatus === TLBViewStatus.Editing

  return (
    <div className="bg-yellow-50 shadow rounded-md px-4 py-5 sm:rounded-lg sm:p-6">
      <div className={cn({ 'md:grid md:grid-cols-3 md:gap-6': isEditing })}>
        <SectionHeader
          isEditing={isEditing}
          title="League Details"
          description={descriptionText}
          addNumForms={() =>
            setEventData((draft) => {
              draft.leagues.push(getEmptyLeague())
            })
          }
        />

        <div className="md:mt-0 md:col-span-2">
          {eventData.leagues.map((_form, index) => (
            <div key={index}>
              <LeagueForm
                index={index}
                eventData={eventData}
                isPlayer={isPlayer}
                setEventData={setEventData}
                tLBViewStatus={tLBViewStatus}
              />
            </div>
          ))}

          {isEditing && eventData.leagues.length > 0 && (
            <Button
              variant="dangertext"
              type="button"
              className="ml-1 mt-2 rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() =>
                setEventData((draft) => {
                  draft.leagues.pop()
                })
              }
            >
              <MinusCircleIcon className="h-7 w-7" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
