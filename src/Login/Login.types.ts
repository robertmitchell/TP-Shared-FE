import { SubscriptionStatus, UserType } from '../Common/Common.types'

export type LogInFormData = {
  accountStatus: SubscriptionStatus
  email: string
  error: string
  isLoading: boolean
  password: string
  success: string
  userType: UserType
}
