import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

import { ROUTES } from './Config/routes'

/**
 * Base of the application
 **/
export const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyAkuH4h8-Vg4MMUAQFBzQkMrBh5tBLyvNs',
      authDomain: 'tp-minimal-frontend.firebaseapp.com',
      projectId: 'tp-minimal-frontend',
      storageBucket: 'tp-minimal-frontend.firebasestorage.app',
      messagingSenderId: '43949615185',
      appId: '1:43949615185:web:db456f80f2b0928707b070',
      measurementId: 'G-FKVB73TR8D',
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    const analytics = getAnalytics(app)
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setIsInitialized(true)

      if (user) {
        console.log('LOGGED IN')
      } else {
        console.log('NOT LOGGED IN')
      }
    })
  }, [])

  if (!isInitialized) {
    return (
      <h1 className="text-center mt-10 text-2xl font-medium">Loading...</h1>
    )
  }

  return <ROUTES />
}
