import { UserType } from '../../Common/Common.types'

/**
 * Possible statuses for the player dashboard
 */
export enum PlayerHomeStatus {
  Error = 'Error',
  Loading = 'Loading',
  Success = 'Success',
}

/**
 * Shape of the data from `players/${user.uid}` endpoint
 */
export type PlayerInfoResponse = {
  email: string
  error: string
  firstName: string
  isMale: boolean
  lastName: string
  photo: string | null
  status: PlayerHomeStatus
  userId: string | null
  userType: UserType
}
