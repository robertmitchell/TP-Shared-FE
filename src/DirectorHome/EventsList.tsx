import { useEffect } from 'react'
import { useImmer } from 'use-immer'

import { EventListState } from './EventList.types'

import { fetchEventsData, getInitialEventData } from './EventList.helpers'

import { ErrorMessage } from '@/Common/Components/ErrorMessage'
import { EventItem } from './EventItem'

type Props = {
  directorID: string
}

export const EventsList = (props: Props) => {
  const { directorID } = props

  const [eventsData, setEventsData] = useImmer(getInitialEventData)

  useEffect(() => {
    fetchEventsData(directorID, setEventsData)
  }, [])

  switch (eventsData.status) {
    case EventListState.Loading:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium">Loading...</h1>
      )

    case EventListState.No_Events:
      return (
        <h1 className="text-center mt-10 text-2xl font-medium text-black">
          You have not created any events.
        </h1>
      )

    case EventListState.Success:
      return (
        <main className="bg-white shadow overflow-hidden rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {eventsData.events.map((event) => (
              <li key={event.eventDetails.id}>
                <EventItem eventDetails={event.eventDetails} />
              </li>
            ))}
          </ul>
        </main>
      )

    case EventListState.Error:
      return (
        <ErrorMessage>
          There was an error loading your events list. Please try again.{' '}
          {eventsData.error}
        </ErrorMessage>
      )

    default:
      return (
        <ErrorMessage>
          An unknown error occured. Error Code: ELTSX_001
        </ErrorMessage>
      )
  }
}
