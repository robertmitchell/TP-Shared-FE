import { getAuth } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'

import { ManageEventState, ManageEventStatus } from './DirectorEvent.types'
import type { EventData, SetState } from '../Common/Common.types'

import { getInitialEventFormData } from '../Common/Utils/UtilityFunctions'
import { getEmptyEventDetails } from '@/Common/Utils/getEmptyEventDetails'

/**
 * Creates an initial state for the page
 */
export const getInitialManageEventState = (): ManageEventState => ({
  status: ManageEventStatus.Loading,
  error: '',
  success: '',
  isDeleteModalOpen: false,
})

/**
 * Gets the details for the event
 */
export const fetchEventData = (
  eventId: string,
  setManageEventState: SetState<ManageEventState>,
  setEventData: SetState<EventData>,
  directorUID?: string,
) => {
  const user = getAuth().currentUser
  if (!user) {
    setManageEventState({
      status: ManageEventStatus.Error,
      error: 'Please log in and try again. Error code: MEHTS_001',
      success: '',
      isDeleteModalOpen: false,
    })
    return
  }

  const directorsID = directorUID === undefined ? user.uid : directorUID

  const db = getDatabase()
  const eventRef = ref(db, `directors/${directorsID}/events/${eventId}`)

  try {
    // Get Event data
    onValue(eventRef, async (snapshot) => {
      const data = snapshot.val()

      if (data !== null) {
        const finalData = await buildEvent(data)

        setEventData(finalData)
        setManageEventState({
          status: ManageEventStatus.Success,
          error: '',
          success: '',
          isDeleteModalOpen: false,
        })
      } else {
        setManageEventState({
          status: ManageEventStatus.Error,
          error: 'Error code: MEHTS_002',
          success: '',
          isDeleteModalOpen: false,
        })
      }
    })
  } catch (error) {
    setManageEventState({
      status: ManageEventStatus.Error,
      error: `There was an error getting your account data: ${error}`,
      success: '',
      isDeleteModalOpen: false,
    })
  }
}

/**
 * Builds the event from the DB data
 * `games` and `eventDetails` cannot be undefined since they are required to create an event
 */
const buildEvent = async (eventData: any) => {
  const finalData = getInitialEventFormData()

  finalData.eventDetails = Object.assign(
    getEmptyEventDetails(),
    eventData.eventDetails,
  )
  finalData.tournaments = eventData.tournaments || []
  finalData.leagues = eventData.leagues || []
  finalData.brackets = eventData.brackets || []
  finalData.players = eventData.players || []
  finalData.guestPlayers = eventData.guestPlayers || []
  finalData.games = eventData.games
  finalData.scores = eventData.scores || []
  finalData.teams = eventData.teams || []

  if (eventData.generators !== undefined) {
    Object.keys(eventData.generators).map((generatorKey) => {
      finalData.generators.push(eventData.generators[generatorKey])
    })
  }

  return finalData
}

/**
 * DEV ONLY - DO NOT USE IN PRODUCTION
 * TODO BRING THIS BACK
 */
// export const copyInfo = async (
//   eventId: string,
//   eventData: EventData,
// ) => {
//   const db = getFirestore()

//   const {
//     eventDetails: {
//       name,
//       description,
//       photo,
//       areNotificationsEnabled,
//       isPrivate,
//       date,
//       location,
//       numParticipants,
//       status,
//     },
//     tournaments,
//     leagues,
//     brackets,
//     games,
//     players,
//     guestPlayers,
//     scores,
//   } = eventData

//   await setDoc(doc(db, 'events', eventId), {
//     id: eventId,
//     name,
//     description,
//     photo,
//     areNotificationsEnabled,
//     isPrivate,
//     date,
//     location,
//     tournaments,
//     leagues,
//     brackets,
//     games,
//     numParticipants,
//     status,
//     players,
//     guestPlayers,
//     scores,
//   })

//   console.log('Done!')
// }
