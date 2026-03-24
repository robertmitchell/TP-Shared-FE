import { UserType } from '../Common/Common.types'

export enum DirectorHomeStatus {
  Initial = 'Initial',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export type DirectorInfoResponse = {
  businessName: string
  email: string
  error: string
  name: string
  photo: string | null
  status: DirectorHomeStatus
  success: string
  userId: string
  userType: UserType
}
