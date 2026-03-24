import { v4 as uuidv4 } from 'uuid'

import {
  GenericStatus,
  GenericFormStatus,
  GenericFormState,
  GenericModalFormState,
  EventData,
} from '../Common.types'

/**
 * Joins classNames that may be conditionally rendered
 */
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Returns the correct color based on the status
 */
export const getStatusColors = (status: string) => {
  if (status === 'Open') {
    return 'bg-green-100'
  } else if (status === 'In Progress') {
    return 'bg-amber-100'
  } else if (status === 'Closed') {
    return 'bg-gray-200'
  }
  return 'bg-red-100'
}

/**
 * Creates an empty Event Form
 */
export const getInitialEventFormData = (): EventData => ({
  brackets: [],
  eventDetails: {
    areNotificationsEnabled: false,
    createdAt: new Date().toISOString(),
    date: '',
    description: '',
    directorInfo: {
      email: '',
      name: '',
      phone: '',
    },
    id: uuidv4(),
    isPrivate: false,
    location: '',
    generatorsEnabled: false,
    name: '',
    numParticipants: 0,
    paymentLink: '',
    photo: null,
    status: GenericStatus.Open,
  },
  games: [],
  generators: [],
  guestPlayers: [],
  leagues: [],
  players: [],
  scores: [],
  teams: [],
  tournaments: [],
})

/**
 * Gets generic form state
 */
export const getInitialGenericFormState = (
  intitialStatus = GenericFormStatus.Loading,
): GenericFormState => ({
  error: '',
  status: intitialStatus,
  success: '',
})

/**
 * Gets generic form state with a modal
 */
export const getInitialGenericModalState = (
  initialStatus = GenericFormStatus.Loading,
): GenericModalFormState => ({
  error: '',
  isModalVisible: false,
  status: initialStatus,
  success: '',
})
