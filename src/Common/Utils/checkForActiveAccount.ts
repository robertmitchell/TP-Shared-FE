import { getAuth } from 'firebase/auth'
import { child, get, getDatabase, ref } from 'firebase/database'
import { Updater } from 'use-immer'

import { GenericFormState, GenericFormStatus } from '@/Common/Common.types'

/**
 * Check for stripe webhook success 10 times with increasingly long intervals
 * Once the status is updated we can redirect to the home page
 */
export const checkForActiveAccount = (setState: Updater<GenericFormState>) => {
  let timer: NodeJS.Timer
  let counter = 0

  // Check if they are logged in and redirect to sign_in page if not
  const user = getAuth().currentUser

  if (!user) {
    window.location.href = '/sign_in/'
    return
  }

  // Database constants
  const userPath = `directors/${user.uid}/accountStatus`
  const dbRef = ref(getDatabase())

  // Check their account status for active subscription every 5 seconds
  timer = setInterval(() => {
    if (counter < 10) {
      counter++

      try {
        get(child(dbRef, userPath)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            clearInterval(timer)
            // Check for `Active` subscription
            if (data === 'Active') {
              setState((draft) => {
                draft.error = ''
                draft.success =
                  'Your subscription is active. Redirecting you to the dashboard please wait.'
                draft.status = GenericFormStatus.Success
              })
            } else {
              setState((draft) => {
                draft.error =
                  'Your account is not active. Error Code: CFAATS_004'
                draft.status = GenericFormStatus.Error
              })
            }

            return
          }
        })
      } catch (error) {
        setState((draft) => {
          draft.error =
            'There was an error while checking for an active subscription. Error Code: CFAATS_002'
        })
      }

      // Stop becuase we've checked 10 times
    } else {
      clearInterval(timer)
      setState((draft) => {
        draft.error =
          'We could not find an active subscription. Error Code: CFAATS_003'
      })
      return
    }
  }, 5000)
}
