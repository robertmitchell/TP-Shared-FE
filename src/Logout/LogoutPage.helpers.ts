import { getAuth } from 'firebase/auth'

import type { SetState } from '@/Common/Common.types'

/**
 * Logs out a user
 */
export const signOutUser = (setLogoutSuccess: SetState<boolean>) => {
  getAuth().signOut()
  setLogoutSuccess(true)
}
