import { getAnalytics, logEvent } from 'firebase/analytics'
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth'
import { child, get, getDatabase, ref } from 'firebase/database'
import type { Updater } from 'use-immer'

import type { LogInFormData } from './Login.types'
import { SubscriptionStatus, UserType } from '../Common/Common.types'

/**
 * Initial state for the login form
 */
export const getDefaultFormData = (): LogInFormData => ({
  accountStatus: SubscriptionStatus.Inactive,
  email: '',
  password: '',
  error: '',
  isLoading: false,
  success: '',
  userType: UserType.None,
})

/**
 * Logs in the user with their email
 */
export const signInEmailUser = async (
  isPlayer: boolean,
  formData: LogInFormData,
  setFormData: Updater<LogInFormData>,
) => {
  setFormData((draft) => {
    draft.error = ''
    draft.isLoading = true
    draft.success = ''
  })
  const { email, password } = formData
  let confirmedIsPlayer = isPlayer

  // Login the user
  try {
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )

    // Signed in
    const user = userCredential.user

    // Try to get user info, assume they chose the right user type
    let selectedCorrectType = await tryToGetUserData(
      isPlayer,
      setFormData,
      false,
      user,
    )

    // If they chose the wrong user type we'll try with the other one for them.
    // Costs an extra call to the DB, but will save potentially many calls if they keep trying with the wrong user type.
    if (!selectedCorrectType) {
      confirmedIsPlayer = !confirmedIsPlayer
      selectedCorrectType = await tryToGetUserData(
        !isPlayer,
        setFormData,
        true,
        user,
      )
    }

    // Didn't get it either time so they don't have an account
    // TODO CHECK THE OLD DATABASE FOR THEIR OLD ACCOUNT INFO
    if (!selectedCorrectType) {
      setFormData((draft) => {
        draft.error = `There was an error logging you in. Please make sure you have an account and try again. Error code: LHTS_001`
        draft.isLoading = false
      })
    }
  } catch (error) {
    console.log('Error: ', error)

    const user = getAuth().currentUser
    if (user) {
      // Redirect because something happened
      // TODO FIND OUT HOW TO FIX THIS BETTER
      window.location.href = confirmedIsPlayer ? '/home/' : '/manage/'
      return
    }

    setFormData((draft) => {
      draft.error = 'There was an error logging you in. Error Code: LHTS_003'
      draft.isLoading = false
    })
  }
}

/**
 * Reusable fetch method that gets the user's information
 */
const tryToGetUserData = async (
  isPlayer: boolean,
  setFormData: Updater<LogInFormData>,
  showError: boolean, // Don't show error on the first attempt to get their info
  user: User,
): Promise<boolean> => {
  setFormData((draft) => {
    draft.error = ''
  })

  const userPath = `${isPlayer ? 'players' : 'directors'}/${user.uid}`
  const dbRef = ref(getDatabase())
  try {
    const snapshot = await get(child(dbRef, userPath))

    // They are the userType they selected
    if (snapshot.exists()) {
      const data = snapshot.val()
      const analytics = getAnalytics()

      let userType = UserType.None
      let accountStatus = SubscriptionStatus.Inactive
      if (data.userType === 'player') {
        logEvent(analytics, 'player_login', {
          userId: user.uid,
        })
        userType = UserType.Player
      } else if (data.userType === 'business') {
        userType = UserType.Business
        logEvent(analytics, 'director_login', {
          userId: user.uid,
        })

        // Check their account status
        accountStatus = data.accountStatus
      }
      setFormData((draft) => {
        draft.accountStatus = accountStatus
        draft.error = ''
        draft.isLoading = false
        draft.success = `Log in success!`
        draft.userType = userType
      })
      return true
    }

    return false
  } catch (error) {
    setFormData((draft) => {
      draft.error = `There was an error logging you in. Please make sure you have selected the correct account type and try again. Error code: LHTS_002`
      draft.isLoading = false
    })
    return false
  }
}

/**
 * Routes a manger to the correct place based on their account status
 */
export const routeManager = (accountStatus: SubscriptionStatus) => {
  switch (accountStatus) {
    case SubscriptionStatus.Active:
      window.location.href = '/manage/'
      return

    case SubscriptionStatus.Inactive:
    default:
      window.location.href = '/inactive/'
  }
}
