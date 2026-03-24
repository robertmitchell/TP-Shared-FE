import { EventDetails, GenericStatus } from '../Common.types'

/**
 * Creates an empty Event Details object
 */
export const getEmptyEventDetails = (): EventDetails => ({
  areNotificationsEnabled: false,
  createdAt: new Date().toISOString(),
  date: new Date().toISOString(),
  description: '',
  directorInfo: {
    email: '',
    name: '',
    phone: '',
  },
  id: '',
  isPrivate: false,
  generatorsEnabled: false,
  location: '',
  name: '',
  numParticipants: 0,
  paymentLink: '',
  photo: null,
  status: GenericStatus.Open,
})
