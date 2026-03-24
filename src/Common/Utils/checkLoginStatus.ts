import { getAuth } from 'firebase/auth'
import { child, get, getDatabase, ref } from 'firebase/database'

/**
 * Checks to see if a user is logged in and redirects
 * them to the login page if they are not
 */
export const checkLoginStatus = (checkSubscriptionStatus: boolean) => {
  // Check if they are logged in and redirect to sign_in page if not
  const user = getAuth().currentUser

  if (!user) {
    window.location.href = '/sign_in/'
    return
  }

  // Get their status
  if (checkSubscriptionStatus) {
    try {
      const userPath = `directors/${user.uid}/accountStatus`
      const dbRef = ref(getDatabase())

      get(child(dbRef, userPath))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            if (data !== 'Active') {
              redirect()
            }
          } else {
            redirect()
          }
        })
        .catch(() => {
          redirect()
        })
    } catch (error) {
      redirect()
    }
  }
}

const redirect = () => {
  window.location.href = '/inactive/'
}
