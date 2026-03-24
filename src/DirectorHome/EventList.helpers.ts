import { getDatabase, onValue, ref } from 'firebase/database'
import { Updater } from 'use-immer'

import { EventListState, MyEventsInfoResponse } from './EventList.types'
import type { EventData, GenericStatus } from '@/Common/Common.types'

/**
 * Creates an initial state for the Event List
 */
export const getInitialEventData = (): MyEventsInfoResponse => ({
  error: '',
  events: [],
  status: EventListState.Loading,
})

/**
 * Gets the list of events from the database
 */
export const fetchEventsData = async (
  directorID: string,
  setEventData: Updater<MyEventsInfoResponse>,
) => {
  try {
    // Get event references
    const db = getDatabase()
    const directorRef = ref(db, `directors/${directorID}`)
    onValue(directorRef, async (snapshot) => {
      const data = snapshot.val()

      // Bad ref URL
      if (data === null) {
        setEventData((draft) => {
          draft.error = 'Error code: ELHTS_001'
          draft.status = EventListState.Error
        })
        return
      }

      // No events saved
      if (data.eventSummaries === undefined) {
        setEventData((draft) => {
          draft.error = ''
          draft.events = []
          draft.status = EventListState.Success
        })

        // Has events saved
      } else if (Object.keys(data.eventSummaries).length > 0) {
        const myEventsList = buildEvents(data.eventSummaries)
        setEventData((draft) => {
          draft.error = ''
          draft.events = myEventsList
          draft.status = EventListState.Success
        })

        // Unknown error
      } else {
        setEventData((draft) => {
          draft.error = 'Error code: ELHTS_002'
          draft.status = EventListState.Error
        })
      }
    })
  } catch (error) {
    setEventData((draft) => {
      draft.error = `There was an error getting your account data: ${error}`
      draft.status = EventListState.Error
    })
  }
}

/**
 * Adds all events to the event list
 * Sorts the events based on status and then date
 */
const buildEvents = (eventSummaries: any) => {
  const myEventsList: EventData[] = []
  Object.keys(eventSummaries).map((event) => {
    myEventsList.push(eventSummaries[event])
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Custom sorting function
  myEventsList.sort((a, b) => {
    const dateA = new Date(a.eventDetails.date)
    const dateB = new Date(b.eventDetails.date)

    const isDateAToday = dateA.getTime() === today.getTime()
    const isDateBToday = dateB.getTime() === today.getTime()

    if (isDateAToday !== isDateBToday) {
      return isDateBToday ? 1 : -1
    }

    const statusOrder: { [key in GenericStatus]: number } = {
      Open: 1,
      'In Progress': 2,
      Closed: 3,
    }

    if (a.eventDetails.status !== b.eventDetails.status) {
      return (
        statusOrder[a.eventDetails.status] - statusOrder[b.eventDetails.status]
      )
    }

    return dateB.getTime() - dateA.getTime()
  })

  return myEventsList
}
