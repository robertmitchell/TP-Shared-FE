import { getAuth } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'
import { Updater } from 'use-immer'

import type { BrowseEventsState } from './BrowseEvents.types'
import { GenericStatus, PlayerEventDetails } from '@/Common/Common.types'

import { deepCloneArr } from '@/Common/Utils/deepCloneArr'
import { deepCloneObj } from '@/Common/Utils/deepCloneObj'

/**
 * Gets the initial shape of data for the browse events page
 */
export const getInitialSearchState = (): BrowseEventsState => ({
  error: '',
  events: [],
  loading: true,
  success: '',
})

/**
 * Gets all events
 */
export const fetchAllEvents = async (setState: Updater<BrowseEventsState>) => {
  try {
    setState((draft) => {
      draft.loading = true
    })

    // Ensure they are logged in
    const user = getAuth().currentUser

    if (!user) {
      setState((draft) => {
        draft.error = 'Please log in and try again. Error Code: BEHTS_001'
        draft.loading = false
      })
      return
    }

    // Get all events
    const db = getDatabase()
    const directorsRef = ref(db, 'directors/')
    onValue(directorsRef, (snapshot) => {
      const data = snapshot.val()

      if (data !== null) {
        buildEvents(data, setState)
      } else {
        setState((draft) => {
          draft.error = 'No events were found. Error Code: BEHTS_002'
          draft.loading = false
        })
      }
    })
  } catch (error) {
    setState((draft) => {
      draft.error =
        'There was an error searching for events. Error Code: BEHTS_003'
      draft.loading = false
    })
    return []
  }
}

/**
 * Gets all events from the database that was found
 */
const buildEvents = (
  documentData: any,
  setState: Updater<BrowseEventsState>,
) => {
  const allEvents: PlayerEventDetails[] = []

  // Loop through each Director's UID
  if (Object.keys(documentData).length > 0) {
    Object.keys(documentData).forEach((directorUID: string) => {
      // Loop through each event summary
      if (
        documentData[directorUID].eventSummaries &&
        Object.keys(documentData[directorUID].eventSummaries).length > 0
      ) {
        Object.keys(documentData[directorUID].eventSummaries).forEach(
          (eventUID: string) => {
            // Add this event to all of the events
            if (
              documentData[directorUID].eventSummaries[eventUID]
                .eventDetails !== undefined
            ) {
              const details =
                documentData[directorUID].eventSummaries[eventUID].eventDetails
              details.directorUID = directorUID

              allEvents.push(details)
            }
          },
        )
      }
    })
  }

  setState((draft) => {
    draft.events = allEvents
    draft.loading = false
  })
}

/**
 * Filters just the events that meet the criteria
 */
export const getFilteredEvents = (
  events: PlayerEventDetails[],
  searchTerm: string,
  selectedTab: number,
): PlayerEventDetails[] => {
  if (searchTerm.length === 0) {
    return sortAndFilterEvents(events, selectedTab)
  }

  let filteredEvents: PlayerEventDetails[] = deepCloneArr(events)

  filteredEvents = filteredEvents.filter((event) => {
    return event.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  })

  return sortAllEvents(filteredEvents)
}

/**
 * Filters the events first based on date then sorts by status
 */
const sortAndFilterEvents = (
  events: PlayerEventDetails[],
  selectedTab: number,
) => {
  let sortedEvents: PlayerEventDetails[] = deepCloneObj(events)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  switch (selectedTab) {
    case 2: // Future
      // Filter events with a date after today
      sortedEvents = sortedEvents.filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate.getTime() > today.getTime()
      })

      // Custom sorting function
      sortedEvents = sortedEvents.sort((a, b) => {
        const statusOrder: { [key in GenericStatus]: number } = {
          Open: 1,
          'In Progress': 2,
          Closed: 3,
        }

        return statusOrder[a.status] - statusOrder[b.status]
      })
      break

    case 1: // Today
      // Filter events with today's date
      sortedEvents = sortedEvents.filter((event) => {
        const eventDate = new Date(event.date)

        const sameDay =
          eventDate.getUTCDate() === today.getUTCDate() &&
          eventDate.getUTCMonth() === today.getUTCMonth() &&
          eventDate.getUTCFullYear() === today.getUTCFullYear()

        return sameDay
      })

      // Custom sorting function
      sortedEvents = sortedEvents.sort((a, b) => {
        const statusOrder: { [key in GenericStatus]: number } = {
          Open: 1,
          'In Progress': 2,
          Closed: 3,
        }

        return statusOrder[a.status] - statusOrder[b.status]
      })
      break

    case 0: // Past
    default:
      // Filter events with a date after today
      sortedEvents = sortedEvents.filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate.getTime() < today.getTime()
      })

      // Custom sorting function
      sortedEvents = sortedEvents.sort((a, b) => {
        const statusOrder: { [key in GenericStatus]: number } = {
          Open: 1,
          'In Progress': 2,
          Closed: 3,
        }

        return statusOrder[a.status] - statusOrder[b.status]
      })
      return sortedEvents
  }

  return sortedEvents
}

/**
 * Sorts all Events based on status and then date
 */
const sortAllEvents = (events: PlayerEventDetails[]) => {
  let sortedEvents: PlayerEventDetails[] = deepCloneObj(events)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Custom sorting function
  sortedEvents.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

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

    if (a.status !== b.status) {
      return statusOrder[a.status] - statusOrder[b.status]
    }

    return dateB.getTime() - dateA.getTime()
  })

  return sortedEvents
}
